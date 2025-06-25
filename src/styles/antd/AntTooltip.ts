import { createGlobalStyle } from 'styled-components';

export const AntTooltip = createGlobalStyle`
  .ant-tooltip{
    .ant-tooltip-content{
        .ant-tooltip-inner{
            border-radius: 10px;
            padding: 10px;
        }
    }
  }
  .anticon{
    cursor: pointer;
  }
`;
