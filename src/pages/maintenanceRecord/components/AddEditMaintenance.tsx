import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
  ClockCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileOutlined,
  FilePdfOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { chillerHooks, chillerQueryKeys } from '@/services/chiller';
import { commonApi } from '@/services/common';
import { companyHooks, companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityHooks, facilityQueryKeys } from '@/services/facility';
import { logQueryKeys } from '@/services/log';
import { maintenanceHooks, maintenanceQueryKey } from '@/services/maintenance';
import { reportQueryKey } from '@/services/report';
import { userQueryKeys } from '@/services/user';

import { authStore } from '@/store/auth';

import CardWithTitle from '@/shared/components/common/CardWithTitle';
import Details from '@/shared/components/common/Details';
import {
  RenderDatePickerInput,
  RenderSelect,
  RenderTextAreaInput,
  RenderTextInput
} from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import {
  IMAGE_MODULE_NAME,
  IMAGE_URL,
  MAINTENANCE_CATEGORIES,
  TIMEZONE_OPTIONS,
  TimezoneEnum
} from '@/shared/constants';
import { ChillerIcon } from '@/shared/svg';
import {
  allowOnlyNonNegativeInteger,
  showToaster,
  toAbsoluteUrl,
  validateNonNegativeInteger
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

interface IFormValues {
  companyId: string;
  facilityId: string;
  chillerId: string;
  maintenanceDate: any;
  maintenanceTime: any;
  maintenanceCategory: number;
  maintenanceType: string;
  maintDescription?: string;
  maintQuantity?: string;
  comments: string;
  purgeReading?: string;
}

const maintenanceConfig: Record<
  string,
  {
    label: string;
    fieldName: string;
    validationMessage: string;
    placeHolder?: string;
    isText?: boolean;
  }
> = {
  'Major Repair': {
    label: 'Major Repair Description',
    fieldName: 'maintDescription',
    validationMessage: 'major repair description.',
    placeHolder: 'Enter Major Repair Description',
    isText: true
  },
  'Date Oil Added': {
    label: 'Quantity of Oil Added (quarts)',
    fieldName: 'maintQuantity',
    validationMessage: 'quantity of oil added (quarts)',
    placeHolder: 'Enter Quantity of Oil Added'
  },
  'Purge Tank Reclaim Date': {
    label: 'Purge Run Time Reading When Tank Reclaimed',
    fieldName: 'purgeReading',
    validationMessage: 'purge run time reading when tank reclaimed',
    placeHolder: 'Enter Purge Run Time'
  },
  'Date Refrigerant Added': {
    label: 'Quantity of Refrigerant Added (lb.)',
    fieldName: 'maintQuantity',
    validationMessage: 'quantity of refrigerant added (lb.)',
    placeHolder: 'Enter Quantity of Refrigerant Added'
  }
};

const AddEditMaintenance: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { userData } = authStore((state) => state);
  const [form] = Form.useForm();
  const { data: maintenanceData, isLoading: isMaintenanceLoading } =
    maintenanceHooks.MaintenanceView(id!);

  const { data: companyOptions, isLoading: isCompanyLoading } = companyHooks.AllActiveCompanyList();
  const { mutate: addMaintenanceAction, isPending } = maintenanceHooks.useAddMaintenance();
  const { mutate: editMaintenanceAction, isPending: isEditPending } =
    maintenanceHooks.useEditMaintenance();

  const companySelect = Form.useWatch('companyId', form);
  const maintenanceCategory = Form.useWatch('maintenanceCategory', form);
  const maintenanceType = Form.useWatch('maintenanceType', form);
  const dynamicField = maintenanceConfig[maintenanceType] ?? null;

  const { data: facilityList, isLoading: isFacilityLoading } =
    facilityHooks.AllFacilityActiveList(companySelect);
  const facilitySelect = Form.useWatch('facilityId', form);
  const { data: chillerList, isLoading: isChillerLoading } =
    chillerHooks.ActiveChillerList(facilitySelect);

  const [selectedChiller, setSelectedChiller] = useState<any>(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>(TIMEZONE_OPTIONS?.[0]?.value);
  const [imageLoader, setImageLoader] = useState<boolean>(false);
  const [imageData, setImageData] = useState<{
    originalName: string;
    name: string;
    size: number | null;
  }>({
    originalName: '',
    name: '',
    size: null
  });
  const [showPdf, setShowPdf] = useState<string>('');

  useEffect(() => {
    if (!maintenanceData) return;

    setSelectedChiller(maintenanceData?.chiller || null);

    setSelectedTimeZone(maintenanceData?.facility?.timezone || TIMEZONE_OPTIONS?.[0]?.value);

    setImageData({
      originalName: maintenanceData?.fileRealName,
      name: maintenanceData?.fileName,
      size: maintenanceData?.fileSize
    });
    setShowPdf(
      `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.MAITENANCE}/${maintenanceData?.fileName || ''}`
    );

    const selectedZone =
      TimezoneEnum[maintenanceData?.facility?.timezone as keyof typeof TimezoneEnum] ||
      TimezoneEnum.EST;

    // Convert UTC to selected timezone
    const readingDateTime = maintenanceData?.maintenanceDate
      ? dayjs.utc(maintenanceData.maintenanceDate).tz(selectedZone)
      : null;

    form.setFieldsValue({
      companyId: maintenanceData?.companyId,
      facilityId: maintenanceData?.facilityId,
      chillerId: maintenanceData?.chillerId,
      maintenanceCategory: MAINTENANCE_CATEGORIES?.find(
        (cat) => cat.name === maintenanceData?.maintenanceCategory
      )?.id,
      maintenanceType: maintenanceData?.maintenanceType,
      maintenanceDate: readingDateTime,
      maintenanceTime: readingDateTime,
      maintDescription: maintenanceData?.maintDescription,
      comments: maintenanceData?.comments,
      purgeReading: maintenanceData?.purgeReading?.toString(),
      maintQuantity: maintenanceData?.maintQuantity?.toString()
    });
  }, [chillerList, facilityList, form, maintenanceData]);

  const maintenanceCategoryOptions = useMemo(() => {
    return MAINTENANCE_CATEGORIES?.map((category) => ({
      label: category.name,
      value: category.id
    }));
  }, []);

  const getTypesByCategoryId = () => {
    const category = MAINTENANCE_CATEGORIES.find((cat) => cat.id === maintenanceCategory);
    return (
      category?.types?.map((type) => ({
        label: type,
        value: type
      })) || []
    );
  };

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

  const chillerOptions = useMemo(() => {
    return (
      chillerList?.map((chiller) => ({
        label: chiller?.ChillerNo,
        value: chiller?._id
      })) || []
    );
  }, [chillerList]);

  const onCompanyChange = () => {
    form.setFieldValue('facilityId', null);
    form.setFieldValue('chillerId', null);
    setSelectedChiller(null);
    setSelectedTimeZone(TIMEZONE_OPTIONS?.[0]?.value);
  };

  const onFacilityChange = (value?: string) => {
    form.setFieldValue('chillerId', null);
    setSelectedChiller(null);
    const facilityData = facilityList?.find((c) => c?._id === value);
    setSelectedTimeZone(facilityData?.timezone || TIMEZONE_OPTIONS?.[0]?.value);
  };

  const onChillerChange = (value?: string) => {
    const fullChillerData = chillerList?.find((c) => c?._id === value);
    setSelectedChiller(fullChillerData || null);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = ['application/pdf'];

    // ✅ Validate file type
    if (!validTypes.includes(selectedFile.type)) {
      showToaster('error', 'Only PDF files (.pdf) are allowed.');
      return;
    }

    setImageLoader(true);
    try {
      const response = await commonApi.uploadFileAction({
        files: selectedFile,
        moduleName: IMAGE_MODULE_NAME.MAITENANCE
      });

      if (response) {
        setImageData({
          name: response?.[0]?.name,
          size: response?.[0]?.size || null,
          originalName: response?.[0]?.realName || ''
        });
        setShowPdf(
          `${IMAGE_URL}tmp-chiller-check/${IMAGE_MODULE_NAME.MAITENANCE}/${response?.[0]?.name || ''}`
        );
        form.validateFields(['file']);
      }
    } catch (error) {
      showToaster('error', (error as any)?.message || 'An error occurred during upload.');
    } finally {
      setImageLoader(false);
    }
  };

  const formatFileSize = (bytes: number | null): string => {
    if (bytes) {
      if (bytes < 1024) return `${bytes} B`;
      const kb = bytes / 1024;
      if (kb < 1024) return `${kb.toFixed(2)} KB`;
      const mb = kb / 1024;
      return `${mb.toFixed(2)} MB`;
    }
    return '-';
  };

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
      companyId: values?.companyId,
      facilityId: values?.facilityId,
      chillerId: values?.chillerId,
      maintenanceType: values?.maintenanceType,
      maintenanceCategory:
        MAINTENANCE_CATEGORIES?.find((cat) => cat.id === values?.maintenanceCategory)?.name || '',
      maintenanceDate: values?.maintenanceDate
        ? dayjs(values.maintenanceDate).format('MM-DD-YYYY')
        : undefined,
      maintenanceTime: values?.maintenanceTime
        ? dayjs(values.maintenanceTime).format('hh:mm A')
        : undefined,
      maintenanceTimeZone: selectedTimeZone,
      maintDescription: values?.maintDescription,
      maintQuantity: values?.maintQuantity ? Number(values?.maintQuantity) : undefined,
      comments: values?.comments?.trim(),
      fileName: imageData?.name || '',
      purgeReading: values?.purgeReading ? Number(values?.purgeReading) : undefined,
      fileRealName: imageData?.originalName || '',
      fileSize: imageData?.size || null
    };

    if (id) {
      editMaintenanceAction(
        { ...payload, id },
        {
          onSuccess: (res) => handleSuccess(res?.message || ''),
          onError: handleError
        }
      );
    } else {
      addMaintenanceAction(payload, {
        onSuccess: (res) => handleSuccess(res?.message || ''),
        onError: handleError
      });
    }
  };

  return (
    <Wrapper>
      {(imageLoader || isMaintenanceLoading) && <Loader />}
      <Form
        form={form}
        onFinish={onSubmit}
        disabled={isMaintenanceLoading || isPending || isEditPending}
      >
        <HeaderToolbar
          title={id ? 'Edit Maintenance Record' : 'Add Maintenance Record'}
          backBtn={true}
          className="addEditHeader userAddEditHeader"
          button={
            <div className="editButtonWrap">
              <Button
                className="title-cancel-btn"
                onClick={() => navigate(-1)}
                disabled={isPending || isEditPending || isMaintenanceLoading}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                className="title-btn"
                icon={!id && <PlusOutlined />}
                disabled={isPending || isEditPending || isMaintenanceLoading}
                loading={isPending || isEditPending}
              >
                {id ? 'Save' : 'Add / Save'}
              </Button>
            </div>
          }
        />
        <Row className="mainFirstRow">
          <Col xs={24} sm={24} md={24} lg={24}>
            <ShadowPaper>
              <Row gutter={[20, 20]} className="logAddEditMainForm">
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderSelect
                    label="Company"
                    // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    colClassName="custom-select-col"
                    formItemProps={{
                      name: 'companyId',
                      rules: [{ required: true, message: 'Please select company.' }]
                    }}
                    inputProps={{
                      disabled:
                        isCompanyLoading ||
                        !!id ||
                        !!userData?.companyId ||
                        isPending ||
                        isEditPending,
                      placeholder: 'Select Company',
                      options:
                        id && maintenanceData?.companyId
                          ? [
                              {
                                label: maintenanceData?.company?.name,
                                value: maintenanceData?.company?._id
                              }
                            ]
                          : companyOptions || [],
                      onChange: onCompanyChange
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderSelect
                    label="Facility"
                    // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    colClassName="custom-select-col"
                    formItemProps={{
                      name: 'facilityId',
                      rules: [{ required: true, message: 'Please select facility.' }]
                    }}
                    inputProps={{
                      disabled:
                        !companySelect || isFacilityLoading || !!id || isPending || isEditPending,
                      placeholder: 'Select Facility',
                      options:
                        id && maintenanceData?.facilityId
                          ? [
                              {
                                label: maintenanceData?.facility?.name,
                                value: maintenanceData?.facility?._id
                              }
                            ]
                          : facilityOptions || [],
                      onChange: (value) => onFacilityChange(value)
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderSelect
                    label="Chiller"
                    // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    colClassName="custom-select-col"
                    formItemProps={{
                      name: 'chillerId',
                      rules: [{ required: true, message: 'Please select chiller.' }]
                    }}
                    inputProps={{
                      disabled:
                        isChillerLoading || !facilitySelect || !!id || isPending || isEditPending,
                      placeholder: 'Select Chiller',
                      options:
                        id && maintenanceData?.chillerId
                          ? [
                              {
                                label: maintenanceData?.chiller?.ChillerNo,
                                value: maintenanceData?.chillerId
                              }
                            ]
                          : chillerOptions || [],
                      onChange: (value) => onChillerChange(value)
                    }}
                  />
                </Col>
                {selectedChiller && (
                  <Col xs={24} sm={24} md={24} lg={24}>
                    <ul className="maintenanceDetails">
                      <Details
                        detailsTitle={`${selectedChiller?.ChillerNo || '-'}`}
                        detailsDescription={`${selectedChiller?.make || '-'} ${selectedChiller?.model || '-'}`}
                        detailsIcon={<ChillerIcon />}
                      />
                      {/* <Details
                detailsTitle={`${selectedChiller?.make || '-'} ${selectedChiller?.model || '-'}`}
                detailsDescription
                detailsIcon={<AuditOutlined />}
              /> */}
                      <Details
                        detailsTitle={`${selectedChiller?.manufacturedYear ?? '-'} ${selectedChiller?.refrigType || '-'}`}
                        detailsDescription
                        detailsIcon={<FileOutlined />}
                      />
                      {id && (
                        <Details
                          detailsTitle={
                            maintenanceData?.createdByUser?.firstName +
                            ' ' +
                            maintenanceData?.createdByUser?.lastName
                          }
                          detailsDescription={
                            maintenanceData?.createdAt
                              ? dayjs(maintenanceData?.createdAt).format('MM/DD/YY HH:mm')
                              : '-'
                          }
                          detailsIcon={
                            <figure className="viewImgaeMaintenance">
                              <img
                                src={`${maintenanceData?.createdByUser?.profileImage ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${maintenanceData?.createdByUser?.profileImage}` : toAbsoluteUrl('/icons/placeHolder.jpg')}`}
                                alt="user"
                              />
                            </figure>
                          }
                        />
                      )}
                      {id && (
                        <Details
                          detailsTitle={
                            maintenanceData?.updatedAt
                              ? dayjs(maintenanceData?.updatedAt).format('MM/DD/YY')
                              : '-'
                          }
                          detailsDescription={
                            maintenanceData?.updatedAt
                              ? dayjs(maintenanceData?.updatedAt).format('hh:mm A')
                              : '-'
                          }
                          detailsIcon={<ClockCircleOutlined />}
                        />
                      )}
                    </ul>
                  </Col>
                )}
              </Row>
            </ShadowPaper>
          </Col>
        </Row>

        <ShadowPaper>
          <Row className="maintenanceFields" gutter={[20, 20]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Row gutter={[10, 5]} className="doubleInputRows">
                <Col xs={24} sm={24} md={24} lg={12}>
                  <RenderDatePickerInput
                    label="Maintenance Date"
                    colClassName="maintenanceDate"
                    formItemProps={{
                      name: 'maintenanceDate',
                      rules: [{ required: true, message: 'Please select date.' }]
                    }}
                    inputProps={{
                      placeholder: 'Select Maintenance Date'
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <span className="maintenanceTime">
                    <span>*</span>Maintenance Time
                  </span>
                  <div className="timeWrap">
                    <Form.Item
                      name="maintenanceTime"
                      rules={[{ required: true, message: 'Please select time.' }]}
                    >
                      <TimePicker use12Hours format="hh:mm A" showSecond={false} />
                    </Form.Item>
                    <div className="timezone">{selectedTimeZone}</div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <RenderSelect
                label="Maintenance Category"
                colClassName="custom-select-col"
                formItemProps={{
                  name: 'maintenanceCategory',
                  rules: [
                    {
                      required: true,
                      message: 'Please select maintenance category.'
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Select Maintenance Category',
                  onChange: () => {
                    form.setFieldValue('maintenanceType', null);
                  },
                  options: maintenanceCategoryOptions || []
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <RenderSelect
                label="Maintenance Type"
                colClassName="custom-select-col"
                formItemProps={{
                  name: 'maintenanceType',
                  rules: [
                    {
                      required: true,
                      message: 'Please select maintenance type.'
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Select Maintenance Type',
                  disabled: !maintenanceCategory,
                  onChange: dynamicField?.fieldName
                    ? () => form.setFieldValue(dynamicField.fieldName, null)
                    : undefined,
                  options: getTypesByCategoryId() || []
                }}
              />
            </Col>
            {dynamicField && (
              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderTextInput
                  label={dynamicField.label}
                  required
                  formItemProps={{
                    name: dynamicField.fieldName,
                    rules: dynamicField
                      ? dynamicField.isText
                        ? [
                            {
                              validator: (_, value) => {
                                if (!value) {
                                  return Promise.reject(
                                    new Error(`Please enter ${dynamicField.validationMessage}`)
                                  );
                                }
                                if (value && value.trim() === '') {
                                  return Promise.reject(
                                    new Error(
                                      `Please enter valid ${dynamicField.validationMessage}`
                                    )
                                  );
                                }
                                return Promise.resolve();
                              }
                            }
                          ]
                        : [
                            {
                              validator: validateNonNegativeInteger(dynamicField.validationMessage)
                            }
                          ]
                      : []
                  }}
                  inputProps={{
                    onKeyDown: dynamicField.isText ? undefined : allowOnlyNonNegativeInteger,
                    type: 'text',
                    maxLength: dynamicField.isText ? undefined : 10,
                    placeholder: dynamicField?.placeHolder || 'Enter Here'
                  }}
                />
              </Col>
            )}
          </Row>
        </ShadowPaper>

        <Row className="maintenanceCol maintenanceColAddEdit" gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <CardWithTitle title="Maintenance Notes">
              <RenderTextAreaInput
                colProps={{ span: 24 }}
                colClassName="maintenanceNote"
                label="Notes"
                required
                formItemProps={{
                  name: 'comments',
                  label: 'notes',
                  rules: [
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject(new Error('Please enter maintenance notes.'));
                        }
                        if (value && value.trim() === '') {
                          return Promise.reject(new Error('Please enter valid maintenance notes.'));
                        }
                        return Promise.resolve();
                      }
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Enter Maintenance Notes',
                  autoSize: { minRows: 6, maxRows: 6 }
                }}
              />
            </CardWithTitle>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <CardWithTitle title="Maintenance File" className="maintenanceFileDetailsWrap">
              <div className="maintenanceFile">
                {imageData?.name ? (
                  <div className="maintenanceDetailsWrap">
                    <span>
                      <FilePdfOutlined style={{ fontSize: '40px' }} />
                    </span>
                    <div className="maintenanceDetailsPDFView">
                      <h4>{imageData?.originalName || 'Document.pdf'}</h4>
                      <h5>{formatFileSize(imageData?.size)}</h5>
                      <button type="button" onClick={() => window.open(showPdf, '_blank')}>
                        <EyeOutlined color="#000ABC" /> View
                      </button>
                      <button
                        type="button"
                        className="deleteBtn"
                        onClick={() => {
                          setImageData({
                            name: '',
                            originalName: '',
                            size: null
                          });
                          setShowPdf('');
                          form.setFieldsValue({ file: undefined });
                        }}
                      >
                        <DeleteOutlined style={{ color: '#F5222D' }} /> Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <Form.Item
                    name="file"
                    rules={[
                      {
                        validator: async () => {
                          if (!imageData?.name) {
                            return Promise.reject(new Error('Please upload a PDF file.'));
                          }
                          return Promise.resolve();
                        }
                      }
                    ]}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="custom-file-input"
                    />
                  </Form.Item>
                )}
              </div>
            </CardWithTitle>
          </Col>
        </Row>

        <div className="maintenanceButtonWrap extraActionButton">
          <Button
            className="title-cancel-btn"
            onClick={() => navigate(-1)}
            disabled={isPending || isEditPending || isMaintenanceLoading}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className="title-btn"
            icon={!id && <PlusOutlined />}
            disabled={isPending || isEditPending || isMaintenanceLoading}
            loading={isPending || isEditPending}
          >
            {id ? 'Save' : 'Add / Save'}
          </Button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddEditMaintenance;
