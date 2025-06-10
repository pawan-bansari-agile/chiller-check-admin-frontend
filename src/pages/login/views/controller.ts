import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Form } from 'antd';

import { authHooks } from '@/services/auth';

import { authStore } from '@/store/auth';

import { DEVICE_TYPE } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { initializeDeviceId, showToaster } from '@/shared/utils/functions';

const useSignInController = () => {
  const navigate = useNavigate();
  const { mutate: loginAction, isPending } = authHooks.useSignIn();
  const { actions } = authStore((state) => state);

  const [form] = Form.useForm();

  const [deviceId, setDeviceId] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    initializeDeviceId(deviceId, setDeviceId);
  }, [deviceId]);

  const onSubmit = (values: { email: string; password: string }) => {
    const signInPayload = {
      ...values,
      deviceId: deviceId,
      fcmToken: '',
      deviceType: DEVICE_TYPE.WEB
    };

    loginAction(signInPayload, {
      onSuccess: (res) => {
        const { data, message } = res || {};

        if (data?.otpSent) {
          showToaster('success', data.message);
          navigate(`${ROUTES.VERIFY_OTP}?userId=${data.userId}`);
          return;
        }
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

  const handleFieldsChange = useCallback(() => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
    const { email, password } = form.getFieldsValue(['email', 'password']);

    setIsButtonDisabled(hasErrors || !email || !password);
  }, [form]);

  return {
    form,
    isPending,
    isButtonDisabled,
    handleFieldsChange,
    onSubmit
  };
};

export default useSignInController;
