import React from 'react';

import { Button } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';

import ChillerAddEditForm from '../components/chillerAddEdit';
import { Wrapper } from '../style';

const AddChiller: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Chiller Management" />
      <HeaderToolbar
        title="Chiller Add"
        backBtn={true}
        button={
          <Button type="primary" shape="round" className="title-btn">
            Add
          </Button>
        }
      />
      <ChillerAddEditForm />
    </Wrapper>
  );
};

export default AddChiller;
