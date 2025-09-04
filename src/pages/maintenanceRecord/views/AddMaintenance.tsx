import React from 'react';

import Meta from '@/shared/components/common/Meta';

import AddEditMaintenance from '../components/AddEditMaintenance';
import { Wrapper } from '../style';

const AddMaintenance: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Maintenance Records" />
      <AddEditMaintenance />
    </Wrapper>
  );
};

export default AddMaintenance;
