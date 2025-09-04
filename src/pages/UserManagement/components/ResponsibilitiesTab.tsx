import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { EyeOutlined } from '@ant-design/icons';
import { Radio, Tag } from 'antd';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';

import { ICommonPagination } from '@/services/common/types';
import { companyHooks } from '@/services/company';
import { CompanyListUnAssigned } from '@/services/company/types';

import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { getDefaultLogs } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { capitalizeFirstLetter, getSortOrder } from '@/shared/utils/functions';

import { Wrapper } from '../style';

interface IProps {
  companyId?: string;
  setCompanyId: React.Dispatch<React.SetStateAction<string>>;
  form: any;
}

const statusColorMap: Record<string, string> = {
  active: '#00A86B',
  inactive: '#CF5439',
  demo: '#D5A513',
  prospect: '#00077B'
};

const ResponsibilitiesTab: React.FC<IProps> = ({ companyId, setCompanyId, form }) => {
  const [args, setArgs] = useState<ICommonPagination>({
    page: 1,
    limit: 10,
    sort_by: '',
    sort_order: ''
  });

  const { data, isLoading } = companyHooks.CompanyListUnAssigned(args);

  const columns = [
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => (
        <Radio
          checked={companyId === id}
          onChange={() => {
            setCompanyId(id || '');
            form.resetFields(['notifyBy', 'general', 'logs']);
            form.setFieldValue('logs', getDefaultLogs());
            form.setFieldValue('programFacility', null);
            form.setFieldValue('programOperator', null);
          }}
        />
      )
    },
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Facilities',
      dataIndex: 'totalFacilities',
      key: 'totalFacilities',
      sorter: true
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
      sorter: true
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => (
        <div className="actionIonWrap">
          <Link className="actionIcon" to={ROUTES.VIEW_COMPANY_MANAGEMENT(id)}>
            <EyeOutlined />
          </Link>
        </div>
      )
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<CompanyListUnAssigned> | SorterResult<CompanyListUnAssigned>[]
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
      <h2 className="resposibilityTitle themeColor">Company</h2>
      <CommonTable
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={data?.companyList}
        pagination={{
          current: args?.page ?? 1,
          pageSize: args?.limit ?? 10,
          total: data?.totalRecords ?? 0
        }}
        onChange={handleTableChange}
        loading={isLoading}
        emptyText={
          <EmptyState isEmpty={!data?.companyList?.length} defaultDescription="No Company Found" />
        }
      />
    </Wrapper>
  );
};

export default ResponsibilitiesTab;
