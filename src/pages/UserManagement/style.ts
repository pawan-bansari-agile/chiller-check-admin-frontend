import styled from 'styled-components';

export const Wrapper = styled.div`
  /* listing */
  .userContentHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 22px 22px;

    .dropdownWrap {
      display: flex;
      gap: 10px;
    }

    .searchUser {
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

  .userImageWrap {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
  }
  .userImage {
    width: 29px;
    height: 29px;
    border-radius: 50%;
    margin-bottom: 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  /* add */

  .extraActionButton {
    justify-content: flex-end;
    margin: 25px 0 !important;
  }

  .shadowWrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .addProfilePic {
    width: 104px;
    .pictureLabel {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 12px;
    }

    .inputPicture {
      position: relative;
      width: 104px;
      height: 104px;
      border-radius: 50%;

      .ant-image {
        width: 100%;
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: contain;
      }

      .cameraIcon {
        position: absolute;
        right: 0;
        bottom: 3px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.white};
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
        cursor: pointer;

        .fileLabel input[type='file'] {
          display: none;
        }

        .fileLabel {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          svg {
            width: 30px;
            height: 30px;
            padding: 7px;
          }
        }
      }

      .ant-spin {
        position: absolute;
        top: 40%;
        left: 38%;
        z-index: 999;
      }
    }

    .removeImg {
      font-size: 12px;
      font-weight: 400;
      line-height: 150%;
      color: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
      margin-top: 12px;

      &:hover {
        color: ${({ theme }) => theme.colors.inkBlue};
      }
    }
  }
  .addProfilePic {
    label {
      font-size: 14px;
      font-weight: 400;
      line-height: 150%;
      color: ${({ theme }) => theme.colors.inkBlue};
    }
  }
  .userTab {
    .ant-tabs-nav {
      margin-bottom: 40px;
    }
  }
  .profileForm {
    width: 85%;
  }
  .resposibilityTitle {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.inkBlue};
    line-height: 28px;
    margin: 0 0px 40px 32px;
  }
  .chillerTitle {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.inkBlue};
    line-height: 28px;
    margin: 40px 0px 40px 32px;
  }
  .userMobileInput {
    .ant-input-group-addon {
      border-radius: 10px 0 0 10px !important;
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
    input {
      border-radius: 0 10px 10px 0 !important;
    }
    .ant-input-group-wrapper-status-error
      .ant-input-wrapper.ant-input-group
      > .ant-input-group-addon {
      border-color: red !important;
    }
  }

  .permission-table {
    tbody tr td {
      font-weight: 600;
    }
  }

  /* edit company */
  .editButtonWrap {
    display: flex;
    gap: 10px;
  }

  /* view */
  .button-wrap {
    display: flex;
    gap: 10px;
  }

  .scrollDiv {
    overflow-x: auto;
    width: 100%;
  }
  .alertBoxes {
    border: 1px solid #c3c3c3;
    border-radius: 20px;
    padding: 25px;
    margin: 0 32px;

    .notificationAlertListWrap {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      min-width: 1200px;

      .notificationAlertList {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 50%;

        .generalWrap {
          display: flex;
          align-items: center;
          width: 100%;

          &:first-of-type {
            height: 28px;
          }

          .generalName {
            width: 32%;
            h3 {
              font-size: 14px;
              font-weight: 600;
              line-height: 28px;
              color: ${({ theme }) => theme.colors.inkBlue};
            }
            span {
              font-size: 16px;
              font-weight: 600;
              line-height: 28px;
              color: ${({ theme }) => theme.colors.primary};
            }
          }

          .warningLabel {
            display: flex;
            align-items: center;
            width: 32%;
            margin-right: 15px;
            &:last-child {
              margin-right: 0;
            }
            span {
              font-size: 14px;
              font-weight: 400;
              line-height: 150%;
              color: ${({ theme }) => theme.colors.inkBlue};
            }
          }
        }
      }
    }

    .logEntryLabel {
      font-size: 16px;
      font-weight: 600;
      line-height: 28px;
      color: #000abc;
      margin-bottom: 20px;
    }

    .logEntryListWrap {
      display: flex;
      flex-direction: column;
      gap: 20px;
      min-width: 1200px;
    }

    .logEntryList {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .logInput {
        width: 44%;
        display: flex;
        align-items: center;

        .logmaininput {
          width: 22% !important;
        }

        .logInputLabel {
          font-size: 14px;
          font-weight: 600;
          line-height: 28px;
          color: ${({ theme }) => theme.colors.inkBlue};
          margin-left: 10px;
        }
      }

      .logDropdown {
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
      .logCheckbox {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .automatedLabel {
          font-size: 14px;
          font-weight: 400;
          line-height: 28px;
          color: ${({ theme }) => theme.colors.inkBlue};
          margin-right: 15px;
        }
      }
    }
  }

  .viewCompanyShadow {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .viewUserDetails {
    border-bottom: 1px solid ${({ theme }) => theme.colors.body};
    padding: 6px 0 20px 20px;
    margin-bottom: 20px;
    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 0;
    }
  }

  .userInfo {
    display: flex;
    gap: 50px;
    padding: 0 32px;
    width: 100%;
    padding-bottom: 22px;
    figure {
      width: 123px;
      height: 123px;
      border-radius: 13px;
      margin-bottom: 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 13px;
        object-fit: contain;
      }
    }
    ul.userDetailsList {
      width: 85%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0;
      gap: 30px 0;
      li {
        width: 33%;

        svg {
          fill: ${({ theme }) => theme.colors.inkBlue};
          &.userRole {
            fill: none;
          }
          &.user {
            fill: none;
            path {
              stroke: ${({ theme }) => theme.colors.inkBlue};
            }
          }
        }
        .statusBtn {
          font-size: 12px;
          font-weight: 400;
          line-height: 17px;
          color: ${({ theme }) => theme.colors.white};
          border-radius: 11px;
          padding: 1px 12px;

          &.active {
            background: ${({ theme }) => theme.colors.green};
          }
          &.inactive {
            background: ${({ theme }) => theme.colors.danger};
          }
        }
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.md}) {
    .userContentHeader {
      flex-wrap: wrap;
      gap: 15px;
    }

    .userInfo {
      flex-direction: column;
      gap: 30px;
      padding: 0;

      ul li {
        width: 50%;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.sm}) {
    .dropdownWrap {
      flex-wrap: wrap;
    }

    .userInfo {
      ul li {
        width: 100%;
      }
      ul.userDetailsList {
        li {
          width: 100%;
        }
      }
    }
  }
`;
