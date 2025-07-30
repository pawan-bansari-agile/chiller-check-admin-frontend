import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Form } from 'antd';

import { authHooks } from '@/services/auth';

import { ROUTES } from '@/shared/constants/routes';
import { isPasswordValid, showToaster } from '@/shared/utils/functions';

const useResetController = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { token } = useParams();
  const { mutate: resetPasswordAction, isPending } = authHooks.useResetPassword();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onSubmit = (values: { newPassword: string }) => {
    const resetPasswordPayload = {
      password: values?.newPassword,
      resetPasswordToken: token || ''
    };
    resetPasswordAction(resetPasswordPayload, {
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

  const handleFieldsChange = () => {
    const fields = form.getFieldsValue(['newPassword', 'confirmPassword']);
    setPasswordValue(fields.newPassword || '');
    setConfirmPasswordValue(fields.confirmPassword || '');

    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
    const allFieldsFilled = fields.newPassword && fields.confirmPassword;

    setIsButtonDisabled(
      hasErrors ||
        !allFieldsFilled ||
        fields.newPassword !== fields.confirmPassword ||
        !isPasswordValid(fields.newPassword)
    );
  };

  const handleCheckChange = (e: any) => {
    setIsChecked(e.target.checked);
  };
  return {
    form,
    onSubmit,
    handleFieldsChange,
    isPending,
    isButtonDisabled,
    passwordValue,
    confirmPasswordValue,
    isPasswordValid,
    handleCheckChange,
    isChecked
  };
};

export default useResetController;
