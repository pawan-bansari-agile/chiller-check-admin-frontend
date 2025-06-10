import React from 'react';

import { Col, Form, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';

const NamePlateForm: React.FC = () => {
  return (
    <Form className="namePlateData">
      <Row gutter={[20, 35]}>
        <Col span={6}>
          <RenderSelect
            colClassName="custom-select-col"
            formItemProps={{
              label: 'Make',
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
        <Col span={6}>
          <RenderTextInput
            label="Model"
            required
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
        <Col span={6}>
          <RenderTextInput
            label="Serial No."
            required
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
        <Col span={6}>
          <RenderSelect
            colClassName="custom-select-col"
            formItemProps={{
              label: 'Year Manufactured',
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
      </Row>
      <Row gutter={[20, 35]}>
        <Col span={6}>
          <RenderSelect
            colClassName="custom-select-col"
            formItemProps={{
              label: 'Refrigerant Type',
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
        <Col span={6}>
          <RenderTextInput
            label="Tons"
            required
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
        <Col span={6}>
          <RenderTextInput
            label="Efficiency Rating"
            required
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
        <Col span={6}>
          <RenderTextInput
            label="Energy Cost (kw. hr.)"
            required
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
