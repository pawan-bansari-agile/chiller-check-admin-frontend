import { useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { Form } from 'antd';

import { authHooks } from '@/services/auth';

import { authStore } from '@/store/auth';

import { DEVICE_TYPE } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { initializeDeviceId, showToaster } from '@/shared/utils/functions';

const useVerifyOtpController = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const { actions } = authStore((state) => state);

  const { mutate: verifyOtpAction, isPending } = authHooks.useVerifyOtp();
  const { mutate: resendOtpAction } = authHooks.useResendOtp();

  const userId = searchParams.get('userId') || '';

  const [otp, setOtp] = useState<string>('');
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    initializeDeviceId(deviceId, setDeviceId);
  }, [deviceId]);

  const onSubmit = () => {
    const verifyOtpPayload = {
      otp: otp,
      userId: userId,
      deviceId: deviceId,
      fcmToken: '',
      deviceType: DEVICE_TYPE.WEB
    };

    verifyOtpAction(verifyOtpPayload, {
      onSuccess: (res) => {
        const { data, message } = res || {};
        actions.authSuccess({ data });
        showToaster('success', message);
        navigate(ROUTES.DASHBOARD);
      },
      onError: (err) => {
        const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
        showToaster('error', errorMsg);
      }
    });
  };

  const resendOtp = () => {
    const resendOtpPayload = {
      userId: userId
    };

    resendOtpAction(resendOtpPayload, {
      onSuccess: (res) => {
        const { message } = res || {};
        showToaster('success', message);
      },
      onError: (err) => {
        const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
        showToaster('error', errorMsg);
      }
    });
  };

  return {
    form,
    otp,
    setOtp,
    onSubmit,
    isPending,
    resendOtp
  };
};

export default useVerifyOtpController;
