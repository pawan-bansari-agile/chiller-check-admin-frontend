import React from 'react';

import Meta from '@/shared/components/common/Meta';

import FacilityAddEditForm from '../components/facilityAddEditForm';
import { Wrapper } from '../style';

const AddFacility: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Facility Management" />
      <FacilityAddEditForm />
    </Wrapper>
  );
};

export default AddFacility;
