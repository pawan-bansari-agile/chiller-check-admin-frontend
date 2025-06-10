import { Table } from 'antd';
import { styled } from 'styled-components';

export const StyledTable = styled(Table)`
  &.ant-table-wrapper {
    .ant-spin-container {
      .ant-table {
        &.ant-table-small {
        }
        &.ant-table-bordered {
        }
      }
      ul.ant-pagination {
        &.ant-table-pagination {
          .ant-pagination-total-text {
          }
          li {
            & + li {
              margin-inline-end: 6px;
            }
          }
        }
      }
    }
  }
`;
