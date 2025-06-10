import { ButtonProps, ModalFuncProps, ModalProps } from 'antd';

export interface IModalProps extends ModalProps {}

export interface IDeleteRecordModalProps extends ModalProps {
  btnDisabled?: boolean;
  btnIcon?: React.ReactNode;
  itemName?: string | React.ReactNode;
}

export interface IConfirmModalProps {
  buttonProps: ButtonProps;
  modalProps: ModalFuncProps;
}
