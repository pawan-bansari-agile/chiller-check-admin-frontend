import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { DownOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Dropdown, Form, Input, MenuProps, Row, Space, Tag } from 'antd';

import {
  CKEditorFormItem,
  RenderSelect,
  RenderTextAreaInput,
  RenderTextInput
} from '@/shared/components/common/FormField';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { hasPermission, toAbsoluteUrl } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const companyItems: MenuProps['items'] = [
  {
    label: <span>Petal Grove Academy</span>,
    key: '0'
  },
  {
    label: <span>Angel investor</span>,
    key: '1'
  }
];

const facilityItems: MenuProps['items'] = [
  {
    label: <span>ChillTech ArcticCore V156</span>,
    key: 'ChillTech ArcticCore V156'
  },
  {
    label: <span>ChillTech ArcticCore V10</span>,
    key: 'ChillTech ArcticCore V10'
  }
];

const roleItems: MenuProps['items'] = [
  {
    label: <span>Admin</span>,
    key: 'Admin'
  },
  {
    label: <span>Corporate Manager</span>,
    key: 'Corporate Manager'
  },
  {
    label: <span>Facility Manager</span>,
    key: 'Facility Manager'
  },
  {
    label: <span>Operator</span>,
    key: 'Operator'
  }
];

const columns = [
  {
    title: () => <Checkbox />,
    dataIndex: 'selectAll',
    key: 'selectAll',
    render: () => <Checkbox checked />
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    width: 200,
    render: () => (
      <div className="updateUser">
        <figure>
          <img src={toAbsoluteUrl('/public/icons/header-logo.svg')} alt="user" />
        </figure>
        <h4>Joey Tribiyani</h4>
      </div>
    )
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role'
  },
  {
    title: 'Email Address',
    key: 'emailAddress',
    dataIndex: 'emailAddress'
  },
  {
    title: 'Phone Number',
    key: 'phoneNumber',
    dataIndex: 'phoneNumber'
  },
  {
    title: 'Company Name',
    key: 'companyName',
    dataIndex: 'companyName'
  },
  {
    title: 'Facilities',
    key: 'facilities',
    dataIndex: 'facilities'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => (
      <Tag className="statusTag" color={statusColorMap[status] || 'default'}>
        {status}
      </Tag>
    )
  },
  ...(hasPermission('users', 'view')
    ? [
        {
          title: '',
          key: '_id',
          dataIndex: '_id',
          render: () => (
            <div className="actionIonWrap">
              {hasPermission('users', 'view') && (
                <Link className="actionIcon" to={''}>
                  <EyeOutlined />
                </Link>
              )}
            </div>
          )
        }
      ]
    : [])
];

const data: ReportRow[] = [
  {
    selectAll: '',
    role: 'admin',
    emailAddress: 'xyz@xyz.com',
    phoneNumber: '+1 203 125 9988',
    companyName: 'The Agile Info',
    facilities: 'CryoSystems ArcticCore V10',
    status: 'Active'
  }
];

interface ReportRow {
  selectAll: string;
  role: string;
  emailAddress: string;
  phoneNumber: string;
  companyName: string;
  facilities: string;
  status: string;
}

const statusColorMap: Record<string, string> = {
  Active: '#00A86B',
  Inactive: '#CF5439'
};

const AddEditReport: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <Wrapper>
      <div className="shadowPaperWrap">
        <ShadowPaper>
          <Form className="add-report-form" form={form} onFinish={onSubmit}>
            <Row gutter={[20, 25]}>
              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderTextInput
                  label="Report name"
                  required
                  // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                  formItemProps={{
                    name: 'reportName',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter report name'
                      }
                    ]
                  }}
                  inputProps={{
                    placeholder: 'Enter Report name'
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Date Range"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'dateRange',
                    rules: [{ required: true, message: 'Please select date range' }]
                  }}
                  inputProps={{
                    placeholder: 'Select Date Range',
                    options: [{ label: 'Last 6 Months', value: 'Last 6 Months' }]
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Automated Notification"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'automatedNotification',
                    rules: [{ required: true, message: 'Please select automated notification' }]
                  }}
                  inputProps={{
                    placeholder: 'Select Automated Notification',
                    options: [{ label: 'Web', value: 'Web' }]
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Parameter"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'parameter',
                    rules: [{ required: true, message: 'Please select parameter' }]
                  }}
                  inputProps={{
                    placeholder: 'Select Parameter',
                    options: [{ label: 'Con. Inlet Temp', value: 'Con. Inlet Temp' }]
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Company"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'company',
                    rules: [{ required: true, message: 'Please select company' }]
                  }}
                  inputProps={{
                    placeholder: 'Select Company',
                    options: [{ label: 'ABC Corp.', value: 'ABC Corp.' }]
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Facility"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'facility',
                    rules: [{ required: true, message: 'Please select facility' }]
                  }}
                  inputProps={{
                    placeholder: 'Select Facility',
                    options: [{ label: 'Bldg A', value: 'Bldg A' }]
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <RenderSelect
                  label="Chart type"
                  colClassName="custom-select-col"
                  formItemProps={{
                    name: 'chartType',
                    rules: [{ required: true, message: 'Please select Chart type' }]
                  }}
                  inputProps={{
                    placeholder: 'Select Chart type',
                    options: [{ label: 'Line chart', value: 'Line chart' }]
                  }}
                />
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <RenderTextAreaInput
                  colProps={{ span: 24 }}
                  label="Add Description"
                  // tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                  formItemProps={{
                    name: 'Add Description',
                    label: 'Add Description',
                    rules: [{ required: true, message: 'Please enter description' }]
                  }}
                  inputProps={{
                    placeholder: 'Enter Description',
                    autoSize: { minRows: 3, maxRows: 6 }
                  }}
                />
              </Col>
            </Row>
          </Form>
        </ShadowPaper>

        <ShadowPaper>
          <Row gutter={[20, 20]} className="editorWrap">
            <Col xs={24} sm={24} md={12} lg={12}>
              <CKEditorFormItem
                label="Report Header Text"
                // tooltip="This will appear at the top of the report"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name={'privacyPolicy'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter privacy policy.'
                  }
                ]}
                required={true}
              />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <CKEditorFormItem
                label="Report Footer Text"
                // tooltip="This will appear at the top of the report"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name={'privacyPolicy'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter privacy policy.'
                  }
                ]}
                required={true}
              />
            </Col>
          </Row>
        </ShadowPaper>

        <ShadowPaper>
          <div className="reportContentHeader">
            <div className="dropdownWrap">
              <h2 className="notifyUser themeColor">Notify Users [10]</h2>
              <Dropdown menu={{ items: companyItems }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Select Company
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>

              <Dropdown menu={{ items: facilityItems }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Select Facility
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>

              <Dropdown menu={{ items: roleItems }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Select Role
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <Input
              className="searchReport"
              placeholder="Search for User"
              prefix={<SearchOutlined />}
            />
          </div>
          <CommonTable columns={columns} dataSource={data} pagination={{ current: 6 }} />
        </ShadowPaper>
      </div>

      <div className="viewButtonWrap extraActionButton">
        <Button className="title-cancel-btn" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="primary" className="title-btn" size="small" icon={<PlusOutlined />}>
          Add / Save
        </Button>
      </div>
    </Wrapper>
  );
};

export default AddEditReport;
