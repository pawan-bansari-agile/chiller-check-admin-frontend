import { CloseCircleOutlined } from '@ant-design/icons';
import { ModalFuncProps } from 'antd';

export interface ConfirmModalConfig extends ModalFuncProps {}

const COMMON_MODAL_CONFIG: Partial<ConfirmModalConfig> = {
  width: 500,
  centered: true,
  maskClosable: true,
  closable: true
};

export const MODAL_CONFIGS = {
  CONFIRM_MODAL: {
    ...COMMON_MODAL_CONFIG,
    width: 450,
    okText: 'Yes',
    cancelText: 'No',
    closeIcon: <CloseCircleOutlined />
  }
};
