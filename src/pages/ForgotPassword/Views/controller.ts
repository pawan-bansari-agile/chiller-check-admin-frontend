import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Form } from 'antd';

import { authHooks } from '@/services/auth';

import { ROUTES } from '@/shared/constants/routes';
import { showToaster } from '@/shared/utils/functions';

const useForgotPasswordController = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: forgotPasswordAction, isPending } = authHooks.useForgotPassword();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleFieldsChange = useCallback(() => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
    const { email } = form.getFieldsValue(['email']);

    setIsButtonDisabled(hasErrors || !email);
  }, [form]);

  const onSubmit = (values: { email: string }) => {
    const forgotPasswordPayload = {
      email: values?.email
    };
    forgotPasswordAction(forgotPasswordPayload, {
      onSuccess: (res) => {
        const { message } = res || {};
        showToaster('success', message);
        navigate(ROUTES.LOGIN);
      },
      onError: (err) => {
        const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
        showToaster('error', errorMsg);
      }
    });
  };
  return {
    form,
    isButtonDisabled,
    isPending,
    onSubmit,
    handleFieldsChange
  };
};

export default useForgotPasswordController;
