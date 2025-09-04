import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { ExclamationCircleOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, DatePicker, Form, Input, Row, TablePaginationConfig, Tag } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { chillerQueryKeys } from '@/services/chiller';
import { ICommonPagination } from '@/services/common/types';
import { companyHooks, companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityHooks, facilityQueryKeys } from '@/services/facility';
import { logQueryKeys } from '@/services/log';
import { maintenanceQueryKey } from '@/services/maintenance';
import { UserList } from '@/services/report/types';
import { userQueryKeys } from '@/services/user';

import { authStore } from '@/store/auth';

import {
  CKEditorFormItem,
  RenderSelect,
  RenderSelectDropDown,
  RenderTextAreaInput,
  RenderTextInput
} from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import {
  DateRange,
  IMAGE_MODULE_NAME,
  IMAGE_URL,
  PATTERNS,
  Role,
  USER_ADD_ROLE,
  chartTypeOptions,
  dateRangeOptions,
  notificationOptions,
  parameterTypeOptions
} from '@/shared/constants';
import { getStartEndDates } from '@/shared/constants/day';
import { ROUTES } from '@/shared/constants/routes';
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterWhileTyping,
  debounce,
  formatPhoneNumberInUsFormat,
  getSortOrder,
  hasPermission,
  showToaster,
  toAbsoluteUrl
} from '@/shared/utils/functions';

import { reportHooks, reportQueryKey } from '../../../services/report/index';
import { Wrapper } from '../style';

dayjs.extend(utc);

interface IFormValues {
  name: string;
  dateRange: string;
  automatedNotification: string;
  parameter: string;
  companyId: string;
  facilityIds: string[];
  chartType: string;
  description: string;
  header: string;
  footer: string;
}

