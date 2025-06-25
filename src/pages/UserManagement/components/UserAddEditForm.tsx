import React from 'react';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Form, Row, Tabs, TabsProps, Tooltip } from 'antd';

import { RenderSelect, RenderTextInput } from '@/shared/components/common/FormField';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CameraIcon, User } from '@/shared/svg';

import { Wrapper } from '../style';
import PermissionTab from './PermissionTab';
import ResponsibilitiesTab from './ResponsibilitiesTab';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Permission',
    children: <PermissionTab />
  },
  {
    key: '2',
    label: 'Responsibilities',
    children: <ResponsibilitiesTab />
  }
];

const UserAddEditForm: React.FC = () => {
  return (
    <Wrapper className="viewCompanyShadow">
      <ShadowPaper>
        <div className="viewUserDetails">
          <h2>User Details</h2>
        </div>
        <div className="userInfo">
          {/* <figure className="userImg">
            <img src="/icons/icon.png" alt="user" />
          </figure> */}
          <div className="addProfilePic">
            <div className="pictureLabel">
              <label>Profile Pic</label>
              <Tooltip
                color="#000ABC"
                title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
              >
                <InfoCircleOutlined style={{ color: '#000ABC' }} />
              </Tooltip>
            </div>
            <div className="inputPicture">
              <i>
                <User />
              </i>
              <span className="cameraIcon">
                <CameraIcon />
              </span>
            </div>
          </div>
          <div className="profileForm">
            <Form className="userInfoForm">
              <Row gutter={[20, 25]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderTextInput
                    label="First Name"
                    tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    required
                    formItemProps={{
                      name: 'first name',
                      rules: [
                        {
                          required: true,
                          message: 'Please enter first name'
                        }
                      ]
                    }}
                    inputProps={{
                      placeholder: 'Enter First Name'
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderTextInput
                    label="Last Name"
                    tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    required
                    formItemProps={{
                      name: 'last name',
                      rules: [
                        {
                          required: true,
                          message: 'Please enter last name'
                        }
                      ]
                    }}
                    inputProps={{
                      placeholder: 'Enter Last Name'
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderTextInput
                    label="Email"
                    tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    required
                    formItemProps={{
                      name: 'email',
                      rules: [
                        {
                          required: true,
                          message: 'Please enter your email'
                        }
                      ]
                    }}
                    inputProps={{
                      placeholder: 'Enter Email'
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderTextInput
                    label="Phone number"
                    tooltip="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                    required
                    colClassName="userMobileInput"
                    formItemProps={{
                      name: 'phone number',
                      rules: [
                        {
                          required: true,
                          message: 'Please enter phone number'
                        }
                      ]
                    }}
                    inputProps={{
                      placeholder: 'Enter Phone Number',
                      addonBefore: '+1'
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderSelect
                    label="User Roles"
                    colClassName="custom-select-col"
                    formItemProps={{
                      name: 'user roles',
                      rules: [{ required: true, message: 'Please select user role' }]
                    }}
                    inputProps={{
                      placeholder: 'Select User Role',
                      options: [
                        { label: 'Admin', value: 'Admin' },
                        { label: 'Company manager', value: 'Company Manager' },
                        { label: 'Region manager', value: 'Region Manager' },
                        { label: 'Facility manager', value: 'Facility Manager' },
                        { label: 'Chiller manager', value: 'Chiller Manager' }
                      ]
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <RenderSelect
                    label="Company Name"
                    colClassName="custom-select-col"
                    formItemProps={{
                      name: 'company name',
                      rules: [{ required: true, message: 'Please select company name' }]
                    }}
                    inputProps={{
                      placeholder: 'Select Company Name',
                      options: [{ label: 'The agile arena tech', value: 'The agile arena tech' }]
                    }}
                  />
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </ShadowPaper>
      <ShadowPaper>
        <Tabs defaultActiveKey="1" items={items} className="userTab" />
      </ShadowPaper>
    </Wrapper>
  );
};

export default UserAddEditForm;
