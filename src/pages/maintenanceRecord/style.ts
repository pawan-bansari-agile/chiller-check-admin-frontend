import styled from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

export const Wrapper = styled.div`
  /* list */
  .maintenanceButtonWrap {
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
      gap: 10px;
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

  .time {
    margin-left: 5px;
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

  .makeName {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: ${({ theme }) => theme.colors.inkBlue};
    margin-bottom: 0;
  }

  .delete-btn {
    span {
      color: ${({ theme }) => theme.colors.danger};
    }
  }

  /* add-edit */

  .extraActionButton {
    justify-content: flex-end;
    margin: 25px 0 0 !important;
    padding-bottom: 25px;
  }

  .maintenanceFields {
    padding: 22px 32px;
  }

  .maintenanceCol {
    margin-top: 20px;
    .ant-col {
      div {
        width: 100%;
      }
    }
  }

  .noteForm {
    padding: 15px 32px 40px;
  }

  .maintenanceuploader {
    padding: 15px 32px 40px;

    .ant-upload {
      width: 86px !important;
      height: 86px !important;
    }
  }

  /* view */
  .mainFirstRow {
    margin-bottom: 20px;
  }

  .maintenanceDetails {
    display: flex;
    margin: 22px 32px;

    li {
      width: 20%;

      svg {
        fill: #040c2b;
      }
    }
  }

  .generalList {
    padding: 15px 32px 40px;
    li {
      margin-bottom: 20px;

      &:last-of-type {
        margin-bottom: 0;
      }

      .titleWrap {
        span {
          display: none;
        }
      }
    }
  }

  .generalCol {
    p.notes {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: ${({ theme }) => theme.colors.inkBlue};
      padding: 15px 32px 40px;
    }
    div {
      width: 100%;
    }
    .files {
      width: 100%;
      padding: 15px 22px 40px;
      img {
        width: 100%;
        height: 400px;
        object-fit: contain;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xl}) {
    .maintenanceDetails {
      flex-wrap: wrap;
      gap: 15px;
      li {
        width: 33%;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.md}) {
    .chillerContentHeader {
      flex-direction: column;
      align-items: flex-end;
      gap: 20px;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.sm}) {
    .dropdownWrap {
      flex-wrap: wrap;
    }

    .maintenanceDetails {
      li {
        width: 100%;
      }
    }
  }
`;
