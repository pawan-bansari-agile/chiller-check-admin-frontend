import React from 'react';

import { TablePaginationConfig, TableProps } from 'antd';

import { StyledTable } from './style';

interface CustomProps {
  summaryRow?: React.ReactNode;
}

export const TableSummaryCell: React.FC<{
  index: number;
  colSpan: number;
  component?: React.ReactNode;
}> = ({ index, colSpan, component }) => (
  <StyledTable.Summary.Cell index={index} colSpan={colSpan}>
    {component}
  </StyledTable.Summary.Cell>
);

const defaultPaginationSettings: Partial<TablePaginationConfig> = {
  showSizeChanger: true,
  showQuickJumper: true,
  defaultPageSize: 10,
  pageSizeOptions: ['10', '20', '50', '100'],
  size: 'small',
  position: ['bottomRight'],
  showTotal: (total) => `Total ${total} items`
};

export const CommonTable: React.FC<TableProps<any> & CustomProps> = (props) => {
  const { pagination, summaryRow } = props;

  return (
    <StyledTable
      size="small"
      {...props}
      pagination={{ ...defaultPaginationSettings, ...pagination }}
      // TODO : depend on backend response
      rowKey={(record: any) => (record?.id ? record?.id : '')}
      summary={
        summaryRow
          ? () => (
              <StyledTable.Summary fixed="top">
                <StyledTable.Summary.Row>{summaryRow}</StyledTable.Summary.Row>
              </StyledTable.Summary>
            )
          : undefined
      }
    />
  );
};
