import React from 'react';

import Meta from '@/shared/components/common/Meta';

import UserAddEditForm from '../components/UserAddEditForm';
import { Wrapper } from '../style';

const AddUser: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="User Management" />
      <UserAddEditForm />
    </Wrapper>
  );
};

export default AddUser;
