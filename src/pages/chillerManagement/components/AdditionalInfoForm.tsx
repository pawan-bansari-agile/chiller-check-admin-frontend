import React from 'react';

import { Col, Form, Row } from 'antd';

import { RenderSelect, RenderTextAreaInput } from '@/shared/components/common/FormField';

const AdditionalInfoForm: React.FC = () => {
  const onSubmit = () => {
    console.log('submit');
  };
  return (
    <Form className="chillerAddEfitForm" onFinish={onSubmit}>
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            label="Oil Pressure Differential"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'Oil Pressure Differential',
              rules: [
                {
                  required: true,
                  message: 'Please select the oil pressure differential'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Select',
              options: [
                { label: 'Do Not Log Tube System', value: 'Do Not Log Tube System' },
                { label: 'Do Not Log Tube System', value: 'Do Not Log Tube System' }
              ]
            }}
          />
        </Col>{' '}
        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            label="Calculate Efficiency Using"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'Calculate Efficiency Using',
              rules: [
                {
                  required: true,
                  message: 'Please select a calculate efficiency'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Select',
              options: [
                { label: 'Run Hours', value: 'Run Hours' },
                { label: 'Run Hours', value: 'Run Hours' }
              ]
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            label="Number of Compressors"
            colClassName="custom-select-col"
            formItemProps={{
              name: '2',
              rules: [
                {
                  required: true,
                  message: 'Please select number of compressors'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Select',
              options: [
                { label: '2', value: '2' },
                { label: '3', value: '3' }
              ]
            }}
          />
        </Col>
        <Col span={24}>
          <RenderTextAreaInput
            colProps={{ span: 24 }}
            label="User Notes"
            formItemProps={{
              name: 'User Notes',
              label: 'User Notes'
            }}
            inputProps={{
              placeholder: 'Enter User Notes',
              autoSize: { minRows: 3, maxRows: 6 }
            }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AdditionalInfoForm;
