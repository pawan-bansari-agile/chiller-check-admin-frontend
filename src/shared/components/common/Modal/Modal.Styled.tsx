import { Modal } from 'antd';
import { styled } from 'styled-components';

export const CommonModalStyle = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    padding: 40px 30px 30px;
    .ant-modal-close {
      &:hover {
        background-color: transparent;
      }
    }
  }
  .ant-modal-header,
  .modal-header {
    margin-bottom: 16px;
    .ant-modal-title,
    .modal-title {
      text-align: center;
      font-family: var(--font-ibm-sans);
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 30px;
      color: var(--dark-color);
    }
  }
  .ant-modal-body,
  .modal-body {
    .modal-text {
      color: var(--dark-color);
      font-family: var(--font-ibm-sans);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      &.bold {
        font-weight: 600;
      }
    }
    .modal-subtitle {
      color: var(--dark-color);
      font-family: var(--font-ibm-sans);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      &.bold {
        font-weight: 600;
      }
    }
    .picture-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .ant-modal-footer,
  .modal-footer {
    width: 100%;
    margin-top: 30px;
  }
`;

export const ModalWrapper = styled(Modal)`
  &.ant-modal {
    &.common-modal {
      ${CommonModalStyle}
    }
  }
`;
