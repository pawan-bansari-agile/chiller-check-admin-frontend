import styled from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

export const Wrapper = styled.div`
  /* listing */
  .contentHeader {
    display: flex;
    justify-content: flex-end;
    padding: 6px 22px 22px;
    .searchProblem {
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

  .time-bold {
    font-weight: 600;
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
    }
  }

  /* configure field */

  .extraActionButton {
    justify-content: flex-end;
    margin: 25px 0 !important;
  }

  .shadowWrap {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .configuredHeader {
    padding: 39px 18px 5px 20px;
  }

  .viewButtonWrap {
    display: flex;
    gap: 10px;
  }
  ul.configureLists {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0;
    padding: 22px 32px;
    li {
      width: 25%;
      padding: 0 32px;

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

  .cardWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .cardBody {
      padding: 15px 32px 40px 32px;
    }
  }

  .psCard {
    width: 100%;
  }

  .ConfigureFiledForm {
    .ant-form-item-label {
      margin-bottom: 5px;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.md}) {
    ul.configureLists {
      flex-wrap: wrap;
      gap: 25px 0;
      li {
        width: 50%;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.sm}) {
    .cardWrap {
      flex-wrap: wrap;
      div {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
    ul.configureLists {
      flex-wrap: wrap;
      gap: 20px 0;
      li {
        width: 100%;
      }
    }
  }
`;
