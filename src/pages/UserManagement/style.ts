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
      object-fit: contain;
    }
  }

  /* add */
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
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: #edeff3;

      i {
        svg {
          width: 42px;
          fill: #d3d6ed;
          path {
            stroke: #d3d6ed;
          }
        }
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

  /* view */
  .button-wrap {
    display: flex;
    gap: 10px;
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
    align-items: center;
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
      justify-content: space-between;
      margin-bottom: 0;
      gap: 30px 0;
      li {
        width: 30%;

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
