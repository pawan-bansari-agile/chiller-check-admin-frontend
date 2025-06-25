import React from 'react';

import {
  ExclamationCircleOutlined,
  LockOutlined,
  LoginOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { Button, Tabs, TabsProps } from 'antd';

import Details from '@/shared/components/common/Details';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { EditIcon, EmailIcon, User, UserRole } from '@/shared/svg';

import PermissionTab from '../components/PermissionTab';
import { Wrapper } from '../style';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Permission',
    children: <PermissionTab />
  }
];

const ViewUser: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="User Management" />
      <HeaderToolbar
        title="View User"
        backBtn={true}
        button={
          <div className="button-wrap">
            <Button className="title-cancel-btn" shape="round">
              Inactive
            </Button>

            <Button type="primary" className="title-btn" shape="round" icon={<LockOutlined />}>
              Change Password Link
            </Button>

            <Button type="primary" className="title-btn" shape="round" icon={<EditIcon />}>
              Edit
            </Button>
          </div>
        }
      />
      <div className="viewCompanyShadow">
        <ShadowPaper>
          <div className="viewUserDetails">
            <h2>User Details</h2>
          </div>
          <div className="userInfo">
            <figure className="userImg">
              <img src="/icons/icon.png" alt="user" />
            </figure>
            <ul className="userDetailsList">
              <Details
                detailsIcon={<User />}
                detailsTitle="Full Name"
                detailsDescription="Joey Tribiyani"
              />
              <Details
                detailsIcon={<UserRole />}
                detailsTitle="User Role"
                detailsDescription="Admin"
              />
              <Details
                detailsIcon={<LoginOutlined />}
                detailsTitle="Last Log in"
                detailsDescription="12:00 pm, 12th aug 2024"
              />
              <Details
                detailsIcon={<EmailIcon />}
                detailsTitle="Email"
                detailsDescription="joey.T95@gmail.com"
              />
              <Details
                detailsIcon={<PhoneOutlined />}
                detailsTitle="Phone Number"
                detailsDescription="+1 203 125 9988"
              />
              <Details
                detailsIcon={<ExclamationCircleOutlined />}
                detailsTitle="Status"
                detailsDescription={<button className="statusBtn active">Active</button>}
              />
            </ul>
          </div>
        </ShadowPaper>
        <ShadowPaper>
          <Tabs defaultActiveKey="1" items={items} />
        </ShadowPaper>
      </div>
    </Wrapper>
  );
};

export default ViewUser;
