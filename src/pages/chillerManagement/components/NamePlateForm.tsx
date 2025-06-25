import React from 'react';

import { Col, Form, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';

const NamePlateForm: React.FC = () => {
  return (
    <Form className="chillerAddEfitForm">
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderSelect
            label="Make"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'make',
              rules: [{ required: true, message: 'Please select a make' }]
            }}
            inputProps={{
              placeholder: 'Make',
              options: [
                { label: '2020', value: '2020' },
                { label: '2022', value: '2022' }
              ]
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderTextInput
            label="Model"
            required
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            formItemProps={{
              name: 'model',
              rules: [
                {
                  required: true,
                  message: 'Please enter a model'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Model'
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderTextInput
            label="Serial No."
            required
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            formItemProps={{
              name: 'serial no',
              rules: [
                {
                  required: true,
                  message: 'Please enter a serial no.'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Serial No.'
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderSelect
            label="Year Manufactured"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'year manufactured',
              rules: [{ required: true, message: 'Please select manufactured year' }]
            }}
            inputProps={{
              placeholder: 'Year Manufactured',
              options: [
                { label: '2020', value: '2020' },
                { label: '2022', value: '2022' }
              ]
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderSelect
            label="Refrigerant Type"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'refrigerant type',
              rules: [{ required: true, message: 'Please select refrigerent type' }]
            }}
            inputProps={{
              placeholder: 'Refrigerant Type',
              options: [
                { label: 'HFCs', value: 'HFCs' },
                { label: 'HCFCs', value: 'HCFCs' }
              ]
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderTextInput
            label="Tons"
            required
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            formItemProps={{
              name: 'tons',
              rules: [
                {
                  required: true,
                  message: 'Please enter tons'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Tons'
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderTextInput
            label="Efficiency Rating"
            colClassName="addonAfterClass"
            required={false}
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            formItemProps={{
              name: 'efficiency rating',
              rules: [
                {
                  required: true,
                  message: 'Please enter efficiency rating'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Efficiency Rating',
              addonAfterText: 'kw/ton'
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <RenderTextInput
            label="Energy Cost (kw. hr.)"
            required
            colClassName="addonAfterClass"
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            formItemProps={{
              name: 'Energy Cost',
              rules: [
                {
                  required: true,
                  message: 'Please enter energy cost'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Energy Cost',
              addonAfterText: 'USD'
            }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default NamePlateForm;
