import React from 'react';

import { Link } from 'react-router-dom';

import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Tag, Tooltip } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable, TableSummaryCell } from '@/shared/components/common/Table';
import { ROUTES } from '@/shared/constants/routes';

import { Wrapper } from '../style';

const companyData = [
  {
    id: 'HBK1006',
    corporateName: 'Petal Grove Academy',
    address: '430 East 86th St, New York, NY 10028, United States',
    facility: 3,
    chillers: 3,
    website: 'www.Petalgrover.com',
    status: 'Demo',
    isAssigned: false
  }
];

const statusColorMap: Record<string, string> = {
  Active: 'green',
  Inactive: 'volcano',
  Demo: 'gold',
  Prospect: 'blue'
};

const columns = [
  {
    title: 'Corporate name',
    dataIndex: 'corporateName',
    key: 'corporateName'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Facility',
    dataIndex: 'facility',
    key: 'facility',
    sorter: (a: any, b: any) => a.facility - b.facility
  },
  {
    title: 'Chillers',
    dataIndex: 'chillers',
    key: 'chillers',
    sorter: (a: any, b: any) => a.chillers - b.chillers
  },
  {
    title: 'Company Website',
    dataIndex: 'website',
    key: 'website',
    render: (text: any) => (
      <a href={`https://${text}`} target="_blank" rel="noreferrer">
        {text}
      </a>
    )
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a: any, b: any) => a.id.localeCompare(b.id)
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => <Tag color={statusColorMap[status] || 'default'}>{status}</Tag>
  },
  {
    title: 'Is Assigned',
    dataIndex: 'isAssigned',
    key: 'isAssigned',
    render: (assigned: any) => (assigned ? 'Yes' : 'No')
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <Space>
        <Tooltip title="Edit">
          <Button icon={<EditOutlined />} size="small" />
        </Tooltip>
        <Tooltip title="Delete">
          <Button icon={<DeleteOutlined />} size="small" danger />
        </Tooltip>
        <Tooltip title="View">
          <Button icon={<EyeOutlined />} size="small" />
        </Tooltip>
      </Space>
    )
  }
];

const CompanyManagement: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Company Management" />
      <HeaderToolbar
        title="Company management"
        button={
          <Link to={ROUTES.Add_COMPANY_MANAGEMENT}>
            <Button type="primary" shape="round" icon={<PlusOutlined />}>
              Add Company
            </Button>
          </Link>
        }
      />
      <div>
        <ShadowPaper>
          <CommonTable
            columns={columns}
            dataSource={companyData}
            pagination={{ current: 6 }}
            summaryRow={
              <>
                <TableSummaryCell
                  index={0}
                  colSpan={9}
                  component={<strong>Total 85 items</strong>}
                />
              </>
            }
          />
        </ShadowPaper>
      </div>
    </Wrapper>
  );
};

export default CompanyManagement;
