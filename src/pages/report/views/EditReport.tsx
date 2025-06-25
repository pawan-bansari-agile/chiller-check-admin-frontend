import React from 'react';

import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import AddEditReport from '../components/AddEditReport';
import { Wrapper } from '../style';

const EditReport: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Reports" />
      <HeaderToolbar
        title="Edit Reports"
        backBtn={true}
        button={
          <div className="viewButtonWrap">
            <Button className="title-cancel-btn">Cancel</Button>
            <Button className="title-cancel-btn">Save Existing Report</Button>
            <Button type="primary" className="title-btn" size="small">
              Generate New Report
            </Button>
          </div>
        }
      />
      <AddEditReport />
    </Wrapper>
  );
};

export default EditReport;
