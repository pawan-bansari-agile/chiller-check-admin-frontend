import React from 'react';

import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';

import AddEditMaintenance from '../components/AddEditMaintenance';
import { Wrapper } from '../style';

const EditMaintenance: React.FC = () => {
  return (
    <Wrapper>
      <HeaderToolbar
        title="Edit Maintenance Record"
        backBtn={true}
        button={
          <div className="maintenanceButtonWrap">
            <Button className="title-cancel-btn">Cancel</Button>
            <Button className="title-btn" type="primary" shape="round">
              Save
            </Button>
          </div>
        }
      />
      <AddEditMaintenance />
    </Wrapper>
  );
};

export default EditMaintenance;
