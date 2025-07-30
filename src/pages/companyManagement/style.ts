import styled from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

export const Wrapper = styled.div`
  /* listing */
  .companyContentHeader {
    display: flex;
    justify-content: flex-end;
    padding: 6px 22px 22px;
    .searchCompany {
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

  .statusTag {
    border-radius: 11px;
    font-size: 12px;
    line-height: 17px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.white};
    padding: 1px 12px;
    margin: 0;
  }

  .companyWebsiteLink {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  /* add company */
  .altitudeUnit {
    width: 100px;
  }
  .companyAddEditMainForm {
    padding: 0 22px;
  }
  .company-details-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 22px 20px 22px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.body};

    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 0;
    }
  }

  .shadowPaperWrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .add-company-form {
    display: flex;
    flex-direction: column;
  }
  .shadowWrap {
    display: flex;
    gap: 20px;
  }

  .removeBtn {
    background: none;
    font-size: 12px;
    line-height: 17px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.danger};
    &.disabled {
      color: ${({ theme }) => theme.colors.disabledColor};
      cursor: not-allowed;
    }
  }

  .addFacilityBtn {
    width: calc(100% - 44px);
    color: ${({ theme }) => theme.colors.primary};
    background: transparent;
    border: 1px dashed ${({ theme }) => theme.colors.primary};
    padding: 10px 0px;
    border-radius: 5px;
    cursor: 'pointer';
    margin: 10px 22px;
  }

  /* edit company */
  .editButtonWrap {
    display: flex;
    gap: 10px;
  }

  .extraActionButton {
    justify-content: flex-end;
    margin: 25px 0 !important;
  }

  .companyFacilityTable {
    .ant-input,
    .pac-target-input,
    .ant-select .ant-select-selector {
      border-radius: 5px !important;
    }
    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      text-align: left !important;
    }
    .ant-table-tbody {
      tr td {
        vertical-align: top;

        &:first-of-type {
          vertical-align: middle;
        }
      }
    }
  }

  /* view company */
  .requiredStar {
    color: #ff4d4f;
    font-size: 16px;
    margin: 0 4px 0 0;
    padding-top: 4px;
  }
  .shadowWrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .viewButtonWrap {
    display: flex;
    gap: 10px;
  }
  .viewHeader {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.body};
    margin-bottom: 20px;
    padding: 0 32px 20px;

    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 0;
      margin-right: 20px;
    }

    .statusBedge {
      font-size: 12px;
      font-weight: 400;
      line-height: 17px;
      color: ${({ theme }) => theme.colors.white};
      padding: 1px 13px;
      border-radius: 20px;
      &.active {
        background: ${({ theme }) => theme.colors.green};
      }
      &.inactive {
        background: ${({ theme }) => theme.colors.danger};
      }
      &.prospect {
        background: #00077b;
      }
      &.demo {
        background: #d5a513;
      }
    }
  }

  ul.company-info-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    color: #2c2c2c;
    padding: 0px 32px 22px;
    margin: 0;
    li {
      width: 23%;
      display: flex;
      flex-direction: column;
      gap: 2px;
      &.address {
        width: 100%;
        max-width: 600px;
      }

      .info-item-wrap {
        display: flex;
        align-items: center;
        .icon {
          color: ${({ theme }) => theme.colors.inkBlue};
          font-size: 12px;
          margin-right: 10px;
        }
        .label {
          font-size: 14px;
          font-weight: 600;
          color: ${({ theme }) => theme.colors.inkBlue};
          line-height: 22px;
        }
      }
      .value {
        font-size: 14px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.lightPurple};
        line-height: 20px;

        a {
          font-size: 14px;
          font-weight: 400;
          color: ${({ theme }) => theme.colors.lightPurple};
          line-height: 20px;
          word-wrap: break-word;
        }
      }
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

  /* responsive */
  @media only screen and (max-width: ${({ theme }) => theme.device.md}) {
    ul.company-info-container {
      li {
        width: 48%;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
    ul.company-info-container {
      li {
        width: 100%;
      }
    }

    .company-details-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    .viewHeader {
      flex-wrap: wrap;
      gap: 10px;
      h2 {
        width: 100%;
      }
    }

    .companyAddEditMainForm {
      padding: 0 22px;
    }
  }
`;
