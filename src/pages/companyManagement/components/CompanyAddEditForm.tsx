import React, { useState } from 'react';

import { Button, Col, Form, Row } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';

interface Facility {
  facilityName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  timeZone: string;
}

const defaultFacility: Facility = {
  facilityName: '',
  address: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  timeZone: 'EST'
};

const CompanyAddEditForm: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([defaultFacility]);
  const [form] = Form.useForm();

  const handleChange = (index: number, field: keyof Facility, value: string) => {
    const updated = [...facilities];
    updated[index][field] = value;
    setFacilities(updated);
  };

  const handleAddFacility = () => {
    setFacilities([...facilities, { ...defaultFacility }]);
  };

  const handleRemoveFacility = (index: number) => {
    const updated = facilities.filter((_, i) => i !== index);
    setFacilities(updated);
  };

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_: any, __: Facility, index: number) => <>{index + 1}</>
    },
    {
      title: '* Facility name',
      key: 'facilityName',
      render: (_: any, row: Facility, index: number) => (
        <input
          type="text"
          value={row.facilityName}
          placeholder="Facility"
          onChange={(e) => handleChange(index, 'facilityName', e.target.value)}
        />
      )
    },
    {
      title: '* Address',
      key: 'address',
      render: (_: any, row: Facility, index: number) => (
        <input
          type="text"
          value={row.address}
          placeholder="Address"
          onChange={(e) => handleChange(index, 'address', e.target.value)}
        />
      )
    },
    {
      title: 'City',
      key: 'city',
      render: (_: any, row: Facility, index: number) => (
        <input
          type="text"
          value={row.city}
          placeholder="City"
          onChange={(e) => handleChange(index, 'city', e.target.value)}
        />
      )
    },
    {
      title: 'State',
      key: 'state',
      render: (_: any, row: Facility, index: number) => (
        <input
          type="text"
          value={row.state}
          placeholder="State"
          onChange={(e) => handleChange(index, 'state', e.target.value)}
        />
      )
    },
    {
      title: 'Country',
      key: 'country',
      render: (_: any, row: Facility, index: number) => (
        <input
          type="text"
          value={row.country}
          placeholder="Country"
          onChange={(e) => handleChange(index, 'country', e.target.value)}
        />
      )
    },
    {
      title: 'Zip code',
      key: 'zipCode',
      render: (_: any, row: Facility, index: number) => (
        <input
          type="text"
          value={row.zipCode}
          placeholder="Zip code"
          onChange={(e) => handleChange(index, 'zipCode', e.target.value)}
        />
      )
    },
    {
      title: '* TimeZone',
      key: 'timeZone',
      render: (_: any, row: Facility, index: number) => (
        <select
          value={row.timeZone}
          onChange={(e) => handleChange(index, 'timeZone', e.target.value)}
        >
          <option value="EST">EST</option>
          <option value="CST">CST</option>
          <option value="MST">MST</option>
          <option value="PST">PST</option>
        </select>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, __: Facility, index: number) =>
        facilities.length > 1 ? (
          <button onClick={() => handleRemoveFacility(index)}>Remove</button>
        ) : null
    }
  ];

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <div>
      <ShadowPaper>
        <div className="company-details-header">
          <h2>Company details</h2>
          <Button type="primary" shape="round">
            Save
          </Button>
        </div>
        <Form className="add-company-form" form={form} onFinish={onSubmit}>
          <Row gutter={[15, 35]}>
            <Col span={8}>
              <RenderTextInput
                label="Company name"
                required
                formItemProps={{
                  name: 'companyName',
                  rules: [
                    {
                      required: true,
                      message: 'Please enter company name'
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Enter Company name'
                }}
              />
            </Col>
            <Col span={8}>
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
            <Col span={8}>
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
            <Col span={8}>
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

            <Col span={8}>
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

            <Col span={8}>
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
          </Row>

          <Row gutter={[15, 35]}>
            <Col span={8}>
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

            <Col span={8}>
              <RenderTextInput
                label="Corporate website"
                required
                formItemProps={{
                  name: 'corporateWebsite',
                  rules: [
                    {
                      required: true,
                      message: 'Please enter corporate website'
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Add Corporate website'
                }}
              />
            </Col>
          </Row>
        </Form>
      </ShadowPaper>
      <ShadowPaper>
        <CommonTable columns={columns} dataSource={facilities} />
        <div style={{ marginTop: '12px' }}>
          <button
            onClick={handleAddFacility}
            style={{
              color: '#3b82f6',
              border: '1px dashed #3b82f6',
              background: 'transparent',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            + Add Facility
          </button>
        </div>
      </ShadowPaper>
    </div>
  );
};

export default CompanyAddEditForm;
