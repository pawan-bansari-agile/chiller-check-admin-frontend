import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import { Form } from 'antd';

import { authHooks } from '@/services/auth';

import { authStore } from '@/store/auth';

import { APP_ENV, DEVICE_TYPE, ENVIRONMENT, LocalStorageKeys } from '@/shared/constants';
import { fetchToken } from '@/shared/constants/firebase';
import { ROUTES } from '@/shared/constants/routes';
import { initializeDeviceId, showToaster } from '@/shared/utils/functions';

const useSignInController = () => {
  const navigate = useNavigate();
  const { mutate: loginAction, isPending } = authHooks.useSignIn();
  const queryClient = useQueryClient();
  const { actions } = authStore((state) => state);

  const [form] = Form.useForm();

  const [deviceId, setDeviceId] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    initializeDeviceId(deviceId, setDeviceId);
  }, [deviceId]);

  const [tokenInfo, setTokenInfo] = useState({
    value: '',
    loading: false
  });

  // Fetch FCM token if not already stored
  useEffect(() => {
    if (APP_ENV !== ENVIRONMENT['LOCAL']) {
      const existingToken = localStorage.getItem(LocalStorageKeys.FCM_TOKEN);
      if (!existingToken) {
        void fetchToken({
          setFcmToken: (token) => setTokenInfo((prev) => ({ ...prev, value: token })),
          setIsLoadingToken: (loading) => setTokenInfo((prev) => ({ ...prev, loading }))
        });
      } else {
        setTokenInfo((prev) => ({ ...prev, value: existingToken }));
      }
    }
  }, []);

  const onSubmit = (values: { email: string; password: string }) => {
    const signInPayload = {
      ...values,
      deviceId: deviceId,
      fcmToken: tokenInfo?.value || '',
      deviceType: DEVICE_TYPE.WEB
    };

    loginAction(signInPayload, {
      onSuccess: (res) => {
        const { data, message } = res || {};

        if (data?.blockLogin) {
          setIsModalOpen(true);
          return;
        }

        if (data?.otpSent) {
          showToaster('success', data?.message);
          navigate(`${ROUTES.VERIFY_OTP}?userId=${data?.userId}`);
          return;
        }
        actions.authSuccess({ data });
        showToaster('success', message);
        queryClient.removeQueries();
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
    onSubmit,
    isModalOpen,
    setIsModalOpen,
    tokenInfo
  };
};

export default useSignInController;
