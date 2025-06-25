import React from 'react';

import { Empty, Grid, TablePaginationConfig, TableProps } from 'antd';

import { StyledTable } from './style';

const { useBreakpoint } = Grid;

interface CustomProps {
  summaryRow?: React.ReactNode;
  emptyText?: React.ReactNode;
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
  const { pagination, summaryRow, scroll, emptyText } = props;
  const screens = useBreakpoint();

  const responsiveScroll = !screens.md
    ? { x: 'max-content' } // Enables horizontal scroll on small screens
    : scroll;

  return (
    <StyledTable
      size="small"
      {...props}
      pagination={pagination ? { ...defaultPaginationSettings, ...pagination } : false}
      rowKey={(record: any) => (record?._id ? record?._id : '')}
      scroll={responsiveScroll}
      locale={{
        emptyText: emptyText || (
          <Empty
            className="pt-40 pb-40"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={`No data added yet.`}
          />
        )
      }}
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
