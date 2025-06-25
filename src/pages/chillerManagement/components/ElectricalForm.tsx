import React from 'react';

import { Col, Form, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';

const ElectricalForm: React.FC = () => {
  const onSubmit = () => {
    console.log('submit');
  };
  return (
    <Form className="chillerAddEfitForm" onFinish={onSubmit}>
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <RenderTextInput
            label="Design Voltage"
            required
            formItemProps={{
              name: 'Design Voltage',
              rules: [
                {
                  required: true,
                  message: 'Please enter the design voltage'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Design Voltage'
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <RenderSelect
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            label="Voltage Choice"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'Voltage Choice',
              rules: [
                {
                  required: true,
                  message: 'Please select a voltage choice'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Voltage Choice',
              options: [
                { label: 'Pascal', value: 'pascal' },
                { label: 'Kilopascal', value: 'kilopascal' }
              ]
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <RenderTextInput
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            label="Full-Load Amperage"
            required
            formItemProps={{
              name: 'Full-Load Amperage',
              rules: [
                {
                  required: true,
                  message: 'Please enter the full-load amperage'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Full-Load Amperage'
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <RenderSelect
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            label="Amperage Choice"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'Amperage Choice',
              rules: [
                {
                  required: true,
                  message: 'Please select an amperage option'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Amperage Choice',
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

export default ElectricalForm;
