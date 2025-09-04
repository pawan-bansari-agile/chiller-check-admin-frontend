import { Layout } from 'antd';
import { styled } from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

import { commonScroll } from '@/styles/common/Mixin';

export const StyledLayout = styled(Layout)`
  background: ${({ theme }) => theme.colors.bgColor};
  &.ant-layout.main-parent-layout {
    height: 100vh;

    /* Header */
    .ant-layout-header {
      height: auto;
      padding: 10px 18px;

      .header-logo {
        display: flex;
        cursor: pointer;
      }

      .header-right-nav {
        display: flex;
        align-items: center;
        gap: 20px;

        .notificationBellWithCount {
          position: relative;
          line-height: normal;
          .notificationCount {
            position: absolute;
            width: 18px;
            height: 18px;
            border-radius: 100%;
            font-size: 10px;
            background: red;
            color: ${({ theme }) => theme.colors.white};
            display: flex;
            align-items: center;
            justify-content: center;
            top: -8px;
            left: 9px;
          }
        }

        .ant-avatar {
          width: 30px !important;
          height: 30px !important;
          padding: 0 !important;
          cursor: pointer;
          img {
            object-fit: contain;
          }
        }
      }

      .header-controller-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    /* Sidebar */
    .ant-layout-sider {
      height: calc(100vh - 55px);
      background: ${({ theme }) => theme.colors.inkBlue} !important ;

      &.hover-expand-sidebar:not(:hover) .ant-menu-submenu-arrow {
        display: none;
      }
      &.hover-expand-sidebar {
        width: 60px !important;
        max-width: 60px !important;
        min-width: 60px !important;
        overflow: auto !important;
        transition: all 0.3s;
        position: absolute;
        left: 0;
        z-index: 9999;

        &:hover {
          width: 238px !important;
          max-width: 238px !important;
          min-width: 238px !important;
        }

        .ant-menu-inline-collapsed > .ant-menu-item,
        .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
          padding: 0 24px;
        }
      }

      .logo-wrap {
        height: 50px;
        padding: 10px 16px 6px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: padding 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;

        svg {
          height: 36px;
        }

        &.sm {
          padding: 10px 4px 6px;
        }
      }

      .ant-layout-sider-trigger {
        padding: 16px;
        display: flex;
        background: ${({ theme }) => theme.colors.inkBlue};
      }

      .ant-menu-light,
      .ant-menu-light > .ant-menu {
        background: ${({ theme }) => theme.colors.inkBlue};
      }

      .ant-menu {
        &.ant-menu-light {
          padding: 29px 0;
        }
        &.ant-menu-sub {
          position: relative;
          &::before {
            content: '';
            width: 1px;
            height: 100%;
            background: ${({ theme }) => hexToRGBA(theme.colors.white, 0.4)};
            position: absolute;
            left: 30px;
          }
        }
        &.sidebar-menu {
          ${commonScroll}
          height: 100%;
          overflow: auto;
          padding-top: 36px;
          padding-bottom: 36px;

          max-height: calc(100vh - 100px);
        }

        .ant-menu-item {
          color: ${({ theme }) => theme.colors.white};

          .anticon {
            font-size: 18px;
          }
        }
        .ant-menu-item-selected {
          background: ${({ theme }) => theme.colors.lightBlue};
        }
        .ant-menu-submenu {
          .ant-menu-submenu-title {
            color: ${({ theme }) => theme.colors.white};

            .anticon {
              font-size: 18px;

              svg {
                width: 18px;
                height: 18px;
              }
            }
          }
        }
      }
    }

    /* Content */
    .ant-layout-content {
      overflow: hidden auto;
      height: calc(100vh - 55px);

      .content-body {
        height: 100%;
        padding: 0 0 20px 60px;
      }

      .content-wrap {
        height: 100%;
        padding: 0 18px 0 37px;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xl}) {
    &.ant-layout.main-parent-layout {
      .ant-layout-content {
        .content-wrap {
          padding: 0 15px;
        }
      }
    }
  }
`;
