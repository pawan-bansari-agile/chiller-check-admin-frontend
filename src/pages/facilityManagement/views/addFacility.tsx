import React from 'react';

import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import FacilityAddEditForm from '../components/facilityAddEditForm';
import { Wrapper } from '../style';

const AddFacility: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Facility Management" />
      <HeaderToolbar
        title="Add Facility"
        backBtn={true}
        button={
          <Button type="primary" shape="round">
            Add
          </Button>
        }
      />
      <FacilityAddEditForm />
    </Wrapper>
  );
};

export default AddFacility;
