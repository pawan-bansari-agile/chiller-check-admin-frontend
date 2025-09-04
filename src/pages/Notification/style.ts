import styled from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

export const Wrapper = styled.div`
  .timelineContentHeader {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    padding: 6px 22px 22px;

    .searchTimeline {
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

    .timelineRangePicker {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #d6e5fe;

      &.ant-picker-focused {
        box-shadow: none;
      }
    }
  }

  .notification-table {
    flex-direction: row;
    justify-content: flex-end;
    padding-bottom: 16px;

    .ant-pagination-next.ant-pagination-disabled {
      background: #000abc;
      opacity: 0.5;
    }
    .ant-pagination-prev.ant-pagination-disabled {
      background: #000abc;
      opacity: 0.5;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 12px;
    .notificationLists {
      cursor: pointer;
      background: ${({ theme }) => theme.colors.white};
      border-radius: 16px;
      padding: 20px 32px;

      .notificationListHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      h2 {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
        margin-bottom: 0;
      }
      h3 {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: #a4a4a4;
        margin-bottom: 0;
      }
      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: ${({ theme }) => theme.colors.lightPurple};
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.sm}) {
    .timelineContentHeader {
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
    .notificationListHeader {
      flex-direction: column;
      align-items: flex-start !important;
      justify-content: flex-start;
    }
  }
`;
