import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Col, Form, Row } from 'antd';

import AuthLayout from '@/shared/components/common/AuthLayout';
import { RenderPasswordInput, RenderTextInput } from '@/shared/components/common/FormField';
import Meta from '@/shared/components/common/Meta';
import { ROUTES } from '@/shared/constants/routes';

import useSignInController from './controller';

const Login: React.FC = () => {
  const { form, isPending, isButtonDisabled, handleFieldsChange, onSubmit } = useSignInController();

  return (
    <React.Fragment>
      <Meta title="Login" />
      <AuthLayout
        formProps={{
          title: 'Login to Chiller Check®',
          desc: 'Please enter your log in details to connect.'
        }}
      >
        <Form
          className="auth-form"
          form={form}
          onFinish={onSubmit}
          onFieldsChange={handleFieldsChange}
        >
          <Row gutter={[15, 20]}>
            <RenderTextInput
              colProps={{ xs: 24 }}
              label="Enter Email"
              required
              formItemProps={{
                name: 'email',
                rules: [
                  {
                    required: true,
                    message: 'Please enter your email.'
                  },
                  {
                    type: 'email',
                    message: 'Please enter valid email.'
                  }
                ]
              }}
              inputProps={{
                size: 'large',
                placeholder: 'Enter your registered email',
                autoFocus: true
              }}
            />
            <RenderPasswordInput
              colProps={{ xs: 24 }}
              label="Enter Password"
              required
              inputProps={{ placeholder: 'Enter your password', maxLength: 64 }}
              formItemProps={{
                name: 'password',
                label: 'Enter Password',
                required: true,
                rules: [
                  {
                    required: true,
                    message: 'Please enter your password.'
                  }
                ]
              }}
            />
            <Col xs={24} className="extra-gap-30">
              <Link className="forgot-password-link" to={ROUTES.FORGOT_PASSWORD}>
                Forgot Password?
              </Link>
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
                Login
              </Button>
            </Col>
            <Col xs={24}>
              <p className="login-note">
                If the login attempt is failed 3 times your account will be Inactivated. You'll have
                to contact support@chillercheck.com or your company manager to activate your
                account.
              </p>
            </Col>
          </Row>
        </Form>
      </AuthLayout>
    </React.Fragment>
  );
};

export default Login;
