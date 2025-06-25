import styled from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  min-height: 100vh;

  .auth-wrap {
    display: inline-block;
    width: 450px;

    .form-header-wrap {
      text-align: center;
      margin-bottom: 50px;

      .logo-wrap {
        margin-bottom: 40px;
        svg {
          width: 100%;
          max-width: 60px;
        }
      }

      .form-title {
        font-size: 28px;
        color: ${({ theme }) => theme.colors.gray};
        font-weight: 700;
        line-height: 120%;
        margin-bottom: 10px;
      }

      .form-desc {
        font-size: 16px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.inkBlue};
        line-height: 150%;
        letter-spacing: normal;
      }
    }

    .forgot-password-link {
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      color: ${({ theme }) => theme.colors.primary};
    }

    .login-note {
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      color: ${({ theme }) => theme.colors.inkBlue};
    }

    .resend-text {
      cursor: pointer;
      -webkit-transition: all 0.3s ease-in-out;
      -ms-transition: all 0.3s ease-in-out;
      -moz-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      color: ${({ theme }) => theme.colors.gray};

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
      }
    }

    .back-to-login {
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      color: ${({ theme }) => theme.colors.inkBlue};
    }

    .rest-description {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.45)};
      margin-top: 6px;
      padding: 0 7.5px;
    }

    .reset-password-error-description {
      color: red;
    }

    .extra-gap-25 {
      margin-top: 25px !important;
    }

    .extra-gap-30 {
      margin-bottom: 30px !important;
    }

    .extra-gap-5 {
      margin-bottom: 5px !important;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xl}) {
    padding: 40px;

    .auth-side-img {
      padding: 40px;

      .auth-bg-content {
        padding: 40px;
      }

      .auth-bg-desc {
        margin-top: 28px;
      }
    }

    .auth-wrap {
      .logo-wrap,
      .form-header-wrap {
        margin-bottom: 30px;
      }
    }

    @media only screen and (max-width: ${({ theme }) => theme.device.md}) {
      flex-wrap: wrap;
      padding: 20px;

      > * {
        width: 100%;
      }

      .auth-side-img {
        position: static;
        padding: 20px;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
    .auth-wrap {
      width: 100%;
    }
  }
`;
