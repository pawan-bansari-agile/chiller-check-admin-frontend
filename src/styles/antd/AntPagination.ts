import { createGlobalStyle } from 'styled-components';

export const AntPagination = createGlobalStyle`
   .ant-pagination{
    li{
        font-size: 12px;
        line-height: 32px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.black};
        &.ant-pagination-item{
            border: 1px solid ${({ theme }) => theme.colors.paginationBorder} !important;
            a{
                font-size: 12px;
                font-weight: 400;
                color: ${({ theme }) => theme.colors.black};
            }
        }
        &.ant-pagination-prev, &.ant-pagination-next{
            border: 1.5px solid #ECECED;
            .ant-pagination-item-link{
                svg{
                    fill: ${({ theme }) => theme.colors.black};
                }
            }
            &.ant-pagination-disabled{
                    .ant-pagination-item-link{
                svg{
                    fill: #ECECED;
                }
            }
            }
        }
        &.ant-pagination-item-active{
            background: ${({ theme }) => theme.colors.primary};
            a{
              font-size: 12px;
              font-weight: 400;
              color: ${({ theme }) => theme.colors.white};
            }
        }
        &.ant-pagination-options{
            .ant-select{
                .ant-select-selector{
                    box-shadow: none !important;
                    .ant-select-selection-item{
                        font-size: 12px;
                        line-height: 22px;
                        font-weight: 400;
                        color: ${({ theme }) => theme.colors.black};    
                    }
                }
                .ant-select-dropdown{
                    .ant-select-item-option-content{
                        font-size: 12px;
                        line-height: 22px;
                        font-weight: 400;
                        color: ${({ theme }) => theme.colors.black};    
                    }
                }
            }
            .ant-pagination-options-quick-jumper{
                input{
                    border: 1px solid #ECECED;
                    font-size: 12px;
                    line-height: 22px;
                    color: ${({ theme }) => theme.colors.black};
                    &:focus-within{
                        box-shadow: none;
                    }
                }
            }
        }
        &.ant-pagination-jump-next{
            &:hover{
                svg{
                    fill: ${({ theme }) => theme.colors.paginationIcon};
                }
            }
            .ant-pagination-item-ellipsis{
                color: ${({ theme }) => theme.colors.paginationIcon} !important;
            }
        }
    }
   }
`;
