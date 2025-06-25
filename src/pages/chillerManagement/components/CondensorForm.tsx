import React from 'react';

import { Col, Form, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';

const CondensorForm: React.FC = () => {
  const onSubmit = () => {
    console.log('submit');
  };
  return (
    <Form className="chillerAddEfitForm" onFinish={onSubmit}>
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Row gutter={[5, 5]} className="doubleInputRow">
            <Col span={16}>
              <RenderTextInput
                label="Design Condenser Water Pressure Drop"
                formItemProps={{
                  name: 'condenser water pressure drop'
                }}
                inputProps={{
                  placeholder: 'Enter Here'
                }}
              />
            </Col>
            <Col span={8}>
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
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderSelect
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            label="Actual Condenser Water Pressure Drop Unit"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'condenser water pressure drop',
              rules: [
                {
                  required: true,
                  message: 'Please select an actual condenser water pressure drop unit'
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
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderSelect
            label="Condenser Pressure Unit"
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            colClassName="custom-select-col"
            formItemProps={{
              name: 'pressure unit',
              rules: [
                {
                  required: true,
                  message: 'Please select the condenser pressure unit'
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

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Design Condenser Approach Temp"
            colClassName="addonAfterClass"
            required={false}
            formItemProps={{
              name: 'Design Condenser Approach Temp',
              rules: [
                {
                  required: true,
                  message: 'Please enter design condensor approach temperature'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Design Condenser Approach Temp',
              addonAfterText: '℉'
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Design Condenser ∆ T"
            required={false}
            formItemProps={{
              name: 'Design Condenser ∆ T'
            }}
            inputProps={{
              placeholder: 'Design Condenser ∆ T'
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Design Condenser Flow"
            required={false}
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            formItemProps={{
              name: 'Design Condenser Flow'
            }}
            inputProps={{
              placeholder: 'Design Condenser Flow'
            }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default CondensorForm;
