import React from 'react';

import Meta from '@/shared/components/common/Meta';

import AddEditLog from '../components/AddEditLog';
import { Wrapper } from '../style';

const EditLog: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Log Entries" />
      <AddEditLog />
    </Wrapper>
  );
};

export default EditLog;
