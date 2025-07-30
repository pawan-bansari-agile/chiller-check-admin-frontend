import React from 'react';

import Meta from '@/shared/components/common/Meta';

import ChillerAddEditForm from '../components/chillerAddEdit';
import { Wrapper } from '../style';

const EditChiller: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Chiller Management" />
      <ChillerAddEditForm />
    </Wrapper>
  );
};

export default EditChiller;
