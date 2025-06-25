import styled from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

export const Wrapper = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 12px;
    .notificationLists {
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

  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
    .notificationListHeader {
      flex-direction: column;
      align-items: flex-start !important;
      justify-content: flex-start;
    }
  }
`;
