import styled from 'styled-components';

import { removeScroll, textEllipsis } from '@/styles/common/Mixin';

export const Wrapper = styled.div`
  &.header-toolbar-wrap {
    padding: 38px 18px 20px 37px;
    margin: 0 -20px 0;

    .sub-row {
      .title-wrap {
        &.title-with-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .page-title {
          font-size: 26px;
          font-weight: 600;
          line-height: 28px;
          margin: 0;
          text-transform: capitalize;
          color: ${({ theme }) => theme.colors.inkBlue};
        }
      }

      .cta-wrap {
        ${removeScroll}
        a {
          display: inline-block;
        }
        .title-btn {
          padding: 5px 25px;
          span {
            font-weight: 500;
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
        flex-direction: column;
        row-gap: 10px;

        .title-wrap,
        .cta-wrap {
          width: 100%;
        }
        .title-wrap {
          .page-title {
            ${textEllipsis}
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
