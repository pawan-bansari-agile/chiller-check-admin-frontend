import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import { EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';

import { ICommonPagination } from '@/services/common/types';
import { companyHooks } from '@/services/company';
import { facilityHooks } from '@/services/facility';
import { reportHooks } from '@/services/report';
import { Facility, Report, UpdatedByUser } from '@/services/report/types';

import { authStore } from '@/store/auth';

import { RenderSelectDropDown } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import {
  IMAGE_MODULE_NAME,
  IMAGE_URL,
  NotificationType,
  parameterTypeOptions
} from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon } from '@/shared/svg';
import {
  buildSearchParams,
  capitalizeFirstLetter,
  debounce,
  getAntDSortOrder,
  getSortOrder,
  hasPermission,
  toAbsoluteUrl
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

const Reports: React.FC = () => {
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
    parameter: searchParams.get('parameter') || ''
  });
  const { data, isLoading } = reportHooks.ReportList(args);

  const { data: companyList, isLoading: isCompanyLoading } = companyHooks.AllCompanyList();
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

  const [searchVal, setSearchVal] = useState<string>('');

  const [selectedParameter, setSelectedParameter] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

  const isEmpty = !data?.reports?.length;

  // Transforms company list into dropdown options
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
    }
  }, [searchParams, facilityOptionsCompany]);

  useEffect(() => {
    const parameterFromUrl = searchParams.get('parameter');
    if (parameterFromUrl) {
      setSelectedParameter(parameterFromUrl);
    }
  }, [searchParams]);

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
        parameter: currentParams.parameter || '',
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

  const handleSelectCompanyChange = (value: string) => {
    setFacilityArg({
      ...facilityArg,
      companyId: value
    });
    setSelectedFacilityId(null);
    setSelectedCompanyId(value);
    updateParamsAndArgs({ page: 1, companyId: value, facilityId: '' });
  };

  // Updates state when a facility is selected from the dropdown
  const handleSelectFacilityChange = (value: string) => {
    setSelectedFacilityId(value);
    updateParamsAndArgs({ page: 1, facilityId: value });
  };
  const handleSelectParameterChange = (value: string) => {
    setSelectedParameter(value);
    updateParamsAndArgs({ page: 1, parameter: value });
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Report> | SorterResult<Report>[]
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
      title: 'Report Name',
      key: 'name',
      dataIndex: 'name',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'name')
    },
    {
      title: 'Facility',
      key: 'facility',
      dataIndex: 'facility',
      width: 150,
      render: (data: Facility[]) => {
        return data?.map((fac) => fac?.name)?.join(', ') || '-';
      }
    },
    {
      title: 'Parameter',
      key: 'parameter',
      dataIndex: 'parameter',
      width: 150,
      render: (value: string) => value || '-',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'parameter')
    },
    {
      title: 'Date Range',
      key: 'dateType',
      dataIndex: 'dateType',
      render: (value: string) => value || '-',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'dateType')
    },
    {
      title: 'Notify By',
      key: 'notification',
      dataIndex: 'notification',
      render: (value: string) =>
        value?.toLowerCase() === NotificationType.BOTH?.toLowerCase()
          ? 'Web & Email'
          : capitalizeFirstLetter(value) || '-',
      sorter: true,
      sortOrder: getAntDSortOrder(args?.sort_by, args?.sort_order, 'notification')
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
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
    {
      title: 'Updated By',
      dataIndex: 'updatedByUser',
      key: 'updatedByUser',
      width: 200,
      render: (data: UpdatedByUser) => (
        <div className="updateUser">
          <figure>
            <img
              src={`${data?.profileImage ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${data?.profileImage}` : toAbsoluteUrl('/icons/placeHolder.jpg')}`}
              alt="user"
            />
          </figure>
          <div>
            <h4>{data?.firstName + ' ' + data?.lastName}</h4>
          </div>
        </div>
      )
    },
    ...(hasPermission('report', 'edit') || hasPermission('report', 'view')
      ? [
          {
            title: '',
            key: '_id',
            dataIndex: '_id',
            render: (id: string) => (
              <div className="actionIonWrap">
                {hasPermission('report', 'edit') && (
                  <Link className="actionIcon" to={ROUTES.EDIT_REPORT(id)}>
                    <EditIcon />
                  </Link>
                )}
                {hasPermission('report', 'view') && (
                  <Link className="actionIcon" to={ROUTES.VIEW_REPORT(id)}>
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
      <Meta title="Reports" />
      <HeaderToolbar
        title="Reports"
        button={
          hasPermission('report', 'add') && (
            <Link to={ROUTES.ADD_REPORT}>
              <Button type="primary" className="title-btn" size="small" icon={<PlusOutlined />}>
                Create Report
              </Button>
            </Link>
          )
        }
      />
      <ShadowPaper>
        <div className="reportContentHeader">
          <div className="dropdownWrap">
            <RenderSelectDropDown
              colClassName="dropdownWithSearch"
              inputProps={{
                value: selectedParameter,
                placeholder: 'Select Parameter',
                options: parameterTypeOptions || [],
                onChange: handleSelectParameterChange
              }}
            />

            <RenderSelectDropDown
              colClassName="dropdownWithSearch"
              inputProps={{
                value: isCompanyLoading ? null : selectedCompanyId,
                disabled: isCompanyLoading || !!userData?.companyId,
                placeholder: 'Select Company',
                options: companyOptions || [],
                onChange: handleSelectCompanyChange
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
          </div>
          <Input
            className="searchReport"
            placeholder="Search Report"
            prefix={<SearchOutlined />}
            value={searchVal}
            onChange={handleSearchChange}
          />
        </div>
        <CommonTable
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={data?.reports || []}
          loading={isLoading}
          pagination={{
            current: args?.page,
            pageSize: args?.limit,
            total: data?.totalRecords || 0
          }}
          onChange={handleTableChange}
          emptyText={
            <EmptyState
              isEmpty={isEmpty}
              search={args.search || args.companyId || args.facilityId || args.parameter}
              searchDescription="No Report Found"
              defaultDescription="No Data Found"
            />
          }
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default Reports;
