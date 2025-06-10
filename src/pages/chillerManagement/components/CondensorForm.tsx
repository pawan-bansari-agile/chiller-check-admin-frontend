import React from 'react';

import { Col, Form, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';

const CondensorForm: React.FC = () => {
  const onSubmit = () => {
    console.log('submit');
  };
  return (
    <Form className="condensorForm" onFinish={onSubmit}>
      <Row gutter={[20, 35]}>
        <Col span={8}>
          <RenderTextInput
            label="Design Chill Water Pressure Drop"
            formItemProps={{
              name: 'chill water pressure drop'
            }}
            inputProps={{
              placeholder: 'Enter Here'
            }}
          />
          <RenderSelect
            colClassName="custom-select-col"
            inputProps={{
              placeholder: 'Choose',
              options: [
                { label: '10 Pa', value: '10 Pa' },
                { label: '20 Pa', value: '20 Pa' }
              ]
            }}
          />
        </Col>
        <Col span={8}>
          <RenderSelect
            colClassName="custom-select-col"
            formItemProps={{
              label: 'Actual Condenser Water Pressure Drop Unit',
              name: 'drop unit',
              rules: [
                {
                  required: true,
                  message: 'Please select actual condensor water pressure drop unit'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Select',
              options: [
                { label: 'Pascal', value: 'pascal' },
                { label: 'Kilopascal', value: 'kilopascal' }
              ]
            }}
          />
        </Col>
        <Col span={8}>
          <RenderSelect
            colClassName="custom-select-col"
            formItemProps={{
              label: 'Condenser Pressure Unit',
              name: 'pressure unit',
              rules: [
                {
                  required: true,
                  message: 'Please select condensor pressure unit'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Select',
              options: [
                { label: 'Pascal', value: 'pascal' },
                { label: 'Kilopascal', value: 'kilopascal' }
              ]
            }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default CondensorForm;
