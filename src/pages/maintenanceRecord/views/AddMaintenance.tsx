import React from 'react';

import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import AddEditMaintenance from '../components/AddEditMaintenance';
import { Wrapper } from '../style';

const AddMaintenance: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Maintenance Records" />
      <HeaderToolbar
        title="Add Maintenance Record"
        backBtn={true}
        button={
          <div className="maintenanceButtonWrap">
            <Button className="title-cancel-btn">Cancel</Button>
            <Button className="title-btn" type="primary" shape="round">
              Create
            </Button>
          </div>
        }
      />
      <AddEditMaintenance />
    </Wrapper>
  );
};

export default AddMaintenance;
