import React from 'react';

import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import FacilityAddEditForm from '../components/facilityAddEditForm';
import { Wrapper } from '../style';

const EditFacility: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Facility Management" />
      <HeaderToolbar
        title="Edit Facility"
        backBtn={true}
        button={
          <Button type="primary" className="title-btn" shape="round">
            Edit
          </Button>
        }
      />
      <FacilityAddEditForm />
    </Wrapper>
  );
};

export default EditFacility;
