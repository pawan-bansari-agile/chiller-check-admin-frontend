import React from 'react';

import { useNavigate } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import AddEditLog from '../components/AddEditLog';
import { Wrapper } from '../style';

const AddLog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Meta title="Log Entries" />
      <HeaderToolbar
        title="Add Log"
        backBtn={true}
        button={
          <div className="logButtonWrap">
            <Button className="title-cancel-btn" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="primary" className="title-btn" icon={<PlusOutlined />}>
              Add / Save
            </Button>
          </div>
        }
      />
      <AddEditLog />
    </Wrapper>
  );
};

export default AddLog;
