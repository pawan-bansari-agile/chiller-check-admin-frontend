import styled from 'styled-components';

export const Wrapper = styled.div`
  .dashboardHeader {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
  }

  .dashboardEffList {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 0;

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.inkBlue};
      line-height: 150%;

      span.effLegends {
        display: flex;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        background-color: #fadb14;

        &.effLossLegends {
          background-color: #cf1322;
        }
      }
    }
  }

  .analyticsGraph {
    margin: 35px 0;
    padding: 0 22px;
  }
  .charityCard {
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    padding: 25px;
    overflow: auto;

    .facilityHeader {
      display: flex;
      justify-content: center !important;
      align-items: center;
    }

    .chiller-title {
      margin: 25px 0;
    }

    .issueHeader {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 25px;
      border-bottom: 2px solid #f0f0f0;

      h2 {
        font-size: 16px;
        line-height: 24px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.inkBlue};
        margin: 0;
        padding: 0;
        border: none;
      }

      /* a {
        color: #000abc;
        font-weight: 600;
      } */
    }

    .facilityIssueHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 25px;
      border-bottom: 2px solid #f0f0f0;

      h2 {
        font-size: 16px;
        line-height: 24px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.inkBlue};
        margin: 0;
        padding: 0;
        border: none;
      }

      /* a {
        color: #000abc;
        font-weight: 600;
      } */
    }

    h2 {
      font-size: 16px;
      line-height: 100%;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin: 0;
      padding-bottom: 25px;
      border-bottom: 2px solid #f0f0f0;
    }

    .consumptionChart {
      margin: 35px 0;
    }
  }

  .shadowPaperWrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .locationPerformanceCheckbox {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .scrollDiv {
    overflow-x: auto;
    width: 100%;
  }

  .consumptionChart {
    min-width: 1200px;
    .labelWrap {
      display: flex;
      align-items: center;

      span {
        width: 16.5%;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        line-height: 100%;
        color: ${({ theme }) => theme.colors.inkBlue};
        margin-bottom: 25px;

        .anticon {
          margin: 0;
        }
      }
    }
    .valueWrap {
      display: flex;
      border: 2px solid #f0f0f0;
      border-radius: 12px;

      div {
        padding: 18px 15px;
        font-size: 14px;
        font-weight: 500;
        line-height: 100%;
        color: ${({ theme }) => theme.colors.inkBlue};
        width: 16.5%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 2px solid #f0f0f0;
        .chillerNavigate {
          color: #000abc;
        }
        &:first-of-type {
          border-left: none;
        }
        &.timeValueWrap {
          display: flex;
          flex-direction: column;
          gap: 5px;

          span {
            color: #000abc;
            cursor: pointer;
          }
        }
        &.legends span {
          display: inline-block;
          padding: 12px;
          color: #fff;
          border-radius: 5px;
          background: #ee534f;
        }
        .loss {
          color: #f04924;
        }
      }
    }
  }

  .performaceSummaryChartDashboard {
    .labelWrap {
      span {
        line-height: 24px;
      }
    }
    .valueWrap {
      border-radius: 0;
      border-bottom: 0;
      border-top: 0;

      &:nth-of-type(2) {
        border-top: 2px solid #f0f0f0 !important;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }

      &:nth-of-type(6) {
        border-bottom: 2px solid #f0f0f0 !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      &:last-of-type {
        border-bottom: 2px solid #f0f0f0 !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      div {
        width: 20% !important;
      }
    }
  }

  .mainBuildingDashboard {
    .valueWrap {
      border-radius: 0;
      border-bottom: 0;
      border-top: 0;

      &:nth-of-type(2) {
        border-top: 2px solid #f0f0f0 !important;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }

      &:nth-of-type(4) {
        border-bottom: 2px solid #f0f0f0 !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      &:last-of-type {
        border-bottom: 2px solid #f0f0f0 !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      .dashboardIcon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border-radius: 5px;
        background: #000abc;
        svg {
          color: #fff;
        }
      }
    }
  }

  .facilityPerformanceChartDashboard {
    .labelWrap {
      span {
        line-height: 24px;
      }
    }
    .valueWrap {
      border-radius: 0;
      border-bottom: 0;
      border-top: 0;

      &:nth-of-type(2) {
        border-top: 2px solid #f0f0f0 !important;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }

      &:nth-of-type(6) {
        border-bottom: 2px solid #f0f0f0 !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      &:last-of-type {
        border-bottom: 2px solid #f0f0f0 !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }
    }
  }

  .checkboxLocation {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.inkBlue};
  }

  .legendWrap {
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    line-height: 22px;

    &.effLossLegend {
      background: #cf1322;
    }
    &.nonCondenseLegend {
      background: #fadb14;
    }
  }

  .no-data {
    text-align: center;
    padding: 10px 0px;
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
          font-size: 14px;
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
