import React from 'react';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import { Wrapper } from '../style';

const Dashboard: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Dashboard" />
      <HeaderToolbar title="dashboard" />
    </Wrapper>
  );
};

export default Dashboard;
