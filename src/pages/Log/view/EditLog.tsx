import React from 'react';

import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import AddEditLog from '../components/AddEditLog';
import { Wrapper } from '../style';

const EditLog: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Company Management" />
      <HeaderToolbar
        title="Edit Log"
        backBtn={true}
        button={
          <div className="logButtonWrap">
            <Button className="title-cancel-btn">Cancel</Button>
            <Button type="primary" className="title-btn">
              Create
            </Button>
          </div>
        }
      />
      <AddEditLog />
    </Wrapper>
  );
};

export default EditLog;
