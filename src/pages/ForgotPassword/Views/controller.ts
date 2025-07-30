import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Form } from 'antd';

import { authHooks } from '@/services/auth';

import { APP_ENV, ENVIRONMENT } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { showToaster } from '@/shared/utils/functions';

const useForgotPasswordController = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: forgotPasswordAction, isPending } = authHooks.useForgotPassword();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailHTML, setEmailHTML] = useState('');

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
        form.resetFields();
        const { message, data } = res || {};
        const html = data?.emailTemplate?.html;

        if (APP_ENV === ENVIRONMENT.PROD && html) {
          setEmailHTML(html);
          setIsModalOpen(true);
          showToaster('success', message);
        } else {
          showToaster('success', message);
          navigate(ROUTES.LOGIN);
        }
      },
      onError: (err) => {
        const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
        showToaster('error', errorMsg);
      }
    });
  };

  const openHtmlInNewWindow = (htmlString: string) => {
    const blob = new Blob([htmlString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const copyHtmlToClipboard = async (htmlString: string) => {
    try {
      const blobHtml = new Blob([htmlString], { type: 'text/html' });
      const blobPlain = new Blob([htmlString], { type: 'text/plain' });

      const clipboardItem = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobPlain
      });

      await navigator.clipboard.write([clipboardItem]);
    } catch (err) {
      console.error('Failed to copy HTML:', err);
    }
  };

  return {
    form,
    isButtonDisabled,
    isPending,
    onSubmit,
    handleFieldsChange,
    isModalOpen,
    setIsModalOpen,
    emailHTML,
    navigate,
    openHtmlInNewWindow,
    copyHtmlToClipboard
  };
};

export default useForgotPasswordController;
