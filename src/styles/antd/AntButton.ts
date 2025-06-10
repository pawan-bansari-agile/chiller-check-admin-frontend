import { createGlobalStyle } from 'styled-components';

export const AntButton = createGlobalStyle`
   .ant-btn-primary{
    border-radius: 30px;
    height: auto;
    box-shadow: none;
    padding: 11px 0;

    span{
        font-size: 14px;
        font-weight: 700;
        line-height: 24px;
        color: ${({ theme }) => theme.colors.white};
    }
   }
`;
