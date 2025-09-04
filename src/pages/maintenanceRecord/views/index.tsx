import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import { EyeOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';

import { chillerHooks } from '@/services/chiller';
import { ICommonPagination } from '@/services/common/types';
import { companyHooks } from '@/services/company';
import { facilityHooks } from '@/services/facility';
import { maintenanceHooks, maintenanceQueryKey } from '@/services/maintenance';
import { MaintenanceList } from '@/services/maintenance/types';

import { authStore } from '@/store/auth';

import { RenderSelectDropDown } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { IMAGE_MODULE_NAME, IMAGE_URL } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon } from '@/shared/svg';
import {
  buildSearchParams,
  capitalizeFirstLetter,
  debounce,
  getAntDSortOrder,
  getSortOrder,
  hasPermission,
  showToaster,
  toAbsoluteUrl
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

const MaintenanceRecord: React.FC = () => {
  const queryClient = useQueryClient();
  const { userData } = authStore((state) => state);

  const [searchParams, setSearchParams] = useSearchParams();

  const latestSearchParamsRef = useRef(searchParams);
  const [args, setArgs] = useState<ICommonPagination>({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || '',
    sort_by: searchParams.get('sort_by') || '',
    sort_order: searchParams.get('sort_order') || '',
    companyId: searchParams.get('companyId') || userData?.companyId || '',
    facilityId: searchParams.get('facilityId') || '',
    chillerId: searchParams.get('chillerId') || ''
  });
  const [searchVal, setSearchVal] = useState<string>('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [selectedChillerId, setSelectedChillerId] = useState<string | null>(null);
  const [maintenanceIds, setMaintenanceIds] = useState<string[] | []>([]);

  const { data, isLoading } = maintenanceHooks.MaintenanceList(args);
  const { data: companyList, isLoading: isCompanyLoading } = companyHooks.AllCompanyList();
  const { mutate: exportMaintenanceAction, isPending } = maintenanceHooks.useExportMaintenance();

  const isEmpty = !data?.maintenanceList?.length;

  const [facilityArg, setFacilityArg] = useState<ICommonPagination>({
    page: 1,
    limit: 100000,
    search: '',
    sort_by: '',
    sort_order: '',
    companyId: searchParams.get('companyId') || userData?.companyId || ''
  });
  const [chillerArgs, setChillerArgs] = useState<ICommonPagination>({
    page: 1,
    limit: 100000,
    sort_by: '',
    sort_order: '',
    facilityIds: []
  });

  const { data: facilityListCompany, isLoading: isFacilityListCompanyLoading } =
    facilityHooks.FacilityList(facilityArg);

  const { data: chillerList, isLoading: isChillerLoading } =
    chillerHooks.ChillerAllList(chillerArgs);

  // Transforms company list into dropdown options
  const companyOptions = useMemo(() => {
    return (
      companyList?.map((company) => ({
        label: capitalizeFirstLetter(company.name),
        value: company._id
      })) || []
    );
  }, [companyList]);

  const chillerOptions = useMemo(() => {
    return (
      chillerList?.chillerList?.map((chiller) => ({
        label: chiller?.ChillerNo,
        value: chiller._id
      })) || []
    );
  }, [chillerList?.chillerList]);

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

  // Transforms facility list into dropdown options

  const facilityOptionsCompany = useMemo(() => {
    return (
      facilityListCompany?.facilityList?.map((facility) => ({
        label: capitalizeFirstLetter(facility.name),
        value: facility._id
      })) || []
    );
  }, [facilityListCompany]);

  useEffect(() => {
    const facilityFromUrl = searchParams.get('facilityId');

    if (facilityFromUrl && facilityOptionsCompany?.length) {
      setSelectedFacilityId(facilityFromUrl);
      setChillerArgs({
        ...chillerArgs,
        facilityIds: [facilityFromUrl]
      });
    }
  }, [searchParams, facilityOptionsCompany]);

  useEffect(() => {
    const chillerIdFromUrl = searchParams.get('chillerId');

    if (chillerIdFromUrl && chillerOptions?.length) {
      setSelectedChillerId(chillerIdFromUrl);
    }
  }, [chillerOptions, searchParams]);

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

  // Updates state when a company is selected from the dropdown
  const handleSelectChange = (value: string) => {
    setFacilityArg({
      ...facilityArg,
      companyId: value
    });
    setSelectedFacilityId(null);
    setSelectedChillerId(null);
    setSelectedCompanyId(value);
    updateParamsAndArgs({ page: 1, companyId: value, facilityId: '', chillerId: '' });
  };

  // Updates state when a facility is selected from the dropdown
  const handleSelectFacilityChange = (value: string) => {
    setChillerArgs({
      ...chillerArgs,
      facilityIds: [value]
    });
    setSelectedFacilityId(value);
    setSelectedChillerId(null);
    updateParamsAndArgs({ page: 1, facilityId: value, chillerId: '' });
  };

  // Updates state when a facility is selected from the dropdown
  const handleSelectChillerChange = (value: string) => {
    setSelectedChillerId(value);
    updateParamsAndArgs({ page: 1, chillerId: value });
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
        chillerId: currentParams.chillerId || '',
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

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<MaintenanceList> | SorterResult<MaintenanceList>[]
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

  const columns = [
    {
      title: 'Creator & Timestamp',
      dataIndex: 'createdByUser',
      key: 'createdByUser',
      width: 200,
      render: (_: any, data: MaintenanceList) => (
        <div className="updateUser">
          <figure>
            <img
              src={`${data?.createdByUser?.profileImage ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${data?.createdByUser?.profileImage}` : toAbsoluteUrl('/icons/placeHolder.jpg')}`}
              alt="user"
            />
          </figure>
          <div>
            <h4>{data?.createdByUser?.firstName + ' ' + data?.createdByUser?.lastName}</h4>
            <span>{data?.createdAt ? dayjs(data?.createdAt).format('MM/DD/YY HH:mm') : null}</span>
          </div>
        </div>
      )
    },
    {
      title: 'Chiller Name',
      key: 'ChillerNo',
      dataIndex: 'ChillerNo',
      width: 165,
      render: (_: any, record: MaintenanceList) => (
        <div className="chillerNameWrap">
          {/* <a className="chillerName">{record?.chillerName || '-'}</a> */}
          <span>{record?.chiller?.ChillerNo || '-'}</span>
        </div>
      ),
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'ChillerNo')
    },
    {
      title: 'Make / Model',
      key: 'chillerName',
      dataIndex: 'chillerName',
      width: 165,
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'chillerName'),
      render: (value: string) => (
        <>
          {/* <h6 className="makeName">CryoSystems</h6> */}
          <span>{value || '-'}</span>
        </>
      )
    },
    {
      title: 'Category',
      key: 'maintenanceCategory',
      dataIndex: 'maintenanceCategory',
      render: (value: string) => value || '-',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'maintenanceCategory')
    },
    {
      title: 'Type',
      key: 'maintenanceType',
      dataIndex: 'maintenanceType',
      render: (value: string) => value || '-',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'maintenanceType')
    },
    {
      title: 'Operator Notes',
      key: 'comments',
      dataIndex: 'comments',
      render: (value: string) =>
        value ? <>{value.length > 200 ? `${value.slice(0, 200)}...` : value}</> : '-',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'comments')
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 165,
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'updatedAt'),
      render: (value: string) =>
        value ? (
          <>
            <span>{dayjs(value).format('MM/DD/YY')}</span>
            <b className="time">{dayjs(value).format('HH:mm')}</b>
          </>
        ) : (
          '-'
        )
    },
    ...(hasPermission('maintenance', 'edit') || hasPermission('maintenance', 'view')
      ? [
          {
            title: '',
            key: '_id',
            dataIndex: '_id',
            render: (id: string) => (
              <div className="actionIonWrap">
                {hasPermission('maintenance', 'edit') && (
                  <Link className="actionIcon" to={ROUTES.EDIT_MAINTENANCE(id)}>
                    <EditIcon />
                  </Link>
                )}
                {hasPermission('maintenance', 'view') && (
                  <Link className="actionIcon" to={ROUTES.VIEW_MAINTENANCE(id)}>
                    <EyeOutlined />
                  </Link>
                )}
              </div>
            )
          }
        ]
      : [])
  ];

  const exportMaintenance = () => {
    exportMaintenanceAction(
      { maintenanceIds },
      {
        onSuccess: async (res) => {
          const fileName = res?.data?.name;
          if (!fileName) return;
          const excelPath = `${IMAGE_URL}tmp-chiller-check/logs/${fileName}`;
          const a = document.createElement('a');
          a.href = excelPath;
          a.download = fileName; // Optional — helps set filename on some browsers
          document.body.appendChild(a);
          a.click();
          a.remove();
          showToaster('success', res?.message || 'Export Successfully.');
          setMaintenanceIds([]);
          queryClient.invalidateQueries({ queryKey: maintenanceQueryKey.all });
        },
        onError: (err) => {
          showToaster('error', err?.message || err?.message?.[0] || 'Something went wrong');
        }
      }
    );
  };

  return (
    <Wrapper>
      <Meta title="Maintenance Records" />
      <HeaderToolbar
        title="Maintenance Records"
        button={
          <div className="maintenanceButtonWrap">
            {hasPermission('maintenance', 'view') && (
              <Button
                type="primary"
                className="title-btn"
                size="small"
                icon={<UploadOutlined />}
                onClick={exportMaintenance}
                disabled={!maintenanceIds?.length || isPending}
                loading={isPending}
              >
                Export ({maintenanceIds?.length})
              </Button>
            )}
            {hasPermission('maintenance', 'add') && (
              <Button type="primary" className="title-btn" icon={<PlusOutlined />}>
                <Link to={ROUTES.ADD_MAINTENANCE}>Add Maintenance</Link>
              </Button>
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
                value: isFacilityListCompanyLoading ? null : selectedFacilityId,
                disabled: isFacilityListCompanyLoading || !selectedCompanyId,
                placeholder: 'Select Facility',
                options: facilityOptionsCompany || [],
                onChange: handleSelectFacilityChange
              }}
            />

            <RenderSelectDropDown
              colClassName="dropdownWithSearch"
              inputProps={{
                value: isChillerLoading ? null : selectedChillerId,
                placeholder: 'Select Chiller',
                options: chillerOptions || [],
                disabled: !selectedFacilityId || isChillerLoading,
                onChange: handleSelectChillerChange
              }}
            />
          </div>
          <Input
            className="searchChiller"
            placeholder="Search for Chillers"
            prefix={<SearchOutlined />}
            value={searchVal}
            onChange={handleSearchChange}
          />
        </div>
        <CommonTable
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={data?.maintenanceList ?? []}
          loading={isLoading}
          pagination={{
            current: args?.page,
            pageSize: args?.limit,
            total: data?.totalRecords || 0
          }}
          rowSelection={
            hasPermission('maintenance', 'view')
              ? {
                  selectedRowKeys: maintenanceIds,
                  columnWidth: 60,
                  onChange: (selectedRowKeys: any) => {
                    setMaintenanceIds(selectedRowKeys);
                  },
                  preserveSelectedRowKeys: true // <-- Important!
                }
              : undefined
          }
          onChange={handleTableChange}
          emptyText={
            <EmptyState
              isEmpty={isEmpty}
              search={args.search || args.companyId || args.facilityId || args.chillerId}
              searchDescription="No Maintenance Found"
              defaultDescription="No Data"
            />
          }
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default MaintenanceRecord;
