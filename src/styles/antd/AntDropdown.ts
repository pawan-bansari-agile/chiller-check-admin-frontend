import { createGlobalStyle } from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

export const AntDropdown = createGlobalStyle`
.ant-dropdown{
    &.layout-header-dropdown{
        top: ${({ theme }) => `${parseInt(theme.size.headerHeight) + 5}px`} !important;
        .ant-dropdown-menu{
            padding: 8px;
            .ant-dropdown-menu-item{
                padding: 8px 12px;

                .anticon{
                    font-size: 16px;
                }
                
                .cta-btn{
                    height: 25px;
                    padding: 0;
                    justify-content: flex-start;
                    color: ${({ theme }) => theme.colors.primary};
                    
                    &:hover{
                        color: ${({ theme }) => hexToRGBA(theme.colors.primary, 0.8)};
                    }
                } 
            }
        }

    }

    ul.ant-dropdown-menu{
        li span{
            font-size: 14px;
            line-height: 22px;
            font-weight: 500;
            color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
        }
    }
}
    .ant-dropdown-trigger{
        border: 1px solid ${({ theme }) => theme.colors.blackShadow};
        padding: 6.5px 20px;
        border-radius: 30px;
        .ant-space-item{
            font-size: 14px;
            line-height: 22px;
            font-weight: 500;
            color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
            svg{
                font-size: 12px;
            }
        }
    }

    /* dashboard company dropdown */
    .comapanyDashboardDropdown  {
        width: 243px;
    background: #fff;
    padding: 20px 10px;
    border-radius: 12px;
    box-shadow: 0px 3px 10px 0px rgba(56, 66, 111, 0.2);

    .ant-dropdown{
        box-shadow: none !important;
    }
    .company-list{
      margin-bottom: 0;
      height: 228px;
      overflow: auto;

      .company-item{
        cursor: pointer;
          padding: 15px 26px;
                     font-size: 14px;
            line-height: 22px;
            font-weight: 400;
            color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
      }
    }
        .searchCompany{
      margin-bottom: 10px;
background: #EDEFF3;
border: none;
               font-size: 14px;
            line-height: 22px;
            font-weight: 400;
            color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};

            &::placeholder{
                               font-size: 14px;
            line-height: 22px;
            font-weight: 400;
            color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
            }
    }
    }

      /* logout icon */
  .logout-icon-label {
    display: flex;
    align-items: center;
    gap: 8;
    cursor: 'pointer';
    width: '100%'; // Optional: make sure it spans the row
    .logout-label {
      display: inline-block;
      margin-left: 8px;
    }
  }

  /* chiller column */
    .chillerColumns{
    background: #fff;
    border-radius: 12px;
    padding: 18px 10px;
    box-shadow: 0px 3px 10px 0px rgba(56, 66, 111, 0.2);

    .chillerColumnsList{
        margin-bottom: 0;
        max-height: 700px;
        overflow: auto;

        li{
            padding: 13px 26px;
            span{
                font-size: 14px;
                font-weight: 400;
                line-height: 22px;
                color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
            }

            .checkboxLabelTitle{
                margin: 0 2px
            }
        }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
    .comapanyDashboardDropdown{
        width: 230px;
    }
  }
`;
