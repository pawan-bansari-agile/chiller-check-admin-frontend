import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { EyeOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';

import { ICommonPagination } from '@/services/common/types';
import { facilityHooks } from '@/services/facility';
import { IFacilityListData } from '@/services/facility/types';

import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { USER_ROLES } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { getSortOrder } from '@/shared/utils/functions';

import { Wrapper } from '../style';
import ChillerResponsibilitiesTab from './ChillerResponsibilites';

interface IProps {
  companySelect?: string;
  facilityIds: string[] | [];
  setFacilityIds: React.Dispatch<React.SetStateAction<string[] | []>>;
  chillerIds: string[] | [];
  setChillerIds: React.Dispatch<React.SetStateAction<string[] | []>>;
  role?: string;
}

const FacilityResponsibilitiesTab: React.FC<IProps> = ({
  facilityIds,
  setFacilityIds,
  companySelect,
  role,
  chillerIds,
  setChillerIds
}) => {
  const [args, setArgs] = useState<ICommonPagination>({
    page: 1,
    limit: 10,
    sort_by: '',
    sort_order: '',
    companyId: companySelect
  });

  const { data, isLoading } = facilityHooks.FacilityList(args);

  useEffect(() => {
    if (companySelect) {
      setArgs({
        page: 1,
        limit: 10,
        sort_by: '',
        sort_order: '',
        companyId: companySelect
      });
    }
  }, [companySelect]);

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: 'Facility Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Chillers',
      dataIndex: 'totalChiller',
      key: 'totalChiller',
      sorter: true
    },
    {
      title: 'Operators',
      dataIndex: 'totalOperators',
      key: 'totalOperators',
      sorter: true
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (status: string) => (
        <Tag className="statusTag" color={status ? '#00A86B' : '#CF5439'}>
          {status ? 'Active' : 'Inactive'}
        </Tag>
      ),
      sorter: true
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => (
        <div className="actionIonWrap">
          <Link className="actionIcon" to={ROUTES.View_FACILITY_MANAGEMENT(id)}>
            <EyeOutlined />
          </Link>
        </div>
      )
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IFacilityListData> | SorterResult<IFacilityListData>[]
  ) => {
    if (!Array.isArray(sorter)) {
      setArgs({
        ...args,
        page: pagination?.current ?? 1,
        limit: pagination?.pageSize ?? 10,
        sort_by: sorter?.order ? String(sorter?.field) : '',
        sort_order: getSortOrder(sorter?.order) || ''
      });
    }
  };

  return (
    <Wrapper>
      <h2 className="resposibilityTitle themeColor">Facilities</h2>
      <CommonTable
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={data?.facilityList || []}
        pagination={{
          current: args?.page ?? 1,
          pageSize: args?.limit ?? 10,
          total: data?.totalRecords ?? 0
        }}
        rowSelection={{
          selectedRowKeys: facilityIds,
          onChange: (selectedRowKeys: React.Key[]) => {
            setFacilityIds(selectedRowKeys as string[]);
          }
        }}
        onChange={handleTableChange}
        loading={isLoading}
        emptyText={
          <EmptyState
            isEmpty={!data?.facilityList?.length}
            defaultDescription="No Facility Found"
          />
        }
      />
      {role === USER_ROLES.OPERATOR && facilityIds?.length ? (
        <ChillerResponsibilitiesTab
          chillerIds={chillerIds}
          setChillerIds={setChillerIds}
          facilityIds={facilityIds}
          companyName={data?.facilityList?.[0]?.companyName}
        />
      ) : null}
    </Wrapper>
  );
};

export default FacilityResponsibilitiesTab;
