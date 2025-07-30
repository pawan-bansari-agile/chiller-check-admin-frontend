import { createGlobalStyle } from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

export const AntTable = createGlobalStyle`
    .ant-table-content{
        .ant-table-thead{
            tr th{
                text-align: center;
                background-color: ${({ theme }) => theme.colors.skyBlue};
                border-top: 1px solid ${({ theme }) => theme.colors.purple};
                border-bottom: 1px solid ${({ theme }) => theme.colors.purple};
                font-size: 15px;
                font-weight: 600;
                line-height: 20px;
                color: ${({ theme }) => theme.colors.black};
                padding: 13px !important;
                &:first-of-type{
                    padding-left: 30px !important;
                }
                &.ant-table-column-has-sorters{
                    .ant-table-column-title{
                        font-size: 15px;
                        font-weight: 600;
                        line-height: 20px;
                        color: ${({ theme }) => theme.colors.black};
                    }
                }

                .ant-table-column-sorters{
                    svg{
                        fill: ${({ theme }) => theme.colors.inkBlue};
                    }
                }
            }
        }
        .ant-table-tbody{
            .ant-table-measure-row{
                display: none;
            }
            .ant-table-row.ant-table-row-selected >.ant-table-cell{
                background: #fff !important;
            }
            .ant-table-row >.ant-table-cell-row-hover{
                background: #fff !important;
            }
            tr td{
                text-align: center;
                font-size: 14px;
                font-weight: 400;
                line-height: 22px;
                color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
                padding: 11px 5px !important;
                /* vertical-align: top; */

                &:first-of-type{
                    padding-left: 30px !important;
                }

                .actionIonWrap{
                    display: flex;
                    justify-content: center;
                    gap: 5px;
                    .actionIcon{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 24px;
                        height: 24px;
                        background: ${({ theme }) => theme.colors.green};
                        border-radius: 6px;
                        cursor: pointer;

                        svg{
                            fill: white;
                        }
                    }
                }
            }
        }
    }
`;
