import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import { SearchOutlined } from '@ant-design/icons';
import { Input, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';

import { ICommonPagination } from '@/services/common/types';
import { problemSolutionHooks } from '@/services/problemSolution';
import { IProblemSolution } from '@/services/problemSolution/types';

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
  debounce,
  getSortOrder,
  hasPermission,
  toAbsoluteUrl
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

const columns = [
  {
    title: 'Section',
    dataIndex: 'section',
    key: 'section',
    width: 120,
    sorter: true,
    align: 'left' as any,
    render: (value: string) => <>{value ? value : '-'}</>
  },
  {
    title: 'Field',
    dataIndex: 'field',
    key: 'field',
    width: 120,
    sorter: true,
    render: (value: string) => <>{value ? value : '-'}</>
  },
  {
    title: 'Problem',
    dataIndex: 'problem',
    key: 'problem',
    width: 340,
    sorter: true,
    render: (value: string) =>
      value ? <>{value.length > 200 ? `${value.slice(0, 200)}...` : value}</> : '-'
  },
  {
    title: 'Solution',
    dataIndex: 'solution',
    key: 'solution',
    width: 340,
    sorter: true,
    render: (value: string) =>
      value ? <>{value.length > 200 ? `${value.slice(0, 200)}...` : value}</> : '-'
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    sorter: true,
    width: 200,
    render: (updatedAt: string) => {
      if (!updatedAt) return '-';

      const dateObj = dayjs(updatedAt);
      const date = dateObj?.format('MM/DD/YY');
      const time = dateObj?.format('HH:mm');

      return (
        <>
          {date} <span className="time-bold">{time}</span>
        </>
      );
    }
  },
  {
    title: 'Updated By',
    dataIndex: 'updated_by',
    key: 'updated_by',
    width: 200,
    sorter: true,
    render: (value: string, record: IProblemSolution) => (
      <div className="updateUser">
        <figure>
          <img
            src={`${record?.updated_by_profile ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${record?.updated_by_profile}` : toAbsoluteUrl('/icons/placeHolder.jpg')}`}
            alt="user"
          />
        </figure>
        <h4>{value ? value : '-'}</h4>
      </div>
    )
  },
  ...(hasPermission('setting', 'edit')
    ? [
        {
          title: '',
          key: 'action',
          render: (val: any) => (
            <div className="actionIonWrap">
              {hasPermission('setting', 'edit') && (
                <Link className="actionIcon" to={ROUTES.CONFIGURE_FIELD(val?._id)}>
                  <EditIcon />
                </Link>
              )}
            </div>
          )
        }
      ]
    : [])
];

const ProblemSolution: React.FC = () => {
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

  const { data, isLoading } = problemSolutionHooks.ProblemSolutionList(args);

  const isEmpty = !data?.problemSolutionList?.length;

  useEffect(() => {
    latestSearchParamsRef.current = searchParams;
  }, [searchParams]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IProblemSolution> | SorterResult<IProblemSolution>[]
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

  return (
    <Wrapper>
      <Meta title="Problems & Solutions" />
      <HeaderToolbar title="Problems & Solutions" />
      <ShadowPaper>
        <div className="contentHeader">
          <Input
            className="searchProblem"
            value={searchVal}
            placeholder="Search here"
            prefix={<SearchOutlined />}
            onChange={handleSearchChange}
          />
        </div>
        <CommonTable
          columns={columns}
          dataSource={data?.problemSolutionList}
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
              search={args.search}
              searchDescription="No Problem & Solution Found"
            />
          }
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default ProblemSolution;
