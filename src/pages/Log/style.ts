import styled from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

export const Wrapper = styled.div`
  /* list */
  .logButtonWrap {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .chillerContentHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 22px 22px;

    .dropdownWrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .peakLoad {
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
      color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
      margin-right: 7px;
    }

    .searchChiller {
      max-width: 330px;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: ${({ theme }) => theme.colors.black};
      border: 1px solid ${({ theme }) => theme.colors.shadowBlue};
      &:focus-within {
        box-shadow: none;
        border-color: ${({ theme }) => theme.colors.primary};
      }
      &::placeholder {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }
    }
  }

  .updateUser {
    display: flex;
    align-items: center;
    gap: 10px;
    figure {
      width: 29px;
      height: 29px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    h4 {
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
      color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
      margin-bottom: 0;
    }
    span {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
    }
  }

  .chillerNameWrap {
    .chillerName {
      color: ${({ theme }) => theme.colors.primary};
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
    }
    span {
      display: block;
    }
  }

  /* add-edit */

  .addMainForm {
    padding: 22px 22px;
  }

  .generalSwitch {
    .ant-switch-handle {
      width: 18px !important;
    }
  }

  .fullWidthCol div {
    width: 100% !important;
  }

  .generalRow {
    padding: 15px 32px;
  }

  .otherLogFormWrap {
    h4 {
      font-size: 16px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 25px;
    }
    .shadow-box {
      padding: 25px 25px 0;
    }

    .otherLogForm {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .mainlabel {
        font-size: 14px;
        font-weight: 600;
        line-height: 28px;
        color: ${({ theme }) => theme.colors.inkBlue};
      }
    }
  }

  .doubleInputRow {
    align-items: flex-end;
  }

  .timeWrap {
    display: flex;
    height: 40px;

    .timezone {
      background: #fafafa;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border: 1px solid #d6d7fe;
      border-left: 0;
      font-size: 14px;
      font-weight: 500;
      line-height: 22px;
      color: #040c2b;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .picker-addon-wrapper {
    display: flex;
    align-items: center;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    padding: 4px 12px;
    background: #fff;

    .addon-icon {
      margin: 0 8px;
      color: #1a1a1a;
    }

    .timezone {
      font-weight: 500;
      color: #1a1a1a;
    }
  }

  /* view */

  .viewLogMainDetails {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0;
    padding: 22px 32px;

    li {
      width: 25%;

      &:first-of-type {
        margin-bottom: 40px;
      }

      .titleWrap {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 2px;

        &.lossesWrap {
          h3 {
            font-size: 14px;
            font-weight: 600;
            line-height: 22px;
            color: ${({ theme }) => theme.colors.inkBlue};
            margin-bottom: 0;

            span {
              font-weight: 400;
            }
          }
        }
        &.userTitleWrap {
          gap: 10px;
        }
        h2 {
          font-size: 14px;
          font-weight: 600;
          line-height: 22px;
          color: ${({ theme }) => theme.colors.inkBlue};
          margin-bottom: 0;
        }
      }
      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: ${({ theme }) => theme.colors.lightPurple};
        margin-bottom: 0;
      }
      figure {
        width: 29px;
        height: 29px;
        border-radius: 50%;
        margin-bottom: 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }
      svg {
        path {
          fill: ${({ theme }) => theme.colors.inkBlue};
        }
      }
    }
  }

  .commonBadge {
    p {
      display: inline-block;
      line-height: 17px;
      font-size: 12px;
      color: #fff;
      padding: 1px 12px;
      border-radius: 11px;
      background: #00a86b;
    }
  }

  .delete-btn {
    span {
      color: ${({ theme }) => theme.colors.danger};
    }
  }

  .mainLabelValue {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #38426f;
  }

  .generalDetailList {
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    padding: 15px 32px 40px;
    li {
      width: 30%;

      span {
        display: none;
      }

      &.readingDetails {
        width: 48%;
      }
    }
  }

  .generalLogContent {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #040c2b;
    padding: 15px 32px 40px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xl}) {
    .viewLogMainDetails {
      gap: 25px 0;
      li {
        width: 33%;

        &:first-of-type {
          margin-bottom: 0;
        }
      }
    }

    .generalDetailList {
      li {
        width: 48%;

        &.readingDetails {
          width: 48%;
        }
      }
    }

    .chillerContentHeader {
      flex-wrap: wrap;
      gap: 15px;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.md}) {
    .viewLogMainDetails {
      li {
        width: 50%;
      }
    }

    .generalDetailList {
      li {
        width: 100%;

        &.readingDetails {
          width: 100%;
        }
      }
    }

    .chillerContentHeader .dropdownWrap {
      flex-wrap: wrap;
    }

    .logButtonWrap {
      margin-top: 10px;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.sm}) {
    .viewLogMainDetails {
      gap: 20px 0;
      li {
        width: 100%;
      }
    }

    .logButtonWrap {
      flex-wrap: wrap;
    }
  }
`;
