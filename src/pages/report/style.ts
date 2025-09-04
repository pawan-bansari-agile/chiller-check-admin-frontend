import styled from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

export const Wrapper = styled.div`
  /* listing */
  .reportContentHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 22px 22px;

    .dropdownWrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .searchReport {
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

  .updateUser {
    display: flex;
    align-items: center;
    gap: 10px;
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
    h4 {
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
      color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
      margin-bottom: 0;
      text-align: start;
    }
  }

  /* add-edit */

  .extraActionButton {
    justify-content: flex-end;
    margin: 25px 0 0 !important;
    padding-bottom: 25px;
  }

  .reportAddEditMainForm {
    padding: 0 32px;
  }

  .graph-dropdown {
    justify-content: flex-end;
    display: flex;
    width: 100%;
    padding-right: 32px;
  }

  .custome-range {
    .ant-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .ant-col {
        text-align: start;
      }
    }
    .ant-picker {
      width: 100%;
    }
  }

  .shadowPaperWrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .viewButtonWrap {
    display: flex;
    gap: 10px;
  }

  .add-report-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 22px;
  }

  .notifyUser {
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
    margin-bottom: 0;
  }

  .editorWrap {
    padding: 6px 32px;
  }

  /* view */
  .headerFooterViewContent {
    text-align: center;
    line-height: 22px;
    color: ${({ theme }) => theme.colors.inkBlue};
    margin-bottom: 0;
    padding: 2px 20px;
  }

  .reportDetailsList {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0;
    gap: 40px 0;
    padding: 6px 32px;

    li {
      width: 33%;

      &.descriptionDetails {
        width: 67%;
      }

      svg {
        fill: ${({ theme }) => theme.colors.inkBlue};

        &.user {
          fill: none;
          path {
            stroke: ${({ theme }) => theme.colors.inkBlue};
          }
        }
      }
    }
  }

  .chartWrapper {
    overflow-x: auto;
    width: 100%;
  }

  .reportLineChart {
    min-width: 800px; /* chart will scroll if screen smaller */
    height: 400px;
    padding: 20px 42px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.md}) {
    .reportContentHeader {
      flex-direction: column;
      align-items: flex-end;
      gap: 20px;
    }

    .reportDetailsList {
      li {
        width: 50%;

        &.descriptionDetails {
          width: 50%;
        }
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.sm}) {
    .dropdownWrap {
      flex-wrap: wrap;
    }

    .reportDetailsList {
      li {
        width: 100%;

        &.descriptionDetails {
          width: 100%;
        }
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
    .viewButtonWrap {
      flex-wrap: wrap;
    }
  }
`;
