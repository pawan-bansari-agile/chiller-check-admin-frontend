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

  /* for google picker */
  .autoCompleteInput{
        width: 100%;
    padding: 8px 19px;
        font-size: 14px;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.inkBlue};
  border: 1px solid ${({ theme }) => theme.colors.lightSkyBlue} !important;
  border-radius: 10px;
  background-image: none !important;

  &.gm-err-autocomplete{
  border: 1px solid ${({ theme }) => theme.colors.danger} !important;
  }

  &:focus-within{
  border: 1px solid ${({ theme }) => theme.colors.primary} !important;
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
    color: ${({ theme }) => theme.colors.inkBlue};
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    height: auto;
  }
}

/* for dropdown input */
.ant-select-focused.ant-select-outlined:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) .ant-select-selector{
  box-shadow: none !important;
}
.ant-select{
  &.ant-select-status-error{
    .ant-select-selector{
      border-color: ${({ theme }) => theme.colors.danger} !important;
    }
  }
  .ant-select-selector{
    border-color: ${({ theme }) => theme.colors.lightSkyBlue} !important;
    border-radius: 10px !important;

    .ant-select-selection-item{
      font-size: 14px !important;
          font-weight: 400 !important;
          line-height: 150% !important;
          color: ${({ theme }) => theme.colors.inkBlue} !important;
    }

    .ant-select-selection-search{
      input{
          font-size: 14px !important;
          font-weight: 400 !important;
          line-height: 150% !important;
          color: ${({ theme }) => theme.colors.inkBlue} !important;
      }
    }
    .ant-select-selection-placeholder{
      font-size: 14px;
      font-weight: 400;
      line-height: 150%;
      color: ${({ theme }) => theme.colors.placeholderColor};
    }
  }
  .ant-select-arrow{
    svg{
      fill: ${({ theme }) => theme.colors.inkBlue};
    }
  }
}

/* any radio */
.ant-radio-wrapper{
  .ant-radio-inner{
    background-color: transparent !important;
    &::after{
      background: ${({ theme }) => theme.colors.primary};
    }
  }
}

/* disabled */
.ant-input-disabled{
  background: ${({ theme }) => theme.colors.bgColor} !important;
  color: #6B7083 !important;
}

.ant-select-disabled{
  .ant-select-selector{
    background: ${({ theme }) => theme.colors.bgColor} !important;
    input{
      color: #6B7083 !important;
    }
  }
  svg{
    fill: #6B7083 !important;
  }
}

/* addon after input */
  .addonAfterClass {
    .ant-input-group-addon {
      border-radius: 0px 10px 10px 0px !important;
      background: #fafafa !important;
      border-color: ${({ theme }) => theme.colors.lightSkyBlue} !important;
      padding: 0 18px !important;
      span {
        font-size: 14px;
        font-weight: 400;
        line-height: 150%;
        color: ${({ theme }) => theme.colors.inkBlue};
      }
    }
    input {
      border-radius: 10px 0px 0px 10px !important;
    }
  .ant-input-group-wrapper-status-success {
    .ant-input-wrapper.ant-input-group {
      input:focus + .ant-input-group-addon {
        border-color: ${({ theme }) => theme.colors.lightSkyBlue} !important;
      }
    }
  }
    .ant-input-group-wrapper-status-error
      .ant-input-wrapper.ant-input-group
      > .ant-input-group-addon {
      border-color: red !important;
    }
  }

  .ant-radio-wrapper{
    span{
                font-size: 14px;
          font-weight: 400;
          line-height: 150%;
          color: ${({ theme }) => theme.colors.inkBlue};
    }
  }

  .autoCompleteFormItem.ant-form-item-has-error{
    .autoCompleteInput{
      border-color: ${({ theme }) => theme.colors.danger} !important;
    }
  }

  .ant-picker-outlined{
    border: 1px solid #D6D7FE;
    border-radius: 10px;
        &.ant-picker-focused{
          box-shadow: none;
        }

        svg{
          fill: #040C2B;
        }
  }
  .ant-picker .ant-picker-input >input{
        font-size: 14px;
    line-height: 150%;
    color: #040C2B;
  }

  .timeWrap {
        .ant-picker{
      width: 128px !important;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

      .ant-form-item-control-input{
      min-height: auto !important;
}

  /* dropdown with search listing */
  .dropdownWithSearch{
    width: 175px;
     &.operatorSelect{
      width: 260px;
      &+&{
        margin-left: 10px;
      }
      .ant-select-selector{
        .ant-select-selection-item,
        .ant-select-selection-placeholder{
          max-width: 140px;  
        }
      }
    }
    .ant-form-item-control-input{
      min-height: auto !important;

      .ant-select-single{
        height: auto !important;
      }
    }
    .ant-select-selector{
      border-radius: 30px !important;
      padding: 0 20px !important;

      .ant-select-selection-placeholder{
             font-size: 14px;
             font-weight: 500;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
      }
    }
  }

  .logCheckbox{
    .ant-checkbox-wrapper{
      span{
              font-size: 14px;
      font-weight: 400;
      line-height: 28px;
      color: #040C2B;
      }
    }
  }

          .automatedNotification {
      .ant-checkbox-wrapper {
        span {
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.85) !important;
        }
      }
    }
  
  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
  /* for otp screen */
  .commonOtpInputWrapper {
    margin: 0 auto;
    & > div {
        gap: 10px;
        justify-content: center;
    }
    input{
      width: 40px !important;
      height: 40px !important;
      font-size: 14px;
    }
  }}
`;
