import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import { EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

import { ICommonPagination } from '@/services/common/types';
import { companyHooks } from '@/services/company';
import { facilityHooks } from '@/services/facility';
import { IFacilityListData } from '@/services/facility/types';

import { authStore } from '@/store/auth';

import { RenderSelectDropDown } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon } from '@/shared/svg';
import {
  buildSearchParams,
  capitalizeFirstLetter,
  debounce,
  getAntDSortOrder,
  getSortOrder,
  hasPermission
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

const FacilityManagement: React.FC = () => {
  const { userData } = authStore((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();

  const latestSearchParamsRef = useRef(searchParams);

  const [searchVal, setSearchVal] = useState<string>('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [args, setArgs] = useState<ICommonPagination>({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || '',
    sort_by: searchParams.get('sort_by') || '',
    sort_order: searchParams.get('sort_order') || '',
    companyId: searchParams.get('companyId') || userData?.companyId || ''
  });

  const { data, isLoading } = facilityHooks.FacilityList(args);
  const { data: companyList, isLoading: isCompanyLoading } = companyHooks.AllCompanyList();

  const isEmpty = !data?.facilityList?.length;

  const companyOptions = useMemo(() => {
    return (
      companyList?.map((company) => ({
        label: capitalizeFirstLetter(company.name),
        value: company._id
      })) || []
    );
  }, [companyList]);

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
    sorter: SorterResult<IFacilityListData> | SorterResult<IFacilityListData>[]
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

  const handleSelectChange = (value: string) => {
    setSelectedCompanyId(value);
    updateParamsAndArgs({ companyId: value, page: 1 });
  };

  const columns: ColumnsType<IFacilityListData> = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      width: 190,
      render: (value) => value || '-'
    },
    {
      title: 'Facility Name',
      dataIndex: 'name',
      key: 'name',
      width: 190,
      render: (value) => value || '-'
    },
    {
      title: 'Facility Address',
      dataIndex: 'address',
      key: 'address',
      width: 250
    },
    {
      title: 'Timezone',
      dataIndex: 'timezone',
      key: 'timezone',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'timezone')
    },
    {
      title: 'Altitude',
      dataIndex: 'altitude',
      key: 'altitude',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'altitude'),
      render: (_, record) => `${record?.altitude} ${capitalizeFirstLetter(record?.altitudeUnit)}`
    },
    {
      title: 'Chillers',
      dataIndex: 'totalChiller',
      key: 'totalChiller',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'totalChiller')
    },
    {
      title: 'Operators',
      dataIndex: 'totalOperators',
      key: 'totalOperators',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'totalOperators')
    },
    {
      title: 'Facility ID',
      dataIndex: 'facilityCode',
      key: 'facilityCode',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'facilityCode'),
      width: 190
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (status: boolean) => (
        <Tag className="statusTag" color={status ? '#00A86B' : '#CF5439'}>
          {status ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    // {
    //   title: 'Is Assigned',
    //   dataIndex: 'isAssign',
    //   key: 'isAssign',
    //   render: (assigned) => (assigned ? 'Yes' : 'No')
    // },
    ...(hasPermission('facility', 'edit') || hasPermission('facility', 'view')
      ? [
          {
            title: 'Actions',
            dataIndex: '_id',
            key: '_id',
            fixed: 'right' as any,
            render: (id: string) => (
              <div className="actionIonWrap">
                {hasPermission('facility', 'edit') && (
                  <Link className="actionIcon" to={ROUTES.Edit_FACILITY_MANAGEMENT(id)}>
                    <EditIcon />
                  </Link>
                )}
                {hasPermission('facility', 'view') && (
                  <Link className="actionIcon" to={ROUTES.View_FACILITY_MANAGEMENT(id)}>
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
      <Meta title="Facility Management" />
      <HeaderToolbar
        title="Facility management"
        button={
          hasPermission('facility', 'add') && (
            <Link to={ROUTES.Add_FACILITY_MANAGEMENT}>
              <Button type="primary" className="title-btn" size="small" icon={<PlusOutlined />}>
                Add Facility
              </Button>
            </Link>
          )
        }
      />
      <ShadowPaper>
        <div className="facilityContentHeader">
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
          <Input
            value={searchVal}
            className="searchFacility"
            placeholder="Search for Facilities"
            prefix={<SearchOutlined />}
            onChange={handleSearchChange}
          />
        </div>

        <CommonTable
          scroll={{ x: 1700 }}
          columns={columns}
          dataSource={data?.facilityList || []}
          pagination={{
            current: args?.page,
            pageSize: args?.limit,
            total: data?.totalRecords || 0
          }}
          onChange={handleTableChange}
          loading={isLoading}
          emptyText={
            <EmptyState
              isEmpty={isEmpty}
              search={args.search || args.companyId}
              searchDescription="No Facility Found"
            />
          }
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default FacilityManagement;
