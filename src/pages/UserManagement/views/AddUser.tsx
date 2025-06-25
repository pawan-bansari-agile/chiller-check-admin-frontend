import React from 'react';

import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import UserAddEditForm from '../components/UserAddEditForm';
import { Wrapper } from '../style';

const AddUser: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="User Management" />
      <HeaderToolbar
        title="Add User"
        backBtn={true}
        button={
          <Button type="primary" shape="round" className="title-btn">
            Create
          </Button>
        }
      />
      <UserAddEditForm />
    </Wrapper>
  );
};

export default AddUser;
