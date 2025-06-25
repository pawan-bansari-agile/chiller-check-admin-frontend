import React from 'react';

import { Col, Form, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';

const GeneralForm: React.FC = () => {
  const onSubmit = () => {
    console.log('submit');
  };
  return (
    <Form className="chillerAddEfitForm" onFinish={onSubmit}>
      <Row gutter={[20, 25]}>
        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            label="Company name"
            colClassName="custom-select-col"
            formItemProps={{
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

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            label="Facility"
            colClassName="custom-select-col"
            formItemProps={{
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

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            label="Type"
            colClassName="custom-select-col"
            formItemProps={{
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

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            label="Unit"
            colClassName="custom-select-col"
            formItemProps={{
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

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderTextInput
            label="Chiller Name/No"
            required
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
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

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderTextInput
            label="Weekly Hours Of Operation"
            colClassName="addonAfterClass"
            required
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
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

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderTextInput
            label="Weeks Per Year"
            required
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
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

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderTextInput
            label="Avg. Load Profile"
            colClassName="addonAfterClass"
            required
            tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
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

        <Col xs={24} sm={24} md={12} lg={8}>
          <RenderSelect
            label="Design Inlet Water Temp"
            colClassName="custom-select-col"
            formItemProps={{
              name: 'Design Inlet Water Temp',
              rules: [{ required: true, message: 'Please select design inlet water temp.' }]
            }}
            inputProps={{
              placeholder: 'Design Inlet Water Temp.',
              options: [
                { label: 'Petal Grove Academy', value: 'petal_grove_academy' },
                { label: 'Angel investor', value: 'angel_investor' }
              ]
            }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default GeneralForm;
