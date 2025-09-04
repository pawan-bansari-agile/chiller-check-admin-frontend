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
      margin: 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    div {
      text-align: left;
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

  .editButtonWrap {
    display: flex;
    gap: 10px;
  }

  .logAddEditMainForm {
    padding: 0 22px;
  }

  .doubleInputRow {
    align-items: flex-end;
  }

  .maintenanceDate {
    .ant-picker {
      width: 100%;
    }
  }

  .timeWrap {
    display: flex;

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
      height: 39px;
      width: 70px !important;
    }
  }
  .custom-file-input {
    padding: 1px;
    border-radius: 8px; /* rounded corners */
    font-size: 14px;
    background-color: #fff;
    color: #555;
    cursor: pointer;
  }

  .custom-file-input::-webkit-file-upload-button {
    display: none; /* hide default button */
  }

  .custom-file-input::before {
    content: 'Choose file';
    display: inline-block;
    background: #fff;
    border: 1px solid #d6d7fe;
    border-radius: 6px;
    padding: 5px 10px;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    margin-right: 10px;
  }

  .maintenanceFileDetailsWrap {
    height: 100%;

    .CardWithTitleWrap {
      height: 100%;
    }
  }

  .extraActionButton {
    justify-content: flex-end;
    margin: 25px 0 0 !important;
    padding-bottom: 25px;
  }

  .maintenanceFields {
    padding: 22px 32px;
  }

  .maintenanceCol {
    &.maintenanceColAddEdit {
      margin-top: 20px;
    }
    .ant-col {
      div {
        width: 100%;
      }
    }
  }

  .maintenanceNote {
    padding: 15px 32px 40px;
  }

  .maintenanceFile {
    padding: 15px 32px 40px;
  }

  .maintenanceDetailsWrap {
    display: flex;
    gap: 20px;
  }

  .maintenanceDetailsPDFView {
    width: 80% !important;
    h4 {
      font-size: 16px;
      font-weight: 600;
      line-height: 100%;
      color: ${({ theme }) => hexToRGBA(theme.colors.black, 1)};
      margin-bottom: 3px;
      word-wrap: break-word;
    }
    h5 {
      font-size: 14px;
      font-weight: 400;
      line-height: 100%;
      color: #868aa5;
      margin-bottom: 30px;
    }

    button {
      font-size: 14px;
      font-weight: 500;
      line-height: 100%;
      background-color: transparent;

      &.deleteBtn {
        color: #f5222d;
        margin-left: 20px;
        padding-left: 20px;
        border-left: 1px solid #ececed;
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
  .maintenanceTime {
    color: #040c2b;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    display: inline-block;
    padding-bottom: 4px;
    span {
      display: inline-block;
      color: #f2654d;
      margin-right: 4px;
    }
  }
  .maintenanceNoteWrap {
    height: 100%;
  }
  .maintenanceCol {
    height: 100%;
  }
  .maintenanceRow {
    height: 49%;

    &:first-child {
      margin-bottom: 18px;
    }
  }
  .maintenanceCardRow {
    height: 100%;

    .CardWithTitleWrap {
      height: 100%;
    }
  }
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

  .viewImgaeMaintenance {
    width: 30px;
    height: 30px;
    margin-bottom: 0;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }

  .viewPDFWrap {
    padding: 15px 22px 40px;
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

    .maintenanceRow {
      height: auto;
    }

    .maintenanceDetails {
      li {
        width: 100%;
      }
    }
  }
`;
