import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import AddEditReport from '../components/AddEditReport';
import { Wrapper } from '../style';

const AddReport: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Reports" />
      <HeaderToolbar
        title="Build Reports"
        backBtn={true}
        button={
          <div className="viewButtonWrap">
            <Button className="title-cancel-btn">Cancel</Button>
            <Button type="primary" className="title-btn" size="small" icon={<PlusOutlined />}>
              Generate Report
            </Button>
          </div>
        }
      />
      <AddEditReport />
    </Wrapper>
  );
};

export default AddReport;
