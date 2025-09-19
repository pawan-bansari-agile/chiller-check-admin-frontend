import styled from 'styled-components';

import { removeScroll, textEllipsis } from '@/styles/common/Mixin';

export const Wrapper = styled.div`
  &.header-toolbar-wrap {
    padding: 36px 18px 25px 20px;
    margin: 0 -20px 0;

    .sub-row {
      .title-wrap {
        .headerBackBtn {
          svg {
            color: ${({ theme }) => theme.colors.inkBlue};
            width: 18px;
            height: 18px;
          }
        }
        &.title-with-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .page-title {
          font-size: 30px;
          font-weight: 700;
          line-height: 28px;
          margin: 0;
          text-transform: capitalize;
          color: ${({ theme }) => theme.colors.inkBlue};
        }
      }

      .cta-wrap {
        ${removeScroll}
        position:absolute;
        right: 10px;
        a {
          display: inline-block;
        }
        .title-btn {
          padding: 5px 25px;
          span {
            font-size: 16px;
            font-weight: 600;
            line-height: 22px;
          }
        }
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.sm}) {
    &.header-toolbar-wrap {
      .sub-row {
        align-items: flex-start;
        row-gap: 10px;

        .title-wrap {
          width: 100%;
          .page-title {
            ${textEllipsis}
            font-size: 20px;
          }
        }
        .cta-wrap {
          text-align: end;
          overflow: auto hidden;
        }
      }
    }
  }
`;
