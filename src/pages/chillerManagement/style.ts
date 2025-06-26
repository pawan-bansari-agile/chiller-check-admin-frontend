import styled from 'styled-components';

export const Wrapper = styled.div`
  /* list */
  .chillerButtonWrap {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .chillerContentHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 22px 22px;

    .dropdownWrap {
      display: flex;
      gap: 10px;
    }

    .searchChiller {
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

  .chillerNameWrap {
    .chillerName {
      color: ${({ theme }) => theme.colors.primary};
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
    }
    span {
      display: block;
    }
  }

  /* add-edit */
  .shadowWrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .chillerAddEditHeader {
    padding: 22px 22px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.body};
    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 0;
    }
  }
  .chillerAddEfitForm {
    padding: 20px 22px 22px;

    .ant-input-group-addon {
      border-radius: 0px 10px 10px 0px !important;
      background: #fafafa !important;
      border-color: ${({ theme }) => theme.colors.lightSkyBlue} !important;
      padding: 0 18px !important;
      span {
        font-size: 14px;
        font-weight: 400;
        line-height: 150%;
        color: ${({ theme }) => theme.colors.inkBlue};
      }
    }
    /* input {
      border-radius: 10px 0px 0px 10px !important;
    } */
    .ant-input-group-wrapper-status-error
      .ant-input-wrapper.ant-input-group
      > .ant-input-group-addon {
      border-color: red !important;
    }
  }

  .doubleInputRow {
    align-items: flex-end;
  }

  /* view */
  .viewButtonWrap {
    display: flex;
    gap: 10px;
  }

  .timelineTable {
    tbody {
      tr td:last-of-type {
        text-align: left;
      }
    }
  }

  .detailsTabWrap {
    padding: 22px 22px 0;
  }
  .viewChillerDetailsWrap {
    padding: 20px 25px;
    margin: 20px 0;
    border-bottom: 1px solid #f0f0f0;

    &:first-of-type {
      margin-top: 0;
    }
    &:last-of-type {
      border-bottom: none;
      margin-bottom: 0;
    }
  }
  .detailTabTitle {
    font-size: 18px;
    font-weight: 600;
    line-height: 100%;
    color: ${({ theme }) => theme.colors.inkBlue};
    margin-bottom: 30px;
  }

  .commonBadge {
    p {
      display: inline-block;
      line-height: 17px;
      color: #fff;
      padding: 3px 12px;
      border-radius: 5px;
    }

    &.evaporatorBoolean {
      p {
        background-color: #00a86b;
      }
    }
    &.reqadoutsBoolean {
      p {
        background-color: #cf5439;
      }
    }
    &.reqadoutsHrMin {
      p {
        background-color: #e84f9e;
      }
    }
  }

  .chillerDetailList {
    display: flex;
    flex-wrap: wrap;
    gap: 30px 0;
    li {
      width: 25%;
      .titleWrap {
        gap: 0;
      }
    }
  }

  .chillerAnalyticsDetailsWrap {
    margin: 24px 22px 0;
    padding: 0 25px 35px;
    border-bottom: 1px solid #f0f0f0;

    h3 {
      font-size: 22px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 35px;
    }

    .chillerAnalyticsDetails {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0;

      .titleWrap {
        span {
          display: none;
        }
      }
    }
  }

  .analyticsGraph {
    margin: 35px 0;
    padding: 0 22px;

    .timeLegends {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 0;

      li {
        font-size: 14px;
        font-weight: 500;
        line-height: 100%;
        color: #626c99;
        cursor: pointer;
        border-right: 1px solid #f0f0f0;
        padding: 0 12px;
        &:last-of-type {
          padding-right: 0;
          border: 0;
        }

        &.active,
        &:hover {
          color: #000abc;
        }
      }
    }

    .mainGraphWrap {
      margin-top: 35px;
      .charityCard {
        width: 100%;
        height: 100%;
        background: ${({ theme }) => theme.colors.white};
        border-radius: 16px;
        padding: 25px;
        border: 1px solid #c3c3c3;
        overflow: auto;

        .issueHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 25px;
          border-bottom: 2px solid #f0f0f0;

          h2 {
            font-size: 16px;
            line-height: 100%;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.inkBlue};
            margin: 0;
            padding: 0;
            border: none;
          }

          a {
            color: #000abc;
            font-weight: 600;
          }
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

        .gaugeChart {
          margin-top: 25px;
          height: 236px;

          img {
            width: 100%;
            height: 100%;
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

        .consumptionChart {
          margin: 35px 0;
        }
      }
    }
  }

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
        width: 12.5%;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        line-height: 100%;
        color: ${({ theme }) => theme.colors.inkBlue};
        margin-bottom: 25px;
      }
    }
    .valueWrap {
      display: flex;
      border: 2px solid #f0f0f0;
      border-radius: 12px;

      div {
        padding: 18px 15px;
        font-size: 12px;
        font-weight: 500;
        line-height: 100%;
        color: ${({ theme }) => theme.colors.inkBlue};
        width: 12.5%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 2px solid #f0f0f0;
        &:first-of-type {
          border-left: none;
        }
        &.timeValueWrap {
          display: flex;
          flex-direction: column;
          gap: 5px;
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

  @media only screen and (max-width: ${({ theme }) => theme.device.md}) {
    .chillerButtonWrap {
      margin-top: 15px;
    }

    .chillerContentHeader {
      flex-wrap: wrap;
      gap: 10px;
    }

    .chillerAnalyticsDetails {
      flex-wrap: wrap;
      gap: 20px;
      li {
        width: 48%;
      }
    }

    .chillerDetailList {
      flex-wrap: wrap;
      li {
        width: 33%;
        &.extraDetails {
          display: none;
        }
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.sm}) {
    .timelineContentHeader {
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
    }

    .viewButtonWrap {
      flex-wrap: wrap;
    }

    .chillerDetailList {
      flex-wrap: wrap;
      li {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
    .chillerButtonWrap {
      flex-wrap: wrap;
    }

    .dropdownWrap {
      flex-wrap: wrap;
    }
  }
`;
