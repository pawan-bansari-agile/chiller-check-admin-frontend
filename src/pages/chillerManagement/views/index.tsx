import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import {
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  SlidersOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, Dropdown, Form, Input, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import dayjs from 'dayjs';

import { chillerHooks, chillerQueryKeys } from '@/services/chiller';
import { IChillerList } from '@/services/chiller/types';
import { ICommonPagination } from '@/services/common/types';
import { companyHooks, companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityHooks, facilityQueryKeys } from '@/services/facility';
import { logQueryKeys } from '@/services/log';
import { maintenanceQueryKey } from '@/services/maintenance';
import { reportQueryKey } from '@/services/report';
import { userQueryKeys } from '@/services/user';

import { authStore } from '@/store/auth';

import { RenderSelectDropDown, RenderTextInput } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { ALERT_TYPE, MEASUREMENT_UNITS, USER_ROLES } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon } from '@/shared/svg';
import {
  allowEnergyCost,
  buildSearchParams,
  capitalizeFirstLetter,
  debounce,
  getAntDSortOrder,
  getSortOrder,
  hasPermission,
  showToaster,
  validateEnergyCost
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

const statusColorMap: Record<string, string> = {
  active: '#00A86B',
  inactive: '#CF5439',
  pending: '#000ABC'
};

const ChillerManagement: React.FC = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { userData } = authStore((state) => state);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const latestSearchParamsRef = useRef(searchParams);

  const [searchVal, setSearchVal] = useState<string>('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [chillerIds, setChillerIds] = useState<string[] | []>([]);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({});

  const [args, setArgs] = useState<ICommonPagination>({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || '',
    sort_by: searchParams.get('sort_by') || '',
    sort_order: searchParams.get('sort_order') || '',
    companyId: searchParams.get('companyId') || userData?.companyId || '',
    facilityId: searchParams.get('facilityId') || ''
  });
  const [facilityArg, setFacilityArg] = useState<ICommonPagination>({
    page: 1,
    limit: 100000,
    search: '',
    sort_by: '',
    sort_order: '',
    companyId: searchParams.get('companyId') || userData?.companyId || ''
  });

  const { data: facilityListCompany, isLoading: isFacilityListCompanyLoading } =
    facilityHooks.FacilityList(facilityArg);
  const { data, isLoading } = chillerHooks.ChillerList(args);
  const { data: companyList, isLoading: isCompanyLoading } = companyHooks.AllCompanyList();
  const { data: facilityList, isLoading: isFacilityLoading } = facilityHooks.AllFacilityList();
  const { mutate: bulkUpdateAction, isPending: isBulkLoading } = chillerHooks.useBulkUpdate();

  const isEmpty = !data?.chillerList?.length;

  const toggleableColumnKeys = useMemo(
    () => [
      'companyName',
      'facilityName',
      'chillerName',
      'ChillerNumber',
      'serialNumber',
      'tons',
      'energyCost',
      'emissionFactor',
      'effLoss',
      'condAppLoss',
      'evapAppLoss',
      'nonCondLoss',
      'otherLoss',
      'status',
      'updatedAt'
    ],
    []
  );

  const companyOptions = useMemo(() => {
    return (
      companyList?.map((company) => ({
        label: capitalizeFirstLetter(company?.name),
        value: company?._id
      })) || []
    );
  }, [companyList]);

  const facilityOptions = useMemo(() => {
    return (
      facilityList?.map((facility) => ({
        label: capitalizeFirstLetter(facility?.name),
        value: facility?._id
      })) || []
    );
  }, [facilityList]);

  const facilityOptionsCompany = useMemo(() => {
    return (
      facilityListCompany?.facilityList?.map((facility) => ({
        label: capitalizeFirstLetter(facility.name),
        value: facility._id
      })) || []
    );
  }, [facilityListCompany]);

  useEffect(() => {
    if (args.search) setSearchVal(args.search);
  }, [args.search]);

  useEffect(() => {
    if (userData?.companyId) setSelectedCompanyId(userData?.companyId);
  }, [userData?.companyId]);

  useEffect(() => {
    latestSearchParamsRef.current = searchParams;
  }, [searchParams]);

  useEffect(() => {
    const companyIdFromUrl = searchParams.get('companyId');
    if (companyIdFromUrl && companyOptions?.length) {
      setSelectedCompanyId(companyIdFromUrl);
    }
  }, [searchParams, companyOptions]);

  useEffect(() => {
    const facilityFromUrl = searchParams.get('facilityId');

    if (facilityFromUrl && (facilityOptions?.length || facilityOptionsCompany?.length)) {
      setSelectedFacilityId(facilityFromUrl);
    }
  }, [searchParams, facilityOptions, facilityOptionsCompany]);

  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    toggleableColumnKeys?.forEach((key) => {
      initialState[key] = true;
    });
    setVisibleColumns(initialState);
  }, [toggleableColumnKeys]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IChillerList> | SorterResult<IChillerList>[]
  ) => {
    if (!Array.isArray(sorter)) {
      updateParamsAndArgs({
        page: pagination.current ?? 1,
        limit: pagination.pageSize ?? 10,
        sort_by: sorter.order ? String(sorter.field) : '',
        sort_order: getSortOrder(sorter.order) || ''
      });
    }
  };

  const debouncedSearch = useRef(
    debounce((value: string) => {
      const trimmed = value.trim();
      updateParamsAndArgs(
        {
          search: trimmed,
          page: 1
        },
        latestSearchParamsRef.current
      );
    })
  ).current;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchVal(value);
    debouncedSearch(value);
  };

  const updateParamsAndArgs = useCallback(
    (newArgs: Partial<ICommonPagination>, baseParams?: URLSearchParams) => {
      const currentParams = Object.fromEntries((baseParams || searchParams).entries());

      const mergedArgs: Record<string, any> = {
        page: Number(currentParams.page) || 1,
        limit: Number(currentParams.limit) || 10,
        search: currentParams.search || '',
        sort_by: currentParams.sort_by ?? '', // <-- always ensure present
        sort_order: currentParams.sort_order ?? '', // <-- always ensure present
        companyId: currentParams.companyId || userData?.companyId || '',
        facilityId: currentParams.facilityId || '',
        ...newArgs // override anything as needed
      };

      // Apply number conversion only after merge
      if (mergedArgs.page) mergedArgs.page = Number(mergedArgs.page);
      if (mergedArgs.limit) mergedArgs.limit = Number(mergedArgs.limit);

      setArgs(mergedArgs as ICommonPagination);
      setSearchParams(buildSearchParams(mergedArgs));
    },
    [searchParams, setSearchParams, userData?.companyId]
  );

  // Updates state when a company is selected from the dropdown
  const handleSelectChange = (value: string) => {
    setFacilityArg({
      ...facilityArg,
      companyId: value
    });
    setSelectedCompanyId(value);
    updateParamsAndArgs({ page: 1, companyId: value });
  };

  // Updates state when a facility is selected from the dropdown
  const handleSelectFacilityChange = (value: string) => {
    setSelectedFacilityId(value);
    updateParamsAndArgs({ page: 1, facilityId: value });
  };

  const handleSuccess = (message: string) => {
    showToaster('success', message);
    form.resetFields();
    queryClient.invalidateQueries({ queryKey: facilityQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: chillerQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: logQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: maintenanceQueryKey.all });
    queryClient.invalidateQueries({ queryKey: reportQueryKey.all });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKey.all });

    setIsModalOpen(false);
    setChillerIds([]);
  };

  const handleError = (err: any) => {
    const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
    showToaster('error', errorMsg);
  };

  const onBulkUpdate = (values: { energyCost: string }) => {
    const payload = {
      chillerIds: chillerIds,
      energyCost: Number(values?.energyCost)
    };
    bulkUpdateAction(payload, {
      onSuccess: (res) => handleSuccess(res?.message || ''),
      onError: handleError
    });
  };

  const columns = useMemo<ColumnsType<any>>(() => {
    const baseColumns: ColumnsType<any> = [
      {
        title: 'Company Name',
        key: 'companyName',
        dataIndex: 'companyName',
        width: 180
      },
      {
        title: 'Facility Name',
        key: 'facilityName',
        dataIndex: 'facilityName',
        width: 220
      },
      {
        title: 'Chiller #',
        key: 'ChillerNumber',
        dataIndex: 'ChillerNumber',
        width: 120
      },
      {
        title: 'Make / Model',
        key: 'chillerName',
        dataIndex: 'chillerName',
        sorter: true,
        width: 175,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'chillerName'),
        render: (_: any, record: IChillerList) => (
          <div className="chillerNameWrap">
            <a className="chillerName">{record?.chillerName || ''}</a>
            <span>{record?.ChillerNo || ''}</span>
          </div>
        )
      },
      {
        title: 'Serial No.',
        key: 'serialNumber',
        dataIndex: 'serialNumber',
        render: (value: string) => value || '-'
        // width: 220
      },
      {
        title: 'Tons or kWR',
        key: 'tons',
        dataIndex: 'tons',
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'tons'),
        render: (_: any, record: IChillerList) =>
          record?.unit === MEASUREMENT_UNITS?.[0]?.value
            ? (record?.tons?.toFixed(2) ?? '-')
            : (record?.kwr?.toFixed(2) ?? '-')
      },
      {
        title: 'Energy Cost $',
        key: 'energyCost',
        dataIndex: 'energyCost',
        sorter: true,
        render: (value) => value?.toFixed(2) ?? '-',
        // width: 175,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'energyCost')
      },
      {
        title: 'CO2e Emission Factor',
        key: 'emissionFactor',
        dataIndex: 'emissionFactor',
        sorter: true,
        render: (value) => value?.toFixed(2) ?? '-',
        // width: 175,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'emissionFactor')
      },
      {
        title: 'Efficiency Loss %',
        key: 'effLoss',
        dataIndex: 'effLoss',
        // width: 160,
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'effLoss'),
        render: (_: any, record: IChillerList) => renderCell(record?.latestLog?.effLoss)
      },
      // {
      //   title: '12 Mon. Loss $',
      //   key: 'monLoss',
      //   dataIndex: 'monLoss',
      //   // width: 175,
      //   // sorter: true,
      //   render: () => <>$ 10</>
      // },
      {
        title: 'Cond. App. Loss %',
        key: 'condAppLoss',
        dataIndex: 'condAppLoss',
        // width: 175,
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'condAppLoss'),
        render: (_: any, record: IChillerList) => renderCell(record?.latestLog?.condAppLoss)
      },
      {
        title: 'Evap. App. Loss %',
        key: 'evapAppLoss',
        dataIndex: 'evapAppLoss',
        // width: 175,
        // sorter: true
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'evapAppLoss'),
        render: (_: any, record: IChillerList) => renderCell(record?.latestLog?.evapAppLoss)
      },
      {
        title: 'Non-Cond. App. Loss %',
        key: 'nonCondLoss',
        dataIndex: 'nonCondLoss',
        // width: 180,
        // sorter: true
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'nonCondLoss'),
        render: (_: any, record: IChillerList) => renderCell(record?.latestLog?.nonCondLoss)
      },
      {
        title: 'Other Losses %',
        key: 'otherLoss',
        dataIndex: 'otherLoss',
        // width: 175,
        // sorter: true
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'otherLoss'),
        render: (_: any, record: IChillerList) => renderCell(record?.latestLog?.otherLoss)
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) =>
          status ? (
            <Tag className="statusTag" color={statusColorMap[status?.toLowerCase()] || 'default'}>
              {capitalizeFirstLetter(status)}
            </Tag>
          ) : (
            '-'
          ),
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'status')
      },
      {
        title: 'Last Log Entry',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        // width: 155,
        sorter: true,
        sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'updatedAt'),
        render: (_: any, record: IChillerList) =>
          record?.latestLog?.updatedAt
            ? dayjs(record?.latestLog?.updatedAt).format('MM/DD/YY HH:mm')
            : '-'
      }
    ];

    const actionColumn: ColumnsType<any>[number] =
      hasPermission('chiller', 'edit') ||
      hasPermission('chiller', 'view') ||
      userData?.role === USER_ROLES.OPERATOR
        ? {
            title: '',
            key: '_id',
            dataIndex: '_id',
            fixed: 'right',
            render: (id: string) => (
              <div className="actionIonWrap">
                {hasPermission('chiller', 'edit') && (
                  <Link className="actionIcon" to={ROUTES.Edit_CHILLER_MANAGEMENT(id)}>
                    <EditIcon />
                  </Link>
                )}
                {(hasPermission('chiller', 'view') || userData?.role === USER_ROLES.OPERATOR) && (
                  <Link className="actionIcon" to={ROUTES.View_CHILLER_MANAGEMENT(id)}>
                    <EyeOutlined />
                  </Link>
                )}
              </div>
            )
          }
        : {};

    return [...baseColumns, actionColumn];
  }, [args?.sort_by, args?.sort_order, userData?.role]);

  const getColumnTitle = (key: string) => {
    const title = columns.find((col) => col.key === key)?.title;
    return typeof title === 'function' ? key : title;
  };

  const requiredColumnKeys = ['companyName', 'facilityName', 'chillerName'];

  const menu = (
    <div className="chillerColumns">
      <ul className="chillerColumnsList">
        {toggleableColumnKeys?.map((key) => (
          <li key={key}>
            <Checkbox
              checked={visibleColumns[key]}
              disabled={requiredColumnKeys.includes(key)}
              onChange={() => handleColumnToggle(key)}
            >
              <span className="checkboxLabelTitle">{getColumnTitle(key)}</span>
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );

  const handleColumnToggle = (key: string) => {
    if (requiredColumnKeys.includes(key)) return;
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredColumns = useMemo(() => {
    return [
      ...columns.filter((col) => {
        if (!col?.key) return true;
        if (col?.key === '_id') return true; // Always include the action column
        return visibleColumns[col.key as string];
      })
    ];
  }, [columns, visibleColumns]);

  const getAlertClassName = (type?: string): string => {
    switch (type) {
      case ALERT_TYPE.ALERT:
        return 'bgRed';
      case ALERT_TYPE.WARNING:
        return 'bgYellow';
      default:
        return '';
    }
  };

  const renderCell = useCallback((data?: { type?: string; value?: number }) => {
    const className = getAlertClassName(data?.type);
    return <div className={`loss-cell ${className}`}>{data?.value?.toFixed(2) ?? '-'}</div>;
  }, []);

  return (
    <Wrapper>
      <Meta title="Chiller Management" />
      <HeaderToolbar
        title="Chiller management"
        button={
          <div className="chillerButtonWrap">
            {(hasPermission('chiller', 'view') || userData?.role === USER_ROLES.OPERATOR) && (
              <Dropdown overlay={menu} trigger={['click']}>
                <Button
                  type="primary"
                  className="title-btn"
                  size="small"
                  icon={<SlidersOutlined />}
                >
                  Columns
                </Button>
              </Dropdown>
            )}
            {hasPermission('chillerBulkCost', 'edit') && (
              <Button
                type="primary"
                className="title-btn"
                size="small"
                icon={<SyncOutlined />}
                disabled={!chillerIds?.length}
                onClick={() => setIsModalOpen(true)}
              >
                Bulk Update
              </Button>
            )}
            {hasPermission('chiller', 'add') && (
              <Link to={ROUTES.Add_CHILLER_MANAGEMENT}>
                <Button type="primary" className="title-btn" size="small" icon={<PlusOutlined />}>
                  Add Chiller
                </Button>
              </Link>
            )}
          </div>
        }
      />
      <ShadowPaper>
        <div className="chillerContentHeader">
          <div className="dropdownWrap">
            <RenderSelectDropDown
              colClassName="dropdownWithSearch"
              inputProps={{
                value: isCompanyLoading ? null : selectedCompanyId,
                disabled: isCompanyLoading || !!userData?.companyId,
                placeholder: 'Select Company',
                options: companyOptions || [],
                onChange: handleSelectChange
              }}
            />

            <RenderSelectDropDown
              colClassName="dropdownWithSearch"
              inputProps={{
                value: selectedFacilityId,
                disabled: isFacilityLoading || isFacilityListCompanyLoading,
                placeholder: 'Select Facility',
                options: args?.companyId ? facilityOptionsCompany : facilityOptions || [],
                onChange: handleSelectFacilityChange
              }}
            />
          </div>
          <Input
            value={searchVal}
            className="searchChiller"
            placeholder="Search for Chillers"
            prefix={<SearchOutlined />}
            onChange={handleSearchChange}
          />
        </div>
        <CommonTable
          scroll={{ x: 'max-content' }}
          className="chillerDataTable"
          columns={filteredColumns}
          dataSource={data?.chillerList || []}
          pagination={{
            current: args?.page,
            pageSize: args?.limit,
            total: data?.totalRecords || 0
          }}
          onChange={handleTableChange}
          loading={isLoading}
          rowSelection={
            hasPermission('chillerBulkCost', 'edit')
              ? {
                  selectedRowKeys: chillerIds,
                  columnWidth: 60,
                  onChange: (selectedRowKeys: any) => {
                    setChillerIds(selectedRowKeys);
                  },
                  preserveSelectedRowKeys: true // <-- Important!
                }
              : undefined
          }
          emptyText={
            <EmptyState
              isEmpty={isEmpty}
              search={args.search || args.companyId || args.facilityId}
              searchDescription="No Chiller Found"
            />
          }
        />
      </ShadowPaper>
      {isModalOpen && (
        <CommonModal
          open={isModalOpen}
          closeIcon={true}
          closable={true}
          centered={true}
          width={425}
          maskClosable={false}
          className="InactiveModalWrap"
          title={
            <div className="modalTitleWrapper">
              <span className="main-title">Electricity Cost - Bulk Update</span>
            </div>
          }
          onCancel={() => {
            form.resetFields();
            setIsModalOpen(false);
          }}
        >
          <p>
            Change the energy cost of the selected chillers at once by entering the new price
            amount.
          </p>
          <div className="updateCount">
            <h2>{chillerIds?.length || 0}</h2>
            <p>Chillers</p>
          </div>
          <Form form={form} onFinish={onBulkUpdate} disabled={isBulkLoading}>
            <div className="electricityField">
              <RenderTextInput
                label="New Electricity Cost"
                tooltip="Please enter new electricity cost for selected chillers."
                required={true}
                colClassName="addonAfterClass"
                formItemProps={{
                  name: 'energyCost',
                  rules: [
                    {
                      validator: validateEnergyCost(
                        'new electricity cost for selected chillers',
                        true
                      )
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'New Electricity Cost',
                  addonAfterText: 'USD',
                  type: 'text',
                  inputMode: 'decimal',
                  onKeyDown: allowEnergyCost
                }}
              />
            </div>
            <div className="modalFooter">
              <Button
                onClick={() => {
                  form.resetFields();
                  setIsModalOpen(false);
                }}
                disabled={isBulkLoading}
              >
                Cancel
              </Button>
              <Button
                loading={isBulkLoading}
                disabled={isBulkLoading}
                htmlType="submit"
                className="footerBtn"
              >
                Update
              </Button>
            </div>
          </Form>
        </CommonModal>
      )}
    </Wrapper>
  );
};

export default ChillerManagement;
