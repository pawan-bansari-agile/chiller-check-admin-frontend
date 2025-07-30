import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Col, Form, Row } from 'antd';

import AuthLayout from '@/shared/components/common/AuthLayout';
import { RenderCheckboxInput, RenderPasswordInput } from '@/shared/components/common/FormField';
import Meta from '@/shared/components/common/Meta';
import { PRIVACY_LINK, TERMS_LINK } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';

import useSetController from './controller';

const SetPassword: React.FC = () => {
  const {
    form,
    onSubmit,
    handleFieldsChange,
    isPending,
    isButtonDisabled,
    passwordValue,
    confirmPasswordValue,
    isPasswordValid,
    isChecked,
    handleCheckChange
  } = useSetController();

  return (
    <>
      <Meta title="Set Password" />
      <AuthLayout
        containerClassName="setPasswordWrap"
        formProps={{
          title: 'Set Password',
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
            <Col xs={24}>
              <RenderCheckboxInput
                inputProps={{
                  onChange: handleCheckChange,
                  checked: isChecked
                }}
                colClassName="checkCMS"
              >
                <span className="agreeText">
                  I agree to the
                  <Link target="_blank" to={TERMS_LINK}>
                    Terms of Service
                  </Link>
                  and
                  <Link target="_blank" to={PRIVACY_LINK}>
                    Privacy Policy.
                  </Link>
                </span>
              </RenderCheckboxInput>
            </Col>
            <Col xs={24} className="extra-gap-5">
              <Button
                type="primary"
                htmlType="submit"
                block={true}
                size="large"
                disabled={isButtonDisabled || isPending || !isChecked}
                loading={isPending}
              >
                Set Password
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

export default SetPassword;
