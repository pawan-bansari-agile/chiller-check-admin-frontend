import React from 'react';

import Meta from '@/shared/components/common/Meta';

import AddEditReport from '../components/AddEditReport';
import { Wrapper } from '../style';

const AddReport: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Reports" />
      <AddEditReport />
    </Wrapper>
  );
};

export default AddReport;
