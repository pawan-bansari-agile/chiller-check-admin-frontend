import React from 'react';

import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import UserAddEditForm from '../components/UserAddEditForm';
import { Wrapper } from '../style';

const EditUser: React.FC = () => {
  return (
    <Wrapper>
      {' '}
      <Meta title="User Management" />
      <HeaderToolbar
        title="Edit User"
        backBtn={true}
        button={
          <div className="editButtonWrap">
            <Button type="primary" className="title-btn" shape="round">
              Save
            </Button>
          </div>
        }
      />
      <UserAddEditForm />
    </Wrapper>
  );
};

export default EditUser;
