import styled from 'styled-components';

export const Wrapper = styled.div`
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
      .ant-image {
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 13px;
        object-fit: contain;
      }
    }
    ul {
      width: 85%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 0;
      gap: 35px 0;
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
          &.inActive {
            background: ${({ theme }) => theme.colors.danger};
          }
        }
      }
    }
  }

  /* edit */
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

  /* responsive */
  @media only screen and (max-width: ${({ theme }) => theme.device.md}) {
    .userInfo {
      flex-direction: column;
      gap: 30px;

      ul li {
        width: 50%;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
    .userInfo {
      ul li {
        width: 100%;
      }
    }

    .button-wrap {
      flex-wrap: wrap;
    }
  }
`;
