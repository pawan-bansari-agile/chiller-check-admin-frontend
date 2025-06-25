import React, { useState } from 'react';

import { ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Select } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';

import { Wrapper } from '../style';

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

const FacilityAddEditForm: React.FC = () => {
  const [chillers, setChillers] = useState<Chiller[]>([{ ...defaultChiller }]);

  const handleChange = (index: number, field: keyof Chiller, value: string) => {
    const updated = [...chillers];
    updated[index][field] = value;
    setChillers(updated);
  };

  const addRow = () => setChillers([...chillers, { ...defaultChiller }]);
  const removeRow = (index: number) => setChillers(chillers.filter((_, i) => i !== index));

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_: any, __: Chiller, index: number) => <span>{index + 1}</span>
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Chiller Name
        </>
      ),
      key: 'chillerName',
      render: (_: any, row: Chiller, index: number) => (
        <input
          className="tableField"
          type="text"
          value={row.chillerName}
          placeholder="Chiller Name"
          onChange={(e) => handleChange(index, 'chillerName', e.target.value)}
        />
      )
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Units
        </>
      ),
      key: 'Units',
      width: 350,
      render: () => (
        <Select
          className="tabSelectField unitsFields"
          options={[
            { label: 'US/English', value: 'US/English' },
            { label: 'SI/Metric', value: 'SI/Metric' }
          ]}
        />
      )
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Make
        </>
      ),
      key: 'make',
      width: 170,
      render: () => (
        <Select className="tabSelectField" options={[{ value: 'Make', label: 'Make' }]} />
      )
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Model
        </>
      ),
      key: 'model',
      width: 170,
      render: () => (
        <Select className="tabSelectField" options={[{ value: 'Model', label: 'Model' }]} />
      )
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Year
        </>
      ),
      key: 'year',
      width: 170,
      render: () => (
        <Select className="tabSelectField" options={[{ value: 'Year', label: 'Year' }]} />
      )
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Ref. Type
        </>
      ),
      key: 'refType',
      width: 170,
      render: () => (
        <Select className="tabSelectField" options={[{ value: 'Ref. Type', label: 'Ref. Type' }]} />
      )
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Tons
        </>
      ),
      key: 'tons',
      width: 100,
      render: (_: any, row: Chiller, index: number) => (
        <input
          className="tableField"
          type="text"
          value={row.chillerName}
          placeholder="Tons"
          onChange={(e) => handleChange(index, 'tons', e.target.value)}
        />
      )
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Serial
        </>
      ),
      key: 'serialNumber',
      width: 100,
      render: (_: any, row: Chiller, index: number) => (
        <input
          className="tableField"
          type="text"
          value={row.chillerName}
          placeholder="Serial"
          onChange={(e) => handleChange(index, 'serialNumber', e.target.value)}
        />
      )
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Energy $
        </>
      ),
      key: 'energyCost',
      render: (_: any, row: Chiller, index: number) => (
        <input
          className="tableField"
          type="text"
          value={row.chillerName}
          placeholder="Energy"
          onChange={(e) => handleChange(index, 'energyCost', e.target.value)}
        />
      )
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Weekly Opt. Hrs.
        </>
      ),
      key: 'weeklyHours',
      render: (_: any, row: Chiller, index: number) => (
        <input
          className="tableField"
          type="text"
          value={row.chillerName}
          placeholder="Weekly Opt. Hrs."
          onChange={(e) => handleChange(index, 'weeklyHours', e.target.value)}
        />
      )
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Weeks Per Year
        </>
      ),
      key: 'weeksPerYear',
      render: (_: any, row: Chiller, index: number) => (
        <input
          className="tableField"
          type="text"
          value={row.chillerName}
          placeholder="Weeks Per Year"
          onChange={(e) => handleChange(index, 'weeksPerYear', e.target.value)}
        />
      )
    },
    {
      title: (
        <>
          <span className="requiredStar">*</span>
          Avg. Load Profile
        </>
      ),
      key: 'avgLoadProfile',
      render: (_: any, row: Chiller, index: number) => (
        <input
          className="tableField"
          type="text"
          value={row.avgLoadProfile}
          placeholder="Avg. Load Profile"
          onChange={(e) => handleChange(index, 'avgLoadProfile', e.target.value)}
        />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, __: Chiller, index: number) => (
        <button
          className={`removeBtn ${chillers.length === 1 ? 'disabled' : ''}`}
          onClick={() => chillers.length > 1 && removeRow(index)}
          disabled={chillers.length === 1}
        >
          Remove
        </button>
      )
    }
  ];

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <Wrapper>
      <div className="shadowPaperWrap">
        <ShadowPaper>
          <Form className="add-facility-form" onFinish={onSubmit}>
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <RenderSelect
                  label="Company name"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'Company name',
                    rules: [{ required: true, message: 'Please select company' }]
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

              <Col xs={24} sm={24} md={12} lg={12}>
                <RenderTextInput
                  label="Facility Name"
                  required
                  tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
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

              <Col xs={24} sm={24} md={12} lg={12}>
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

              <Col xs={24} sm={24} md={12} lg={12}>
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

              <Col xs={24} sm={24} md={12} lg={12}>
                <RenderSelect
                  label="City"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'city',
                    rules: [{ required: true, message: 'Please select city' }]
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

              <Col xs={24} sm={24} md={12} lg={12}>
                <RenderSelect
                  label="State"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'state',
                    rules: [{ required: true, message: 'Please select state' }]
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

              <Col xs={24} sm={24} md={12} lg={12}>
                <RenderTextInput
                  label="Zipcode"
                  required
                  formItemProps={{
                    name: 'zipcode',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter zipcode'
                      }
                    ]
                  }}
                  inputProps={{
                    placeholder: 'Enter Zipcode'
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={12}>
                <RenderTextInput
                  label="Country"
                  required
                  formItemProps={{
                    name: 'country',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter country'
                      }
                    ]
                  }}
                  inputProps={{
                    placeholder: 'Enter Country'
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={12}>
                <RenderSelect
                  label="TimeZone"
                  colProps={{ xs: 24 }}
                  formItemProps={{
                    name: 'timezone',
                    rules: [{ required: true, message: 'Please select timezone' }]
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
              </Col>

              <Col xs={24} sm={24} md={12} lg={12}>
                <Row gutter={[10, 10]} className="altitudeRow">
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <RenderTextInput
                      label="Altitude"
                      required
                      formItemProps={{
                        name: 'altitude',
                        rules: [
                          {
                            required: true,
                            message: 'Please enter altitude'
                          }
                        ]
                      }}
                      inputProps={{
                        placeholder: 'Enter Altitude'
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <RenderSelect
                      colClassName="selectUnitFacility"
                      formItemProps={{
                        name: 'unit',
                        rules: [{ required: true, message: 'Please select unit' }]
                      }}
                      inputProps={{
                        placeholder: 'Select Unit',
                        options: [{ label: 'Feet', value: 'Feet' }]
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </ShadowPaper>
        <ShadowPaper>
          <div className="addFacilityHeader">
            <h2>Chillers</h2>
          </div>
          <Form layout="vertical">
            <CommonTable scroll={{ x: 2400 }} columns={columns} dataSource={chillers} />
            <div>
              <Button onClick={addRow} icon={<PlusOutlined />} className="addChillerBtn">
                Add row
              </Button>
            </div>
          </Form>
        </ShadowPaper>
      </div>
    </Wrapper>
  );
};

export default FacilityAddEditForm;
