import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Form } from 'antd';

import { authHooks } from '@/services/auth';

import { showToaster } from '@/shared/utils/functions';

const useChangePasswordController = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { mutate: changePasswordAction, isPending } = authHooks.useChangePassword();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const onSubmit = (values: { newPassword: string; currentPassword: string }) => {
    const changePasswordPayload = {
      currentPassword: values?.currentPassword,
      newPassword: values?.newPassword
    };
    changePasswordAction(changePasswordPayload, {
      onSuccess: () => {
        setIsModalOpen(true);
        form.resetFields();
        setIsButtonDisabled(true);
      },
      onError: (err) => {
        const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
        showToaster('error', errorMsg);
      }
    });
  };

  const handleFieldsChange = useCallback(() => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
    const { currentPassword, newPassword, confirmPassword } = form.getFieldsValue([
      'currentPassword',
      'newPassword',
      'confirmPassword'
    ]);

    setIsButtonDisabled(hasErrors || !currentPassword || !newPassword || !confirmPassword);
  }, [form]);

  return {
    navigate,
    form,
    isButtonDisabled,
    isModalOpen,
    isPending,
    onSubmit,
    handleFieldsChange,
    setIsModalOpen
  };
};

export default useChangePasswordController;
