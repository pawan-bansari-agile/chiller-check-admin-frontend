import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Col, Form, Row } from 'antd';

import AuthLayout from '@/shared/components/common/AuthLayout';
import { RenderTextInput } from '@/shared/components/common/FormField';
import Meta from '@/shared/components/common/Meta';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import { ROUTES } from '@/shared/constants/routes';

import useForgotPasswordController from './controller';

const ForgotPassword: React.FC = () => {
  const {
    form,
    isButtonDisabled,
    isPending,
    onSubmit,
    handleFieldsChange,
    isModalOpen,
    setIsModalOpen,
    navigate,
    emailHTML,
    copyHtmlToClipboard,
    openHtmlInNewWindow
  } = useForgotPasswordController();

  return (
    <React.Fragment>
      <Meta title="Forgot Password" />
      <AuthLayout
        formProps={{
          title: 'Forgot Password?',
          desc: 'Please enter your registered email to get a reset password link.'
        }}
      >
        <Form
          className="auth-form"
          form={form}
          onFinish={onSubmit}
          onFieldsChange={handleFieldsChange}
        >
          <Row gutter={[15, 25]}>
            <Col xs={24}>
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
                  placeholder: 'Enter your email'
                }}
              />
            </Col>
            <Col xs={24} className="extra-gap-25">
              <Button
                type="primary"
                htmlType="submit"
                block={true}
                size="large"
                disabled={isButtonDisabled || isPending}
                loading={isPending}
              >
                Send Link
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
      {isModalOpen && (
        <CommonModal
          open={isModalOpen}
          closeIcon={true}
          closable={true}
          centered={true}
          maskClosable={false}
          className="changePasswordModal"
          title={
            <div className="modalTitleWrapper">
              <span className="main-title">Email Template Copied</span>
            </div>
          }
          onCancel={() => {
            setIsModalOpen(false);
            navigate(ROUTES.LOGIN);
          }}
        >
          <div className="modalFooter">
            <Button
              type="primary"
              className="footerBtn"
              onClick={() => {
                copyHtmlToClipboard(emailHTML);
                openHtmlInNewWindow(emailHTML);
                setIsModalOpen(false);
                navigate(ROUTES.LOGIN);
              }}
            >
              OK
            </Button>
          </div>
        </CommonModal>
      )}
    </React.Fragment>
  );
};

export default ForgotPassword;
