import React, { useState } from 'react';

import { ClockCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';

interface Chiller {
  chillerName: string;
  make: string;
  model: string;
  year: string;
  refType: string;
  tons: string;
  serialNumber: string;
  energyCost: string;
  weeklyHours: string;
  weeksPerYear: string;
  avgLoadProfile: string;
}

const defaultChiller: Chiller = {
  chillerName: '',
  make: '',
  model: '',
  year: '',
  refType: '',
  tons: '',
  serialNumber: '',
  energyCost: '',
  weeklyHours: '',
  weeksPerYear: '',
  avgLoadProfile: ''
};

const makeOptions = ['Carrier', 'Daikin', 'FES'];
const modelOptions = ['XE2', 'S1', 'A5'];
const yearOptions = ['2000', '2005', '2010'];
const refTypeOptions = ['R-113', 'R-11', 'R-12'];

const FacilityAddEditForm: React.FC = () => {
  const [chillers, setChillers] = useState<Chiller[]>([{ ...defaultChiller }]);

  const handleChange = (index: number, field: keyof Chiller, value: string) => {
    const updated = [...chillers];
    updated[index][field] = value;
    setChillers(updated);
  };

  const addRow = () => setChillers([...chillers, { ...defaultChiller }]);
  const removeRow = (index: number) => setChillers(chillers.filter((_, i) => i !== index));

  const getTextInput = (index: number, field: keyof Chiller, label: string) => (
    <RenderTextInput
      label={label}
      required
      inputProps={{
        value: chillers[index][field],
        onChange: (e) => handleChange(index, field, e.target.value)
      }}
    />
  );

  const getSelectInput = (
    index: number,
    field: keyof Chiller,
    label: string,
    options: string[]
  ) => (
    <RenderSelect
      formItemProps={{ label }}
      inputProps={{
        value: chillers[index][field],
        onChange: (value: string) => handleChange(index, field, value),
        options: options.map((o) => ({ label: o, value: o }))
      }}
    />
  );

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_: any, __: Chiller, index: number) => <span>{index + 1}</span>
    },
    {
      title: '* Chiller Name',
      key: 'chillerName',
      render: (_: any, __: Chiller, index: number) =>
        getTextInput(index, 'chillerName', 'Chiller Name')
    },
    {
      title: '* Make',
      key: 'make',
      render: (_: any, __: Chiller, index: number) =>
        getSelectInput(index, 'make', 'Make', makeOptions)
    },
    {
      title: '* Model',
      key: 'model',
      render: (_: any, __: Chiller, index: number) =>
        getSelectInput(index, 'model', 'Model', modelOptions)
    },
    {
      title: '* Year',
      key: 'year',
      render: (_: any, __: Chiller, index: number) =>
        getSelectInput(index, 'year', 'Year', yearOptions)
    },
    {
      title: '* Ref. Type',
      key: 'refType',
      render: (_: any, __: Chiller, index: number) =>
        getSelectInput(index, 'refType', 'Ref. Type', refTypeOptions)
    },
    {
      title: '* Tons',
      key: 'tons',
      render: (_: any, __: Chiller, index: number) => getTextInput(index, 'tons', 'Tons')
    },
    {
      title: '* Serial #',
      key: 'serialNumber',
      render: (_: any, __: Chiller, index: number) =>
        getTextInput(index, 'serialNumber', 'Serial #')
    },
    {
      title: '* Energy $',
      key: 'energyCost',
      render: (_: any, __: Chiller, index: number) => getTextInput(index, 'energyCost', 'Energy $')
    },
    {
      title: '* Weekly Opt. Hrs.',
      key: 'weeklyHours',
      render: (_: any, __: Chiller, index: number) =>
        getTextInput(index, 'weeklyHours', 'Weekly Opt. Hrs.')
    },
    {
      title: '* Weeks Per Year',
      key: 'weeksPerYear',
      render: (_: any, __: Chiller, index: number) =>
        getTextInput(index, 'weeksPerYear', 'Weeks Per Year')
    },
    {
      title: '* Avg. Load Profile',
      key: 'avgLoadProfile',
      render: (_: any, __: Chiller, index: number) =>
        getTextInput(index, 'avgLoadProfile', 'Avg. Load Profile')
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, __: Chiller, index: number) => (
        <Button danger type="link" onClick={() => removeRow(index)}>
          Remove
        </Button>
      )
    }
  ];

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <div>
      <ShadowPaper>
        <Form className="add-facility-form" onFinish={onSubmit}>
          <Row gutter={[15, 35]}>
            <Col span={12}>
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

            <Col span={12}>
              <RenderTextInput
                label="Facility Name"
                required
                formItemProps={{
                  name: 'facility name',
                  rules: [
                    {
                      required: true,
                      message: 'Please enter facility name'
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Enter Facility Name'
                }}
              />
            </Col>
          </Row>

          <Row gutter={[15, 35]}>
            <Col span={12}>
              <RenderTextInput
                label="Address line 1"
                required
                formItemProps={{
                  name: 'Address1',
                  rules: [
                    {
                      required: true,
                      message: 'Please enter address line1'
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Address line 1'
                }}
              />
            </Col>
            <Col span={12}>
              <RenderTextInput
                label="Address line 2"
                required
                formItemProps={{
                  name: 'Address2',
                  rules: [
                    {
                      required: true,
                      message: 'Please enter address line2'
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Address line 2'
                }}
              />
            </Col>
          </Row>

          <Row gutter={[15, 35]}>
            <Col span={12}>
              <RenderSelect
                colClassName="custom-select-col"
                formItemProps={{
                  label: 'City',
                  name: 'city',
                  rules: [{ required: true, message: 'Please select a city' }]
                }}
                inputProps={{
                  placeholder: 'Select City',
                  options: [
                    { label: 'New York', value: 'new_york' },
                    { label: 'Los Angeles', value: 'los_angeles' }
                  ]
                }}
              />
            </Col>

            <Col span={12}>
              <RenderSelect
                colClassName="custom-select-col"
                formItemProps={{
                  label: 'State',
                  name: 'state',
                  rules: [{ required: true, message: 'Please select a state' }]
                }}
                inputProps={{
                  placeholder: 'Select State',
                  options: [
                    { label: 'California', value: 'california' },
                    { label: 'New York', value: 'new_york_state' }
                  ]
                }}
              />
            </Col>
          </Row>

          <Row gutter={[15, 35]}>
            <Col span={12}>
              <RenderTextInput
                label="Zipcode"
                required
                formItemProps={{
                  name: 'Address2',
                  rules: [
                    {
                      required: true,
                      message: 'Please enter address line2'
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Enter Zipcode'
                }}
              />
            </Col>

            <Col span={12}>
              <RenderTextInput
                label="Country"
                required
                formItemProps={{
                  name: 'country',
                  rules: [
                    {
                      required: true,
                      message: 'Please enter a country'
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Enter Country'
                }}
              />
            </Col>
          </Row>

          <Row>
            <RenderSelect
              colProps={{ xs: 12 }}
              formItemProps={{
                name: 'timezone',
                label: 'TimeZone',
                rules: [{ required: true, message: 'Please select a timezone' }]
              }}
              inputProps={{
                placeholder: 'Select Timezone',
                suffixIcon: <ClockCircleOutlined />,
                options: [
                  { label: 'IST', value: 'IST' },
                  { label: 'EST', value: 'EST' }
                ]
              }}
            />
          </Row>
        </Form>
      </ShadowPaper>
      <ShadowPaper>
        <h2>Chillers</h2>
        <Form layout="vertical">
          <CommonTable columns={columns} dataSource={chillers} />
          <div
            style={{
              marginTop: 16,
              border: '1px dashed #3b82f6',
              padding: '12px',
              textAlign: 'center'
            }}
          >
            <Button type="link" onClick={addRow} style={{ color: '#3b82f6' }}>
              + Add row
            </Button>
          </div>
        </Form>
      </ShadowPaper>
    </div>
  );
};

export default FacilityAddEditForm;
