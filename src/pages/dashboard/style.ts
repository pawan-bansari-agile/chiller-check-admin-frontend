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
      font-size: 16px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.black};
      line-height: 150%;

      span.effLegends {
        display: flex;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        background-color: rgb(255, 255, 100);

        &.effLossLegends {
          background-color: rgb(153, 0, 0);
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
      justify-content: center;
      align-items: center;
      background: rgb(0, 0, 128) !important;
      padding-bottom: 25px;
      padding-top: 25px;

      border-bottom: 2px solid #f0f0f0;

      h2 {
        font-size: 24px;
        line-height: 24px;
        font-weight: 600;
        color: rgb(255, 255, 255) !important;
        margin: 0;
        padding: 0;
        border: none;
      }

      /* a {
        color: #000abc;
        font-weight: 600;
      } */
    }

    .chiller-title {
      margin: 25px 0;
      font-size: 24px;
      line-height: 24px;
      font-weight: 600;
      text-align: center;
      color: rgb(0, 0, 128);
    }

    .issueHeader {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 25px;
      border-bottom: 2px solid #f0f0f0;

      h2 {
        font-size: 24px;
        line-height: 24px;
        font-weight: 600;
        color: rgb(0, 0, 128);
        margin: 0;
        padding: 0;
        border: none;
      }

      /* a {
        color: #000abc;
        font-weight: 600;
      } */
    }
    .alertHeader {
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgb(153, 0, 0) !important;
      padding-bottom: 25px;
      padding-top: 25px;

      border-bottom: 2px solid #f0f0f0;

      h2 {
        font-size: 24px;
        line-height: 24px;
        font-weight: 600;
        color: rgb(255, 255, 255) !important;
        margin: 0;
        padding: 0;
        border: none;
      }

      /* a {
        color: #000abc;
        font-weight: 600;
      } */
    }
    .companyHeader {
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgb(0, 0, 128) !important;
      padding-bottom: 25px;
      padding-top: 25px;

      border-bottom: 2px solid #f0f0f0;

      h2 {
        font-size: 24px;
        line-height: 24px;
        font-weight: 600;
        color: rgb(255, 255, 255) !important;
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
      justify-content: center;
      align-items: center;
      padding-bottom: 25px;
      border-bottom: 2px solid #f0f0f0;

      h2 {
        font-size: 24px;
        line-height: 24px;
        font-weight: 600;
        color: rgb(0, 0, 128);
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
        font-size: 20px;
        font-weight: 600;
        line-height: 100%;
        color: rgb(0, 0, 0);
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

      .underline-link {
        text-decoration: underline;
        text-decoration-color: rgb(0, 0, 255);
        text-decoration-thickness: 2px;
        cursor: pointer;
      }

      div {
        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-word;
        padding: 18px 15px;
        font-size: 16px;
        font-weight: 500;
        line-height: 100%;
        color: ${({ theme }) => theme.colors.black};
        width: 16.5%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 2px solid #f0f0f0;
        .chillerNavigate {
          color: rgb(0, 0, 255);
        }
        &:first-of-type {
          border-left: none;
        }
        &.timeValueWrap {
          display: flex;
          flex-direction: column;
          gap: 5px;

          span {
            color: rgb(0, 0, 255);
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

    &.alertChartDashboard {
      .labelWrap {
        span {
          color: rgb(153, 0, 0) !important;
        }
      }
      .valueWrap {
        border-radius: 0;
        border-bottom: 0;
        border-top: 0;
        border-bottom: 2px solid rgb(153, 0, 0) !important;
        border-left: 2px solid rgb(153, 0, 0) !important;
        border-right: 2px solid rgb(153, 0, 0) !important;

        &:nth-of-type(even) {
          background-color: rgb(245, 230, 230);
        }

        &:first-of-type {
          border-top: 2px solid rgb(153, 0, 0) !important;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        &:nth-of-type(2) {
          border-top: 2px solid rgb(153, 0, 0) !important;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        &:nth-of-type(6) {
          border-bottom: 2px solid rgb(153, 0, 0) !important;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        &:last-of-type {
          border-bottom: 2px solid rgb(153, 0, 0) !important;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        div {
          border-left: 2px solid rgb(153, 0, 0);
          &:first-of-type {
            border-left: none;
          }
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
    .valueWrap:nth-of-type(even) {
      background-color: rgb(230, 230, 240); /* light grey */
      border-bottom: 2px solid rgb(0, 0, 128) !important;
    }
    .valueWrap {
      border-radius: 0;
      border-bottom: 0;
      border-top: 0;
      border-bottom: 2px solid rgb(0, 0, 128) !important;
      border-left: 2px solid rgb(0, 0, 128) !important;
      border-right: 2px solid rgb(0, 0, 128) !important;

      &:first-of-type {
        border-top: 2px solid rgb(0, 0, 128) !important;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }

      &:nth-of-type(2) {
        border-top: 2px solid rgb(0, 0, 128) !important;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }

      &:nth-of-type(6) {
        border-bottom: 2px solid rgb(0, 0, 128) !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      &:last-of-type {
        border-bottom: 2px solid rgb(0, 0, 128) !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      div {
        width: 20% !important;
        border-left: 2px solid rgb(0, 0, 128);
      }
    }
  }

  .mainBuildingDashboard {
    .valueWrap:nth-of-type(even) {
      background-color: rgb(230, 230, 240); /* light grey */
      border-bottom: 2px solid rgb(0, 0, 128) !important;
    }
    .valueWrap {
      border-radius: 0;
      border-bottom: 0;
      border-top: 0;
      border-bottom: 2px solid rgb(0, 0, 128) !important;
      border-left: 2px solid rgb(0, 0, 128) !important;
      border-right: 2px solid rgb(0, 0, 128) !important;

      &:nth-of-type(2) {
        border-top: 2px solid rgb(0, 0, 128) !important;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }

      &:nth-of-type(4) {
        border-bottom: 2px solid rgb(0, 0, 128) !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      &:last-of-type {
        border-bottom: 2px solid rgb(0, 0, 128) !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      div {
        border-left: 2px solid rgb(0, 0, 128);
      }

      .dashboardIcon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border-radius: 5px;
        background: rgb(0, 0, 255);
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
    .valueWrap:nth-of-type(even) {
      border-bottom: 2px solid rgb(0, 0, 128) !important;
      background-color: rgb(230, 230, 240); /* light grey */
    }
    .valueWrap {
      border-radius: 0;
      border-bottom: 0;
      border-top: 0;
      border-bottom: 2px solid rgb(0, 0, 128) !important;
      border-left: 2px solid rgb(0, 0, 128) !important;
      border-right: 2px solid rgb(0, 0, 128) !important;

      &:nth-of-type(2) {
        border-top: 2px solid rgb(0, 0, 128) !important;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }

      &:nth-of-type(6) {
        border-bottom: 2px solid rgb(0, 0, 128) !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      &:last-of-type {
        border-bottom: 2px solid rgb(0, 0, 128) !important;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      }
      div {
        border-left: 2px solid rgb(0, 0, 128);
      }
    }
  }

  .checkboxLocation {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: rgb(0, 0, 0);
  }

  .legendWrap {
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    line-height: 22px;

    &.effLossLegend {
      background-color: rgb(153, 0, 0);
    }
    &.nonCondenseLegend {
      background-color: rgb(255, 255, 100);
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
