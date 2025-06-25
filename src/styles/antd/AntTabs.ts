import { createGlobalStyle } from 'styled-components';

export const AntTabs = createGlobalStyle`
.ant-tabs{
    .ant-tabs-nav{
        padding: 0 22px;
    }
    .ant-tabs-tab{
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        color: ${({ theme }) => theme.colors.lightPurple};
        font-family: ${({ theme }) => theme.font.inter};
        &.ant-tabs-tab-active{
            color: ${({ theme }) => theme.colors.primary};
        }
    }
}
`;
