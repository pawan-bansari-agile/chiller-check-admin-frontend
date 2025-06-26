import React from 'react';

import { Col, Form, Row, Switch } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';

const EvaporatorForm: React.FC = () => {
  const onSubmit = () => {
    console.log('submit');
  };
  return (
    <Form className="chillerAddEfitForm" onFinish={onSubmit}>
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <Row gutter={[5, 5]} className="doubleInputRow">
            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
              <RenderTextInput
                label="Design Chill Water Pressure Drop"
                formItemProps={{
                  name: 'chill water pressure drop'
                }}
                inputProps={{
                  placeholder: 'Enter Here'
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
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
            label="Actual Chill Water Pressure Drop Unit"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'Actual Chill Water Pressure Drop Unit',
              rules: [
                {
                  required: true,
                  message: 'Please select the actual chill water pressure drop'
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
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            label="Evaporator Pressure Unit"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'Evaporator Pressure Unit',
              rules: [
                {
                  required: true,
                  message: 'Please select the evaporator pressure unit'
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
          <div className="switchLabelWrap">
            <label className="switchLabel">
              <i className="esteriskSign">*</i>Enter a Saturated Refrig. Temp.?
            </label>
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Design Evaporator Approach Temp."
            required={false}
            colClassName="addonAfterClass"
            formItemProps={{
              name: 'Design Evaporator Approach Temp.'
            }}
            inputProps={{
              placeholder: 'Design Evaporator Approach Temp',
              addonAfterText: '℉'
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Evaporator Design Outlet Water Temp."
            required
            colClassName="addonAfterClass"
            formItemProps={{
              name: 'Evaporator Design Outlet Water Temp.'
            }}
            inputProps={{
              placeholder: 'Evaporator Design Outlet Water Temp.',
              addonAfterText: '℉'
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Evaporator Design ∆ T"
            required={false}
            colClassName="addonAfterClass"
            formItemProps={{
              name: 'Evaporator Design ∆ T'
            }}
            inputProps={{
              placeholder: 'Evaporator Design ∆ T',
              addonAfterText: '℉'
            }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <RenderTextInput
            label="Evaporator Design Flow"
            required={false}
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            formItemProps={{
              name: 'Design Evaporator Flow'
            }}
            inputProps={{
              placeholder: 'Evaporator Design Flow'
            }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default EvaporatorForm;
