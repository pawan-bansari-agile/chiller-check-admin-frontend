import React from 'react';

import { Button, Modal } from 'antd';

import { MODAL_CONFIGS } from '@/shared/constants/modal';

import { IConfirmModalProps } from '../types';

const ConfirmModal: React.FC<IConfirmModalProps> = (props) => {
  const [modal, contextHolder] = Modal.useModal();
  const { buttonProps, modalProps } = props;

  const handleClick = async () => {
    await modal.confirm({
      ...MODAL_CONFIGS.CONFIRM_MODAL,
      ...modalProps,
      onOk: async () => {
        try {
          await modalProps?.onOk?.();
          return true; // success, close modal
        } catch (error) {
          return Promise.reject(); // error, keep modal open
        }
      }
    });
  };
  return (
    <>
      {contextHolder}
      <Button onClick={handleClick} {...buttonProps}>
        {buttonProps.children}
      </Button>
    </>
  );
};

export default ConfirmModal;
