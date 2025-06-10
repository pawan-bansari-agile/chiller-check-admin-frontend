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
            color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)}
        }
    }
`;
