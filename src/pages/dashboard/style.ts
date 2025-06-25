import styled from 'styled-components';

export const Wrapper = styled.div`
  .dashboardHeader {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
  }
  .selectDuration {
    display: flex;
    border: 1px solid #d6d7fe;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 30px;
    padding: 5px;
    margin-bottom: 0;
    li {
      padding: 0 20px;
      border-right: 1px solid #f0f0f0;

      &:last-of-type {
        border-right: 0;
      }

      &:hover {
        span {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
    span {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: #626c99;
      cursor: pointer;

      &.active {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 500;
      }
    }
  }

  .dashboardCard {
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    padding: 25px;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    h2 {
      font-size: 16px;
      line-height: 100%;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin: 0;
    }

    .avgContentWrap {
      margin-top: 25px;
      .avgList {
        display: flex;
        align-items: center;

        canvas {
          width: 120px !important;
        }

        &.avgTarget {
          border-bottom: 2px solid #f0f0f0;
          margin-bottom: 30px;
          padding-bottom: 30px;
        }

        .avgContent {
          margin-left: 27px;
        }
      }
    }

    .avgPercentage {
      margin-top: 4px;

      span {
        font-size: 10px;
        font-weight: 500;
        line-height: 100%;
        color: ${({ theme }) => theme.colors.danger};
        margin-left: 4px;
      }
    }

    .lossWrap {
      .commonLoss {
        display: flex;
        align-items: center;

        canvas {
          width: 100px !important;
        }

        &.kwhLoss {
          padding-bottom: 25px;
          margin: 25px 0;
          border-bottom: 2px solid #f0f0f0;

          img {
            width: 100px;
          }
        }

        &.btuLoss {
          margin: 25px 0 0;
          img {
            width: 100px;
          }
        }
      }

      .lossCountWrap {
        margin-left: 25px;
      }
    }

    .avgTitle {
      font-size: 24px;
      font-weight: 600;
      line-height: 100%;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 4px;
    }

    .avgDesc {
      font-size: 12px;
      font-weight: 400;
      line-height: 100%;
      color: ${({ theme }) => theme.colors.lightPurple};
      margin-bottom: 4px;
    }

    .lossCount {
      font-size: 20px;
      font-weight: 600;
      line-height: 100%;
      color: #142150;
      margin-bottom: 4px;
    }

    .gaugeChart {
      margin-top: 25px;

      img {
        width: 100%;
        height: 120px;
        object-fit: contain;
      }
    }

    .gaugeDate {
      text-align: center;
      margin-top: 25px;
      h4 {
        font-size: 18.75px;
        font-weight: 600;
        line-height: 100%;
        color: ${({ theme }) => theme.colors.inkBlue};
        margin-bottom: 0px;
      }
    }

    .circularEff {
      width: 123px;
      margin: 25px auto;
    }

    .pr-text {
      font-size: 24px;
      font-weight: 600;
      line-height: 100%;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 0px;
    }

    .estimatedChart {
      margin-top: 25px;
    }

    &.logCard {
      padding: 25px 0;
      .logCount {
        display: flex;
        align-items: center;
        margin-bottom: 0;

        li {
          border-right: 1px solid #f0f0f0;
          padding: 44px 25px;
          width: 33%;
          text-align: center;
          &:last-of-type {
            border-right: 0;
          }

          .logCountWrap {
            margin-bottom: 30px;
          }

          .logCountTitle {
            font-size: 16px;
            font-weight: 600;
            line-height: 100%;
            color: ${({ theme }) => theme.colors.inkBlue};
            margin-left: 10px;
          }

          h2 {
            font-size: 40px;
            font-weight: 600;
            line-height: 100%;
            color: ${({ theme }) => theme.colors.inkBlue};
            margin-bottom: 0px;
          }
        }
      }
    }
  }
  .facilityDashboard {
    margin: 25px 0;
    .shadow-box {
      padding: 40px 30px;
    }

    .dashboardCard {
      border: 1px solid #c3c3c3;
    }

    .facilityDropdown {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 30px;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.lg}) {
    .dashboardCard {
      &.logCard .logCount li {
        padding: 40px 20px;
        .logCountTitle {
          font-size: 14px;
        }
        h2 {
          font-size: 38px;
        }
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.md}) {
    .dashboardCard {
      &.logCard .logCount li {
        padding: 15px;
        .logCountWrap {
          margin-bottom: 15px;
          svg {
            width: 12px;
          }
        }
        .logCountTitle {
          font-size: 12px;
          margin-left: 5px;
        }
        h2 {
          font-size: 28px;
        }
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
    .selectDuration {
      flex-wrap: wrap;
      text-align: center;
      border-radius: 20px;
      li {
        width: 100%;
        border-right: none;
      }
    }

    .dashboardCard {
      .avgContentWrap .avgList {
        flex-wrap: wrap;

        canvas {
          width: 100% !important;
        }

        .avgContent {
          width: 100%;
          margin-left: 0;
          margin-top: 15px;
          text-align: center;
        }
      }

      .circularContent {
        text-align: center;
      }

      .lossWrap {
        .commonLoss {
          flex-wrap: wrap;
          justify-content: center;
          text-align: center;
        }
        .lossCountWrap {
          width: 100%;
          margin-left: 0;
          margin-top: 10px;
        }
      }

      &.logCard {
        .logCount {
          flex-wrap: wrap;
          li {
            width: 100%;
            border-right: none;
          }
        }
      }
    }

    .facilityDashboard {
      .shadow-box {
        padding: 15px;
      }

      .facilityDropdown {
        margin-bottom: 15px;
      }
    }
  }
`;
