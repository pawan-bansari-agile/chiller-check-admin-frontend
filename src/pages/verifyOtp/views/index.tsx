import React from 'react';

import { Button, Col, Form, Row } from 'antd';

import AuthLayout from '@/shared/components/common/AuthLayout';
import { RenderOtpInput } from '@/shared/components/common/FormField';
import Meta from '@/shared/components/common/Meta';

import useVerifyOtpController from './controller';

const VerifyOtp: React.FC = () => {
  const { form, otp, setOtp, onSubmit, isPending, resendOtp } = useVerifyOtpController();

  return (
    <React.Fragment>
      <Meta title="Verify Otp" />
      <AuthLayout
        formProps={{
          title: 'OTP Verification',
          desc: `Please enter the OTP sent to your registered mobile number.
                  If you are facing issues with receiving OTP please contact 
                  your admin to update your phone number.`
        }}
      >
        <Form className="auth-form" form={form} onFinish={onSubmit}>
          <Row gutter={[15, 35]}>
            <RenderOtpInput
              colClassName="commonOtpInputWrapper"
              colProps={{ xs: 24 }}
              numInputs={6}
              value={otp}
              onChange={setOtp}
            />

            <Col xs={24}>
              <Button
                type="primary"
                htmlType="submit"
                block={true}
                size="large"
                disabled={otp?.length !== 6 || isPending}
                loading={isPending}
              >
                Verify
              </Button>
            </Col>
            <Col xs={24}>
              <p className="login-note">
                Didn’t get OTP?{' '}
                <span onClick={resendOtp} className="resend-text">
                  Resend
                </span>
              </p>
            </Col>
          </Row>
        </Form>
      </AuthLayout>
    </React.Fragment>
  );
};

export default VerifyOtp;
