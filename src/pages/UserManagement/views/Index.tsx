import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import { EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, TablePaginationConfig, Tag } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

import { ICommonPagination } from '@/services/common/types';
import { companyHooks } from '@/services/company';
import { facilityHooks } from '@/services/facility';
import { userHooks } from '@/services/user';
import { IUser } from '@/services/user/types';

import { authStore } from '@/store/auth';

import { RenderSelectDropDown } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { IMAGE_MODULE_NAME, IMAGE_URL, Role, USER_ADD_ROLE, USER_ROLES } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon } from '@/shared/svg';
import {
  buildSearchParams,
  capitalizeFirstLetter,
  debounce,
  formatPhoneNumberInUsFormat,
  getSortOrder,
  hasPermission,
  toAbsoluteUrl
} from '@/shared/utils/functions';

import { Wrapper } from '../style';

const columns = [
  {
    title: 'User',
    dataIndex: 'name',
    key: 'name',
    render: (value: string, record: IUser) => (
      <div className="userImageWrap">
        <figure className="userImage">
          <img
            src={`${record.profileImage ? `${IMAGE_URL}chiller-check/${IMAGE_MODULE_NAME.PROFILE_PIC}/${record?.profileImage || ''}` : toAbsoluteUrl('/icons/placeHolder.jpg')}`}
            alt="user"
          />
        </figure>
        <span>{value}</span>
      </div>
    )
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role: string) => Role?.find((val) => val?.value === role)?.label || '-'
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    key: 'email',
    width: 160
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: formatPhoneNumberInUsFormat
  },
  {
    title: 'Company Name',
    dataIndex: 'company',
    key: 'company',
    width: 180,
    render: (value: { name: string }) => value?.name || '-'
  },
  {
    title: 'Facilities',
    dataIndex: 'facilities',
    key: 'facilities',
    render: (value: { name: string }[]) => value?.map((val) => val?.name)?.join(', ') || '-'
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
  ...(hasPermission('users', 'edit') || hasPermission('users', 'view')
    ? [
        {
          title: '',
          key: '_id',
          dataIndex: '_id',
          render: (id: string) => (
            <div className="actionIonWrap">
              {hasPermission('users', 'edit') && (
                <Link className="actionIcon" to={ROUTES.EDIT_USER_MANAGEMENT(id)}>
                  <EditIcon />
                </Link>
              )}
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

const UserManagement: React.FC = () => {
  const { userData } = authStore((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();
  const latestSearchParamsRef = useRef(searchParams);
  const [searchVal, setSearchVal] = useState<string>('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [args, setArgs] = useState<ICommonPagination>({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || '',
    sort_by: searchParams.get('sort_by') || '',
    sort_order: searchParams.get('sort_order') || '',
    companyId: searchParams.get('companyId') || userData?.companyId || '',
    facilityId: searchParams.get('facilityId') || '',
    role: searchParams.get('role') || ''
  });

  // Fetch all companies using custom hook
  const { data, isLoading } = userHooks.UserList(args);
  const { data: companyList, isLoading: isCompanyLoading } = companyHooks.AllCompanyList();
  const { data: facilityList, isLoading: isFacilityLoading } = facilityHooks.AllFacilityList();
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

  const isEmpty = !data?.userList?.length;

  const getOptionsByRole = useCallback(() => {
    switch (userData?.role) {
      case USER_ROLES.ADMIN:
        return USER_ADD_ROLE;
      case USER_ROLES.SUB_ADMIN:
        return USER_ADD_ROLE.slice(1);
      case USER_ROLES.CORPORATE_MANAGER:
        return USER_ADD_ROLE.slice(2);
      case USER_ROLES.FACILITY_MANAGER:
        return USER_ADD_ROLE.slice(3);
      default:
        return [];
    }
  }, [userData?.role]);

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
  const facilityOptions = useMemo(() => {
    return (
      facilityList?.map((facility) => ({
        label: capitalizeFirstLetter(facility.name),
        value: facility._id
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
    const facilityFromUrl = searchParams.get('facilityId');

    if (facilityFromUrl && (facilityOptions?.length || facilityOptionsCompany?.length)) {
      setSelectedFacilityId(facilityFromUrl);
    }
  }, [searchParams, facilityOptions, facilityOptionsCompany]);

  useEffect(() => {
    const roleFromUrl = searchParams.get('role');

    if (roleFromUrl && Role.some((roleOption) => roleOption.value === roleFromUrl)) {
      setSelectedRoleId(roleFromUrl);
    }
  }, [searchParams]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IUser> | SorterResult<IUser>[]
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
        role: currentParams.role || '',
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

  // Updates state when a facility is selected from the dropdown
  const handleSelectRoleChange = (value: string) => {
    setSelectedRoleId(value);
    updateParamsAndArgs({ page: 1, role: value });
  };

  return (
    <Wrapper>
      <Meta title="User Management" />
      <HeaderToolbar
        title="User management"
        button={
          hasPermission('users', 'add') && (
            <Link to={ROUTES.ADD_USER_MANAGEMENT}>
              <Button type="primary" className="title-btn" shape="round" icon={<PlusOutlined />}>
                Add New User
              </Button>
            </Link>
          )
        }
      />
      <ShadowPaper>
        <div className="userContentHeader">
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

            <RenderSelectDropDown
              colClassName="dropdownWithSearch"
              inputProps={{
                value: selectedRoleId,
                placeholder: 'Select Role',
                options: getOptionsByRole() || [],
                onChange: handleSelectRoleChange
              }}
            />
          </div>
          <Input
            value={searchVal}
            className="searchUser"
            placeholder="Search for User"
            prefix={<SearchOutlined />}
            onChange={handleSearchChange}
          />
        </div>
        <CommonTable
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={data?.userList || []}
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
              search={args.search || args.companyId || args.facilityId || args.role}
              searchDescription="No User Found"
            />
          }
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default UserManagement;
