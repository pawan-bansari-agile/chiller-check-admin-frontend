import React from 'react';

import { Col, Form, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';

const GeneralForm: React.FC = () => {
  const onSubmit = () => {
    console.log('submit');
  };
  return (
    <Form className="generalForm" onFinish={onSubmit}>
      <Row gutter={[20, 35]}>
        <Col span={8}>
          <RenderSelect
            colClassName="custom-select-col"
            formItemProps={{
              label: 'Company name',
              name: 'Company name',
              rules: [{ required: true, message: 'Please select a company' }]
            }}
            inputProps={{
              placeholder: 'Select Company',
              options: [
                { label: 'Petal Grove Academy', value: 'petal_grove_academy' },
                { label: 'Angel investor', value: 'angel_investor' }
              ]
            }}
          />
        </Col>

        <Col span={8}>
          <RenderSelect
            colClassName="custom-select-col"
            formItemProps={{
              label: 'Facility',
              name: 'Facility name',
              rules: [{ required: true, message: 'Please select a facility' }]
            }}
            inputProps={{
              placeholder: 'Select Facility',
              options: [
                { label: 'Petal Grove Academy', value: 'petal_grove_academy' },
                { label: 'Angel investor', value: 'angel_investor' }
              ]
            }}
          />
        </Col>

        <Col span={8}>
          <RenderSelect
            colClassName="custom-select-col"
            formItemProps={{
              label: 'Type',
              name: 'type',
              rules: [{ required: true, message: 'Please select a type' }]
            }}
            inputProps={{
              placeholder: 'Select Type',
              options: [
                { label: 'Electric', value: 'electric' },
                { label: 'Chemical', value: 'chemical' }
              ]
            }}
          />
        </Col>
      </Row>

      <Row gutter={[20, 35]}>
        <Col span={8}>
          <RenderSelect
            colClassName="custom-select-col"
            formItemProps={{
              label: 'Unit',
              name: 'unit',
              rules: [{ required: true, message: 'Please select a unit' }]
            }}
            inputProps={{
              placeholder: 'Select Unit',
              options: [
                { label: 'US / English', value: 'us' },
                { label: 'British / English', value: 'british' }
              ]
            }}
          />
        </Col>

        <Col span={8}>
          <RenderTextInput
            label="Chiller Name/No"
            required
            formItemProps={{
              name: 'chiller name-no',
              rules: [
                {
                  required: true,
                  message: 'Please enter chiller name/no'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Chiller Name'
            }}
          />
        </Col>

        <Col span={8}>
          <RenderTextInput
            label="Weekly Hours Of Operation"
            required
            formItemProps={{
              name: 'weekly hours',
              rules: [
                {
                  required: true,
                  message: 'Please enter weekly hours of operation'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Weekly Hours Of Operation',
              addonAfterText: 'Hrs'
            }}
          />
        </Col>
      </Row>

      <Row gutter={[20, 35]}>
        <Col span={8}>
          <RenderTextInput
            label="Weeks Per Year"
            required
            formItemProps={{
              name: 'weeks per year',
              rules: [
                {
                  required: true,
                  message: 'Please enter weeks per year'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Weeks Per Year'
            }}
          />
        </Col>

        <Col span={8}>
          <RenderTextInput
            label="Avg. Load Profile"
            required
            formItemProps={{
              name: 'avg load profile',
              rules: [
                {
                  required: true,
                  message: 'Please enter average load profile.'
                }
              ]
            }}
            inputProps={{
              placeholder: 'Avg. Load Profile',
              addonAfterText: '%'
            }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default GeneralForm;
