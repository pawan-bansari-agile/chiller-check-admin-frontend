import { createGlobalStyle } from 'styled-components';

export const AntdFormInput = createGlobalStyle`
/* for otp screen */
.commonOtpInputWrapper {
    & > div {
        gap: 15px;
        justify-content: center;
    }
    input{
      width: 58px !important;
      height: 60px;
      border: 1px solid ${({ theme }) => theme.colors.lightSkyBlue};
      border-radius: 6px;
      font-size: 18px;
      font-weight: 600;
      line-height: 22px;
      color: ${({ theme }) => theme.colors.inkBlue};
      &:focus-within{
        border-color: ${({ theme }) => theme.colors.primary};
      }
    }
}

/* for input asterisk */
.ant-form-item .ant-form-item-label >label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before{
  margin-top: -2px;
}

.ant-form-item{
  /* for input */
  .ant-form-item-control{
    .ant-input.ant-input-outlined{
      font-size: 14px;
      line-height: 150%;
      color: ${({ theme }) => theme.colors.inkBlue};
      border-color: ${({ theme }) => theme.colors.lightSkyBlue};
      border-radius: 10px;
      &.ant-input-status-error{
        border-color: ${({ theme }) => theme.colors.danger} !important;
      }
      &:focus-within{
        box-shadow: none;
        border-color: ${({ theme }) => theme.colors.primary};
      }
      &.ant-input-outlined.ant-input-status-error:not(.ant-input-disabled):focus-within{
        box-shadow: none;
      }
      &.ant-input-lg{
        padding: 10px 20px;
      }
    }
  }

  /* for password input */
  .ant-input-affix-wrapper{
    font-size: 14px;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.inkBlue};
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    border-color: ${({ theme }) => theme.colors.lightSkyBlue};
      &:focus-within{
        box-shadow: none;
        border-color: ${({ theme }) => theme.colors.primary};
      }
  }

  /* for label */
  .ant-form-item-label >label{
    color: ${({ theme }) => theme.colors.black};
    opacity: 0.85;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    font-family: 'Roboto';
  }
}
`;
