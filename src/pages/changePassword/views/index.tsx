import React from 'react';

import { CheckOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';

import { RenderPasswordInput } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { PATTERNS } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';

import { Wrapper } from '../style';
import useChangePasswordController from './controller';

const ChangePassword: React.FC = () => {
  const {
    navigate,
    form,
    isButtonDisabled,
    isModalOpen,
    isPending,
    onSubmit,
    handleFieldsChange,
    setIsModalOpen
  } = useChangePasswordController();

  return (
    <Wrapper>
      <Meta title="Change Password" />
      <HeaderToolbar title="Change Password" />
      <ShadowPaper>
        <Form
          form={form}
          onFinish={onSubmit}
          onFieldsChange={handleFieldsChange}
          className="changePasswordForm"
        >
          <Row>
            <Col span={8}>
              <RenderPasswordInput
                colProps={{ xs: 24 }}
                label="Current Password"
                required
                inputProps={{ placeholder: 'Enter Current Password', maxLength: 64 }}
                formItemProps={{
                  name: 'currentPassword',
                  label: 'Current Password',
                  required: true,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter your current password.'
                    }
                  ]
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <RenderPasswordInput
                colProps={{ xs: 24 }}
                label="New Password"
                required
                inputProps={{ placeholder: 'Enter New Password', maxLength: 64 }}
                formItemProps={{
                  name: 'newPassword',
                  label: 'New Password',
                  required: true,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter your new password.'
                    },
                    {
                      pattern: PATTERNS.STRONG_PASSWORD,
                      message:
                        'New Password must be 8–64 characters long and include at least one uppercase letter, one number, and one special character & not contain white spaces.'
                    }
                  ]
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <RenderPasswordInput
                colProps={{ xs: 24 }}
                label="Confirm Password"
                required
                inputProps={{ placeholder: 'Enter Confirm Password', maxLength: 64 }}
                formItemProps={{
                  name: 'confirmPassword',
                  label: 'Confirm Password',
                  required: true,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter your confirm password.'
                    },
                    {
                      validator: (_, value) => {
                        const { newPassword } = form.getFieldsValue(); // Get password value
                        if (value && value !== newPassword) {
                          return Promise.reject(
                            new Error(`Confirm Password must match the New Password.`)
                          );
                        }
                        return Promise.resolve();
                      }
                    }
                  ]
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8} className="extra-gap-5">
              <Button
                type="primary"
                htmlType="submit"
                disabled={isButtonDisabled || isPending}
                loading={isPending}
                block={true}
                size="large"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </ShadowPaper>
      {isModalOpen && (
        <CommonModal
          open={isModalOpen}
          closeIcon={true}
          closable={true}
          centered={true}
          className="changePasswordModal"
          title={
            <div className="modalTitleWrapper">
              <i>
                <CheckOutlined style={{ color: '#00A86B' }} />
              </i>
              <span className="main-title">Password Changed Successfully</span>
            </div>
          }
          onCancel={() => setIsModalOpen(false)}
        >
          <p>
            Your Password has been Changes Successfully in system. you can manage your password from
            profile.
          </p>
          <div className="modalFooter">
            <Button className="footerBtn" onClick={() => navigate(ROUTES.DASHBOARD)}>
              Ok
            </Button>
          </div>
        </CommonModal>
      )}
    </Wrapper>
  );
};

export default ChangePassword;