const AddEditReport: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { userData } = authStore((state) => state);
  const queryClient = useQueryClient();

  const { RangePicker } = DatePicker;

  const { data: reportData, isLoading: isReportViewLoading } = reportHooks.ReportView(id!);

  const { data: companyOptions, isLoading: isCompanyLoading } = companyHooks.AllActiveCompanyList();
  const companySelect = Form.useWatch('companyId', form);
  const facilityIds = Form.useWatch('facilityIds', form);

  const [args, setArgs] = useState<ICommonPagination>({
    page: 1,
    limit: 10,
    search: '',
    sort_by: '',
    sort_order: '',
    companyId: '',
    facilityIds: [],
    role: ''
  });

  const { data: facilityList, isLoading: isFacilityLoading } =
    facilityHooks.AllFacilityActiveList(companySelect);
  const { mutate: addReportAction, isPending } = reportHooks.useAddReport();
  const { mutate: editReportAction, isPending: isEditPending } = reportHooks.useEditReport();

  const { data: notifyUserList, isLoading: isNotifyUserLoading } = reportHooks.NotifyUserList(args);
  const isEmpty = !notifyUserList?.userList?.length;
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
  const [dates, setDates] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: ''
  });
  const [sharedToIds, setSharedToIds] = useState<string[] | []>([]);
  const [editorValues, setEditorValues] = useState({
    header: '',
    footer: ''
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!reportData) return;

    if (reportData?.dateType === DateRange['Custom Range']) {
      setSelectedRange(reportData?.dateType as DateRange);
      if (reportData?.startDate && reportData?.endDate) {
        form.setFieldsValue({
          customRange: [dayjs.utc(reportData.startDate), dayjs.utc(reportData.endDate)]
        });
      }
    }
    setDates({
      startDate: reportData?.startDate || '',
      endDate: reportData?.endDate || ''
    });

    setSharedToIds(reportData?.sharedTo || []);

    setArgs({
      ...args,
      companyId: reportData?.companyId,
      facilityIds: reportData?.facilityIds
    });

    form.setFieldsValue({
      name: reportData?.name,
      dateRange: reportData?.dateType,
      automatedNotification: reportData?.notification
        ? capitalizeFirstLetter(reportData?.notification)
        : null,
      parameter: reportData?.parameter,
      companyId: reportData?.companyId,
      facilityIds: reportData?.facilityIds,
      chartType: reportData?.chartType,
      description: reportData?.description,
      header: reportData?.header,
      footer: reportData?.footer
    });
    setEditorValues({
      header: reportData?.header || '',
      footer: reportData?.footer || ''
    });
  }, [form, reportData]);

  useEffect(() => {
    if (userData?.companyId && !isCompanyLoading) {
      form.setFieldValue('companyId', userData?.companyId);
    }
  }, [form, id, isCompanyLoading, userData?.companyId]);

  const facilityOptions = useMemo(() => {
    return (
      facilityList?.map((facility) => ({
        label: facility?.name,
        value: facility?._id
      })) || []
    );
  }, [facilityList]);

  const companyOptionsWithFallback = useMemo(() => {
    const baseOptions = companyOptions || [];
    if (reportData?.companyId) {
      const exists = baseOptions?.some((opt: any) => opt?.value === reportData.companyId);
      if (!exists) {
        const label = reportData?.companyName || reportData?.company?.name;
        if (label) return [...baseOptions, { label, value: reportData.companyId }];
      }
    }
    return baseOptions;
  }, [companyOptions, reportData?.companyId, reportData?.companyName, reportData?.company?.name]);

  const facilityOptionsWithFallback = useMemo(() => {
    const baseOptions = facilityOptions || [];
    const extras = (reportData?.facility || [])
      ?.filter((fac: any) => !baseOptions?.some((opt: any) => opt?.value === fac?._id))
      ?.map((fac: any) => ({ label: fac?.name, value: fac?._id }));
    return [...baseOptions, ...(extras || [])];
  }, [facilityOptions, reportData?.facility]);

  const handleCapitalizedChange =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const capitalized = capitalizeFirstLetterWhileTyping(e.target.value);
      form.setFieldsValue({ [fieldName]: capitalized });
    };

  const handleRangeChange = (range: DateRange) => {
    form.setFieldValue('customRange', null);
    setSelectedRange(range);

    if (range !== DateRange['Custom Range']) {
      const result = getStartEndDates(range);
      if (result) setDates(result);
    } else {
      setDates({
        startDate: '',
        endDate: ''
      });
    }
  };

  const handleCustomRangeChange = (dates: any) => {
    if (!dates || dates.length === 0) {
      setDates({
        startDate: '',
        endDate: ''
      });
      return;
    }

    const [start, end] = dates;

    setDates({
      startDate: start.startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      endDate: end.endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    });
  };

  const handleEditorChange = (_: any, editor: any, field: string) => {
    const content = editor.getData();

    if (content.trim() === '') {
      form.setFieldsValue({ [field]: null });
    } else {
      setEditorValues((prev) => ({
        ...prev,
        [field]: content
      }));
      form.setFieldsValue({ [field]: content });
    }
  };

  const onCompanyChange = (value: string) => {
    form.setFieldValue('facilityIds', null);
    setSharedToIds([]);
    setArgs({
      ...args,
      companyId: value
    });
  };

  const onFacilityChange = (values: string[]) => {
    setSharedToIds([]);
    setArgs({
      ...args,
      facilityIds: values
    });
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<UserList> | SorterResult<UserList>[]
  ) => {
    if (!Array.isArray(sorter)) {
      setArgs({
        ...args,
        page: pagination.current ?? 1,
        limit: pagination.pageSize ?? 10,
        sort_by: sorter.order ? String(sorter.field) : '',
        sort_order: getSortOrder(sorter.order) || ''
      });
    }
  };

  const updateSearch = debounce((value: string) => {
    setArgs((prevArgs) => ({ ...prevArgs, search: value, page: 1 }));
  });

  const handleSuccess = (message: string) => {
    showToaster('success', message);
    queryClient.invalidateQueries({ queryKey: facilityQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: chillerQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: logQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: maintenanceQueryKey.all });
    queryClient.invalidateQueries({ queryKey: reportQueryKey.all });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKey.all });

    navigate(-1);
  };

  const handleError = (err: any) => {
    const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
    showToaster('error', errorMsg);
  };

  const onSubmit = (values: IFormValues) => {
    const payload = {
      name: values?.name,
      startDate: dates?.startDate,
      endDate: dates?.endDate,
      dateType: values?.dateRange,
      notification: values?.automatedNotification?.toLowerCase(),
      parameter: values?.parameter,
      chartType: values?.chartType,
      companyId: companySelect,
      facilityIds: facilityIds,
      description: values?.description?.trim(),
      header: values?.header,
      footer: values?.footer,
      sharedTo: sharedToIds || []
    };
    if (id && reportData?.createdBy === userData?._id) {
      editReportAction(
        { id, ...payload },
        {
          onSuccess: (res) => handleSuccess(res?.message || ''),
          onError: handleError
        }
      );
    } else {
      addReportAction(payload, {
        onSuccess: (res) => handleSuccess(res?.message || ''),
        onError: handleError
      });
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      width: 200,
      render: (_: any, record: UserList) => (
        <div className="updateUser">
          <figure>
            <img
              src={`${record?.profileImage ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${record?.profileImage}` : toAbsoluteUrl('/icons/placeHolder.jpg')}`}
              alt="user"
            />{' '}
          </figure>
          <h4>{record?.name || '-'}</h4>
        </div>
      )
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      render: (role: string) => Role?.find((val) => val?.value === role)?.label || '-'
    },
    {
      title: 'Email Address',
      key: 'email',
      dataIndex: 'email'
    },
    {
      title: 'Phone Number',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
      render: formatPhoneNumberInUsFormat
    },
    {
      title: 'Company Name',
      key: 'company',
      dataIndex: 'company',
      render: (data: { name: string }) => data?.name || '-'
    },
    {
      title: 'Facilities',
      key: 'facilities',
      dataIndex: 'facilities',
      render: (data: { name: string }[]) => {
        return data?.map((fac) => fac?.name)?.join(', ') || '-';
      }
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (status: any) => (
        <Tag className="statusTag" color={status ? '#00A86B' : '#CF5439'}>
          {status ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    ...(hasPermission('users', 'view')
      ? [
          {
            title: '',
            key: '_id',
            dataIndex: '_id',
            render: (id: string) => (
              <div className="actionIonWrap">
                {hasPermission('users', 'view') && (
                  <Link className="actionIcon" to={ROUTES.VIEW_USER_MANAGEMENT(id)}>
                    <EyeOutlined />
                  </Link>
                )}
              </div>
            )
          }
        ]
      : [])
  ];

  return (
    <Wrapper>
      {isReportViewLoading && <Loader />}
      <Form
        form={form}
        onFinish={onSubmit}
        disabled={isPending || isReportViewLoading || isEditPending}
      >
        <HeaderToolbar
          title={id ? 'Edit Report' : 'Build Report'}
          backBtn={true}
          button={
            <div className="viewButtonWrap">
              <Button
                className="title-cancel-btn"
                onClick={() => navigate(-1)}
                disabled={isPending || isEditPending}
              >
                Cancel
              </Button>
              {!id && (
                <Button
                  type="primary"
                  className="title-btn"
                  size="small"
                  htmlType="submit"
                  disabled={isPending}
                  loading={isPending}
                >
                  Generate Report
                </Button>
              )}
              {id && reportData?.createdBy === userData?._id && (
                <Button
                  type="primary"
                  className="title-btn"
                  size="small"
                  htmlType="submit"
                  disabled={isReportViewLoading || isEditPending}
                  loading={isReportViewLoading || isEditPending}
                >
                  Save Existing Report
                </Button>
              )}
              {id && hasPermission('report', 'add') && reportData?.createdBy !== userData?._id && (
                <Button
                  onClick={() => setIsModalOpen(true)}
                  type="primary"
                  className="title-btn"
                  size="small"
                  htmlType="button"
                >
                  Generate New Report
                </Button>
              )}
            </div>
          }
        />
        <div className="shadowPaperWrap">
          <ShadowPaper>
            <Row gutter={[20, 25]} className="reportAddEditMainForm">
              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderTextInput
                  label="Report Name"
                  required
                  formItemProps={{
                    name: 'name',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter report name.'
                      },
                      {
                        pattern: PATTERNS.BLANK_SPACE,
                        message: 'Please enter valid report name.'
                      }
                    ]
                  }}
                  inputProps={{
                    placeholder: 'Enter Report Name',
                    onChange: handleCapitalizedChange('name')
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Date Range"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'dateRange',
                    rules: [{ required: true, message: 'Please select date range.' }]
                  }}
                  inputProps={{
                    value: selectedRange || null,
                    onChange: handleRangeChange,
                    placeholder: 'Select Date Range',
                    options: dateRangeOptions || []
                  }}
                />
              </Col>

              {selectedRange === DateRange['Custom Range'] && (
                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item
                    label="Select Start Date And End Date"
                    className="custome-range"
                    name="customRange"
                    rules={[
                      {
                        required: true,
                        message: 'Please select start date and end date.'
                      }
                    ]}
                  >
                    <RangePicker
                      showTime={false}
                      className="timelineRangePicker"
                      format="MM-DD-YYYY"
                      onChange={handleCustomRangeChange}
                    />
                  </Form.Item>
                </Col>
              )}

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Automated Notification"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'automatedNotification',
                    rules: [{ required: true, message: 'Please select automated notification.' }]
                  }}
                  inputProps={{
                    placeholder: 'Select Automated Notification',
                    options: notificationOptions || []
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Parameter"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'parameter',
                    rules: [{ required: true, message: 'Please select parameter.' }]
                  }}
                  inputProps={{
                    placeholder: 'Select Parameter',
                    options: parameterTypeOptions || []
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Company"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'companyId',
                    rules: [{ required: true, message: 'Please select company.' }]
                  }}
                  inputProps={{
                    disabled: isCompanyLoading || !!userData?.companyId,
                    placeholder: 'Select Company',
                    options: companyOptionsWithFallback,
                    onChange: onCompanyChange
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Facility"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'facilityIds',
                    rules: [{ required: true, message: 'Please select facility.' }]
                  }}
                  inputProps={{
                    mode: 'multiple',
                    onChange: onFacilityChange,
                    disabled: !companySelect || isFacilityLoading,
                    placeholder: 'Select Facility',
                    options: facilityOptionsWithFallback
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Chart Type"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'chartType',
                    rules: [{ required: true, message: 'Please select chart type.' }]
                  }}
                  inputProps={{
                    placeholder: 'Select Chart Type',
                    options: chartTypeOptions || []
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <RenderTextAreaInput
                  colProps={{ span: 24 }}
                  label="Add Description"
                  required
                  formItemProps={{
                    name: 'description',
                    label: 'Add Description',
                    rules: [
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.reject(new Error('Please enter description.'));
                          if (value && value.trim() === '') {
                            return Promise.reject(new Error('Please enter valid description.'));
                          }
                          return Promise.resolve();
                        }
                      }
                    ]
                  }}
                  inputProps={{
                    placeholder: 'Enter Description',
                    autoSize: { minRows: 3, maxRows: 6 }
                  }}
                />
              </Col>
            </Row>
          </ShadowPaper>

          <ShadowPaper>
            <Row gutter={[20, 20]} className="editorWrap">
              <Col xs={24} sm={24} md={12} lg={12}>
                <CKEditorFormItem
                  label="Report Header Text"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name={'header'}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter header text.'
                    }
                  ]}
                  data={editorValues?.header}
                  required={true}
                  onChange={(e: any, editor: any) => handleEditorChange(e, editor, 'header')}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={12}>
                <CKEditorFormItem
                  label="Report Footer Text"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name={'footer'}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter footer text.'
                    }
                  ]}
                  required={true}
                  data={editorValues?.footer}
                  onChange={(e: any, editor: any) => handleEditorChange(e, editor, 'footer')}
                />
              </Col>
            </Row>
          </ShadowPaper>

          {facilityIds?.length > 0 && (
            <ShadowPaper>
              <div className="reportContentHeader">
                <div className="dropdownWrap">
                  <h2 className="notifyUser themeColor">Notify Users [{sharedToIds?.length}]</h2>

                  <RenderSelectDropDown
                    colClassName="dropdownWithSearch"
                    inputProps={{
                      placeholder: 'Select Role',
                      options: USER_ADD_ROLE.slice(1) || [],
                      onChange: (value) => setArgs({ ...args, role: value, page: 1 })
                    }}
                  />
                </div>
                <Input
                  className="searchReport"
                  placeholder="Search for User"
                  prefix={<SearchOutlined />}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateSearch(e.target.value)}
                />
              </div>
              <CommonTable
                columns={columns}
                dataSource={notifyUserList?.userList || []}
                pagination={{
                  current: args?.page,
                  pageSize: args?.limit,
                  total: notifyUserList?.totalRecords || 0
                }}
                loading={isNotifyUserLoading}
                onChange={handleTableChange}
                rowSelection={{
                  selectedRowKeys: sharedToIds,
                  columnWidth: 60,
                  onChange: (selectedRowKeys: any) => {
                    setSharedToIds(selectedRowKeys);
                  },
                  preserveSelectedRowKeys: true // <-- Important!
                }}
                emptyText={
                  <EmptyState
                    isEmpty={isEmpty}
                    search={args.search || args.role}
                    searchDescription="No User Found"
                  />
                }
              />
            </ShadowPaper>
          )}
        </div>

        <div className="viewButtonWrap extraActionButton">
          <Button
            className="title-cancel-btn"
            onClick={() => navigate(-1)}
            disabled={isPending || isEditPending}
          >
            Cancel
          </Button>
          {!id && (
            <Button
              type="primary"
              className="title-btn"
              size="small"
              htmlType="submit"
              disabled={isPending}
              loading={isPending}
            >
              Generate Report
            </Button>
          )}
          {id && reportData?.createdBy === userData?._id && (
            <Button
              type="primary"
              className="title-btn"
              size="small"
              htmlType="submit"
              disabled={isReportViewLoading || isEditPending}
              loading={isReportViewLoading || isEditPending}
            >
              Save Existing Report
            </Button>
          )}
          {id && hasPermission('report', 'add') && reportData?.createdBy !== userData?._id && (
            <Button
              onClick={() => setIsModalOpen(true)}
              type="primary"
              className="title-btn"
              size="small"
              htmlType="button"
            >
              Generate New Report
            </Button>
          )}
        </div>
      </Form>
      {isModalOpen && (
        <CommonModal
          open={isModalOpen}
          closeIcon={true}
          closable={true}
          centered={true}
          maskClosable={false}
          className="InactiveModalWrap"
          onCancel={() => setIsModalOpen(false)}
          title={
            <div className="modalTitleWrapper">
              <i>
                <ExclamationCircleOutlined style={{ color: 'yellow' }} />
              </i>
              <span className="main-title">Generate New Report</span>
            </div>
          }
        >
          <p>
            You don’t have edit access to this report. Would you like to save this as a new report?
          </p>
          <div className="modalFooter">
            <Button onClick={() => setIsModalOpen(false)} disabled={isPending}>
              No
            </Button>
            <Button
              className="footerBtn"
              onClick={form.submit}
              loading={isPending}
              disabled={isPending}
            >
              Yes
            </Button>
          </div>
        </CommonModal>
      )}
    </Wrapper>
  );
};

export default AddEditReport;
