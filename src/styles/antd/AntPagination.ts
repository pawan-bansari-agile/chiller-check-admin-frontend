import { createGlobalStyle } from 'styled-components';

export const AntPagination = createGlobalStyle`
   .ant-pagination{
    li{
        font-size: 12px;
        line-height: 32px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.black};
        &.ant-pagination-prev, &.ant-pagination-next{
            
        }
    }
   }
`;
