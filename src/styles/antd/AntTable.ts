import { createGlobalStyle } from 'styled-components';

import { hexToRGBA } from '@/shared/utils/functions';

export const AntTable = createGlobalStyle`
    .ant-table-content{
        .ant-table-thead{
            tr th{
                background-color: ${({ theme }) => theme.colors.skyBlue};
                border-top: 1px solid ${({ theme }) => theme.colors.purple};
                border-bottom: 1px solid ${({ theme }) => theme.colors.purple};
                font-size: 12px;
                font-weight: 500;
                line-height: 20px;
                color: ${({ theme }) => theme.colors.black};
                padding: 13px !important;
            }
        }
        .ant-table-tbody{
            tr td{
                font-size: 12px;
                font-weight: 500;
                line-height: 20px;
                color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.85)};
            }
        }
    }
`;
