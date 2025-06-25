import React from 'react';

import { Link } from 'react-router-dom';

import { DownOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, MenuProps, Space, Tag } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon } from '@/shared/svg';
import { toAbsoluteUrl } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const companyItems: MenuProps['items'] = [
  {
    label: <span>Petal Grove Academy</span>,
    key: '0'
  },
  {
    label: <span>Angel investor</span>,
    key: '1'
  }
];

const facilityItems: MenuProps['items'] = [
  {
    label: <span>ChillTech ArcticCore V156</span>,
    key: 'ChillTech ArcticCore V156'
  },
  {
    label: <span>ChillTech ArcticCore V10</span>,
    key: 'ChillTech ArcticCore V10'
  }
];

const roleItems: MenuProps['items'] = [
  {
    label: <span>Admin</span>,
    key: 'Admin'
  },
  {
    label: <span>Corporate Manager</span>,
    key: 'Corporate Manager'
  },
  {
    label: <span>Facility Manager</span>,
    key: 'Facility Manager'
  },
  {
    label: <span>Operator</span>,
    key: 'Operator'
  }
];

const statusColorMap: Record<string, string> = {
  Active: '#00A86B',
  Inactive: '#CF5439'
};

const columns = [
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    render: (user: string) => (
      <div className="userImageWrap">
        <figure className="userImage">
          <img src={toAbsoluteUrl('/icons/header-logo.svg')} alt="user" />
        </figure>
        <span>{user}</span>
      </div>
    )
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: 'Email Address',
    dataIndex: 'emailAddress',
    key: 'emailAddress'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber'
  },
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName'
  },
  {
    title: 'Facility',
    dataIndex: 'facility',
    key: 'facility'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => (
      <Tag className="statusTag" color={statusColorMap[status] || 'default'}>
        {status}
      </Tag>
    )
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <div className="actionIonWrap">
        <Link className="actionIcon" to={ROUTES.EDIT_USER_MANAGEMENT}>
          <EditIcon />
        </Link>
        <Link className="actionIcon" to={ROUTES.VIEW_USER_MANAGEMENT}>
          <EyeOutlined />
        </Link>
      </div>
    )
  }
];

const userData = [
  {
    user: 'Jennifer Lawrence',
    role: 'Corporate Manager',
    emailAddress: 'Jennifer@xyz.com',
    phoneNumber: '+1 203 125 9988',
    companyName: 'Petal Grove Academy',
    facility: 'FreezeMaster ArcticCore V44',
    status: 'Inactive'
  }
];

const UserManagement: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="User Management" />
      <HeaderToolbar
        title="User management"
        button={
          <Link to={ROUTES.ADD_USER_MANAGEMENT}>
            <Button type="primary" className="title-btn" shape="round" icon={<PlusOutlined />}>
              Add New User
            </Button>
          </Link>
        }
      />
      <ShadowPaper>
        <div className="userContentHeader">
          <div className="dropdownWrap">
            <Dropdown menu={{ items: companyItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Select Company
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>

            <Dropdown menu={{ items: facilityItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Select Facility
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>

            <Dropdown menu={{ items: roleItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Select Role
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <Input className="searchUser" placeholder="Search for User" prefix={<SearchOutlined />} />
        </div>
        <CommonTable
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={userData}
          pagination={{ current: 6 }}
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default UserManagement;
