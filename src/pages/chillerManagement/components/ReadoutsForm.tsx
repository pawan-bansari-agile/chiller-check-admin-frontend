import React from 'react';

import { Col, Form, Row } from 'antd';

import { RenderRadioGroupInput, RenderTextInput } from '@/shared/components/common/FormField';

const ReadoutsForm: React.FC = () => {
  const onSubmit = () => {
    console.log('submit');
  };
  return (
    <Form className="chillerAddEfitForm" onFinish={onSubmit}>
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <RenderRadioGroupInput
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            label="Purge Total Pumpout Time Readout On Chiller?"
            colProps={{ span: 24 }}
            colClassName="radio-field"
            formItemProps={{
              name: 'pumpoutTimeReadout',
              rules: [{ required: true, message: 'This field is required' }]
            }}
            inputProps={{
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
              ]
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <RenderRadioGroupInput
            colProps={{ span: 24 }}
            colClassName="radio-field"
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            label="Purge Total Pumpout Time Measured In What Units?"
            formItemProps={{
              name: 'purgePumpout',
              rules: [{ required: true, message: 'This field is required' }]
            }}
            inputProps={{
              options: [
                { label: 'Mins. Only', value: 'Mins. Only' },
                { label: 'Hrs. & Min.', value: 'Hrs. & Min.' }
              ]
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <RenderTextInput
            label="Max. Daily Purge Total Pumpout Time Before Alert"
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            required
            colClassName="addonAfterClass"
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
              placeholder: 'Design Voltage',
              addonAfterText: 'Min.'
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <RenderRadioGroupInput
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            label="Readout For Bearing Temp.?"
            colProps={{ span: 24 }}
            colClassName="radio-field"
            formItemProps={{
              name: 'bearingTemp',
              rules: [{ required: true, message: 'This field is required' }]
            }}
            inputProps={{
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' }
              ]
            }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default ReadoutsForm;
