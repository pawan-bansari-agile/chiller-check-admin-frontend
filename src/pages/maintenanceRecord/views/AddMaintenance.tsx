import React from 'react';

import { useNavigate } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import AddEditMaintenance from '../components/AddEditMaintenance';
import { Wrapper } from '../style';

const AddMaintenance: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Meta title="Maintenance Records" />
      <HeaderToolbar
        title="Add Maintenance Record"
        backBtn={true}
        button={
          <div className="maintenanceButtonWrap">
            <Button className="title-cancel-btn" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button className="title-btn" type="primary" shape="round" icon={<PlusOutlined />}>
              Add / Save
            </Button>
          </div>
        }
      />
      <AddEditMaintenance />
    </Wrapper>
  );
};

export default AddMaintenance;
