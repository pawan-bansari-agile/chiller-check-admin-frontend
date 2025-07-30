import React, { ChangeEvent, useEffect, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Input, TablePaginationConfig } from 'antd';
import { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';

import { chillerHooks } from '@/services/chiller';
import { TimelineList } from '@/services/chiller/types';
import { ICommonPagination } from '@/services/common/types';

import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { debounce, getSortOrder } from '@/shared/utils/functions';

import { Wrapper } from '../style';

interface IProps {
  id?: string;
}

const TimelineTab: React.FC<IProps> = ({ id }) => {
  const { RangePicker } = DatePicker;
  const [args, setArgs] = useState<ICommonPagination>({
    page: 1,
    limit: 10,
    sort_by: '',
    sort_order: '',
    search: '',
    chillerId: id || ''
  });
  const { data, isLoading } = chillerHooks.ChillerTimeLineList(args);

  useEffect(() => {
    if (id)
      setArgs((prev) => ({
        ...prev,
        chillerId: id
      }));
  }, [id]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<TimelineList> | SorterResult<TimelineList>[]
  ) => {
    if (!Array.isArray(sorter)) {
      setArgs({
        ...args,
        page: pagination?.current ?? 1,
        limit: pagination?.pageSize ?? 10,
        sort_by: sorter?.order ? String(sorter?.field) : '',
        sort_order: getSortOrder(sorter?.order) || ''
      });
    }
  };

  const updateSearch = debounce((value: string) => {
    setArgs((prevArgs) => ({ ...prevArgs, search: value, page: 1 }));
  });

  const handleRangeChange = (dates: any) => {
    if (!dates || dates.length === 0) {
      setArgs((prev) => ({ ...prev, page: 1, startDate: undefined, endDate: undefined }));
      return;
    }

    const [start, end] = dates;

    const startDate = start.startOf('day');
    const endDate = end.endOf('day');
    setArgs((prev) => ({
      ...prev,
      page: 1,
      startDate: startDate.format('MM-DD-YYYY'),
      endDate: endDate.format('MM-DD-YYYY')
    }));
  };

  const columns: ColumnsType<TimelineList> = [
    {
      title: 'Called At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      sorter: true,
      render: (value: string) => (value ? dayjs(value).format('MM/DD/YY HH:mm') : '-')
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      sorter: true
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      align: 'center'
    }
  ];

  return (
    <Wrapper>
      <div className="timelineContentHeader">
        <RangePicker
          showTime={false}
          className="timelineRangePicker"
          format="MM-DD-YYYY"
          onChange={handleRangeChange}
        />
        <Input
          className="searchTimeline"
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateSearch(e.target.value)}
        />
      </div>
      <CommonTable
        columns={columns}
        dataSource={data?.timelineList || []}
        pagination={{
          current: args?.page ?? 1,
          pageSize: args?.limit ?? 10,
          total: data?.totalRecords ?? 0
        }}
        onChange={handleTableChange}
        loading={isLoading}
        className="timelineTable"
        emptyText={
          <EmptyState
            isEmpty={!data?.timelineList?.length}
            search={args?.search}
            searchDescription="No Timeline Entries Found"
            defaultDescription="No Timeline Entries Found"
          />
        }
      />
    </Wrapper>
  );
};

export default TimelineTab;
