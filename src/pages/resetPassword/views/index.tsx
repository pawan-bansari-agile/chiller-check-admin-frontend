import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Col, Form, Row } from 'antd';

import AuthLayout from '@/shared/components/common/AuthLayout';
import { RenderPasswordInput } from '@/shared/components/common/FormField';
import Meta from '@/shared/components/common/Meta';
import { ROUTES } from '@/shared/constants/routes';

import useResetController from './controller';

const ResetPassword: React.FC = () => {
  const {
    form,
    onSubmit,
    handleFieldsChange,
    isPending,
    isButtonDisabled,
    passwordValue,
    confirmPasswordValue,
    isPasswordValid
  } = useResetController();

  return (
    <>
      <Meta title="Reset Password" />
      <AuthLayout
        formProps={{
          title: 'Reset Password',
          desc: 'Please set your new password and then login again to access your account.'
        }}
      >
        <Form
          className="auth-form"
          form={form}
          onFinish={onSubmit}
          onFieldsChange={handleFieldsChange}
        >
          <Row gutter={[15, 20]}>
            <Col xs={24}>
              <RenderPasswordInput
                label="Enter Password"
                required
                inputProps={{ placeholder: 'Enter your password', maxLength: 64 }}
                formItemProps={{
                  name: 'newPassword',
                  label: 'Enter New Password'
                }}
              />
              <p
                className={`rest-description ${passwordValue && !isPasswordValid(passwordValue) && 'reset-password-error-description'}`}
              >
                Minimum 8 up to 64 characters including an upper case, a numeric and a special
                character.
              </p>
            </Col>
            <Col xs={24} className="extra-gap-30">
              <RenderPasswordInput
                colProps={{ xs: 24 }}
                label="Re-Enter New Password"
                required
                inputProps={{ placeholder: 'Enter your password', maxLength: 64 }}
                formItemProps={{
                  name: 'confirmPassword',
                  label: 'Re-Enter New Password'
                }}
              />
              <p
                className={`rest-description ${confirmPasswordValue && passwordValue !== confirmPasswordValue && 'reset-password-error-description'}`}
              >
                Should be exactly same as the password you just entered above.
              </p>
            </Col>
            <Col xs={24} className="extra-gap-5">
              <Button
                type="primary"
                htmlType="submit"
                block={true}
                size="large"
                disabled={isButtonDisabled || isPending}
                loading={isPending}
              >
                Reset Password
              </Button>
            </Col>
            <Col xs={24}>
              <Link className="back-to-login" to={ROUTES.LOGIN}>
                Back to Login
              </Link>
            </Col>
          </Row>
        </Form>
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
