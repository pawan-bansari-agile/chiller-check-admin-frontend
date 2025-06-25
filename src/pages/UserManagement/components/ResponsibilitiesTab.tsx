import React from 'react';

import { Link } from 'react-router-dom';

import { EyeOutlined } from '@ant-design/icons';
import { Radio, Tag } from 'antd';

import { CommonTable } from '@/shared/components/common/Table';
import { ROUTES } from '@/shared/constants/routes';

import { Wrapper } from '../style';

const statusColorMap: Record<string, string> = {
  Active: '#00A86B',
  Inactive: '#CF5439'
};

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: () => <Radio></Radio>
  },
  {
    title: 'companyName',
    dataIndex: 'companyName',
    key: 'companyName'
  },
  {
    title: 'Facilities',
    dataIndex: 'facilities',
    key: 'facilities',
    sorter: (a: any, b: any) => a.facility - b.facility
  },
  {
    title: 'Chillers',
    dataIndex: 'chillers',
    key: 'chillers',
    sorter: (a: any, b: any) => a.chillers - b.chillers
  },
  {
    title: 'Operators',
    dataIndex: 'operators',
    key: 'operators',
    sorter: (a: any, b: any) => a.operators - b.operators
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => (
      <Tag className="statusTag" color={statusColorMap[status] || 'default'}>
        {status}
      </Tag>
    ),
    sorter: (a: any, b: any) => a.status - b.status
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: () => (
      <div className="actionIonWrap">
        <Link className="actionIcon" to={ROUTES.VIEW_USER_MANAGEMENT}>
          <EyeOutlined />
        </Link>
      </div>
    )
  }
];

const data = [
  {
    title: '',
    companyName: 'Petal Grove Academy',
    facilities: '10',
    chillers: '25',
    operators: '5',
    status: 'Active',
    action: ''
  }
];

const ResponsibilitiesTab: React.FC = () => {
  return (
    <Wrapper>
      <h2 className="resposibilityTitle">Company</h2>
      <CommonTable columns={columns} dataSource={data} />
    </Wrapper>
  );
};

export default ResponsibilitiesTab;
