import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import { EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, TablePaginationConfig, Tag } from 'antd';
import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';

import { ICommonPagination } from '@/services/common/types';
import { companyHooks } from '@/services/company';
import { ICompanyListData } from '@/services/company/types';

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

const statusColorMap: Record<string, string> = {
  active: '#00A86B',
  inactive: '#CF5439',
  demo: '#D5A513',
  prospect: '#00077B'
};

const CompanyManagement: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const latestSearchParamsRef = useRef(searchParams);

  const [searchVal, setSearchVal] = useState<string>('');
  const [args, setArgs] = useState<ICommonPagination>({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || '',
    sort_by: searchParams.get('sort_by') || '',
    sort_order: searchParams.get('sort_order') || ''
  });
  const { data, isLoading } = companyHooks.CompanyList(args);
  const isEmpty = !data?.companyList?.length;

  useEffect(() => {
    if (args?.search) setSearchVal(args?.search);
  }, [args?.search]);

  useEffect(() => {
    latestSearchParamsRef.current = searchParams;
  }, [searchParams]);

  const updateParamsAndArgs = useCallback(
    (newArgs: Partial<ICommonPagination>, baseParams?: URLSearchParams) => {
      const currentParams = Object.fromEntries((baseParams || searchParams).entries());

      const mergedArgs: Record<string, any> = {
        page: Number(currentParams.page) || 1,
        limit: Number(currentParams.limit) || 10,
        search: currentParams.search || '',
        sort_by: currentParams.sort_by ?? '', // <-- always ensure present
        sort_order: currentParams.sort_order ?? '', // <-- always ensure present
        ...newArgs // override anything as needed
      };

      // Apply number conversion only after merge
      if (mergedArgs.page) mergedArgs.page = Number(mergedArgs.page);
      if (mergedArgs.limit) mergedArgs.limit = Number(mergedArgs.limit);

      setArgs(mergedArgs as ICommonPagination);
      setSearchParams(buildSearchParams(mergedArgs));
    },
    [searchParams, setSearchParams]
  );

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<ICompanyListData> | SorterResult<ICompanyListData>[]
  ) => {
    if (!Array.isArray(sorter)) {
      updateParamsAndArgs({
        page: pagination?.current ?? 1,
        limit: pagination?.pageSize ?? 10,
        sort_by: sorter?.order ? String(sorter?.field) : '',
        sort_order: getSortOrder(sorter?.order) || ''
      });
    }
  };

  const debouncedSearch = useRef(
    debounce((value: string) => {
      const trimmed = value?.trim();
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

  const columns: ColumnsType<ICompanyListData> = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      render: (value) => capitalizeFirstLetter(value),
      width: 220
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 220
    },
    {
      title: 'Facility',
      dataIndex: 'totalFacilities',
      key: 'totalFacilities',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'totalFacilities')
    },
    {
      title: 'Chillers',
      dataIndex: 'totalChiller',
      key: 'totalChiller',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'totalChiller')
    },
    {
      title: 'Company Website',
      dataIndex: 'website',
      key: 'website',
      width: 160,
      render: (text) => (
        <a className="companyWebsiteLink" href={`https://${text}`} target="_blank" rel="noreferrer">
          {text || '-'}
        </a>
      )
    },
    {
      title: 'Company ID',
      dataIndex: 'companyCode',
      key: 'companyCode',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'companyCode')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag className="statusTag" color={statusColorMap[status?.toLowerCase()] || 'default'}>
          {capitalizeFirstLetter(status)}
        </Tag>
      ),
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'status')
    },
    {
      title: 'Is Assigned',
      dataIndex: 'isAssign',
      key: 'isAssign',
      render: (assigned) => (assigned ? 'Yes' : 'No'),
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'isAssign')
    },
    ...(hasPermission('company', 'edit') || hasPermission('company', 'view')
      ? [
          {
            title: '',
            key: '_id',
            dataIndex: '_id',
            render: (id: string) => (
              <div className="actionIonWrap">
                {hasPermission('company', 'edit') && (
                  <Link className="actionIcon" to={ROUTES.Edit_COMPANY_MANAGEMENT(id)}>
                    <EditIcon />
                  </Link>
                )}
                {hasPermission('company', 'view') && (
                  <Link className="actionIcon" to={ROUTES.VIEW_COMPANY_MANAGEMENT(id)}>
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
      <Meta title="Company Management" />
      <HeaderToolbar
        title="Company management"
        button={
          hasPermission('company', 'add') && (
            <Link to={ROUTES.Add_COMPANY_MANAGEMENT}>
              <Button type="primary" className="title-btn" shape="round" icon={<PlusOutlined />}>
                Add Company
              </Button>
            </Link>
          )
        }
      />
      <ShadowPaper>
        <div className="companyContentHeader">
          <Input
            value={searchVal}
            className="searchCompany"
            placeholder="Search for Company"
            prefix={<SearchOutlined />}
            onChange={handleSearchChange}
          />
        </div>

        <CommonTable
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={data?.companyList || []}
          pagination={{
            current: args?.page ?? 1,
            pageSize: args?.limit ?? 10,
            total: data?.totalRecords ?? 0
          }}
          onChange={handleTableChange}
          loading={isLoading}
          emptyText={
            <EmptyState
              isEmpty={isEmpty}
              search={args?.search}
              searchDescription="No Company Found"
            />
          }
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default CompanyManagement;
