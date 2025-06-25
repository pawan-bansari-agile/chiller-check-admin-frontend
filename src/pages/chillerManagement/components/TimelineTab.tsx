import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, DatePickerProps, Input } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';

import { CommonTable } from '@/shared/components/common/Table';

import { Wrapper } from '../style';

const columns = [
  {
    title: 'Called At',
    dataIndex: 'calledAt',
    key: 'calledAt',
    width: 200,
    sorter: (a: any, b: any) => a.calledAt - b.calledAt
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 200,
    sorter: (a: any, b: any) => a.title - b.title
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  }
];

const data = [
  {
    calledAt: '12/11/21 15:53',
    title: 'Chiller Updated',
    description:
      'The chiller configuration was updated. Params updated are - Weekly Hours Of Operation, Actual Chill Water Pressure Drop Unit, Design Chill Water Pressure Drop. Updated by: John Doe.'
  }
];

const { RangePicker } = DatePicker;

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  console.log('onOk: ', value);
};

const TimelineTab: React.FC = () => {
  return (
    <Wrapper>
      <div className="timelineContentHeader">
        <RangePicker
          showTime={false}
          className="timelineRangePicker"
          format="YYYY-MM-DD"
          onChange={(value, dateString) => {
            console.log('Selected Time: ', value);
            console.log('Formatted Selected Time: ', dateString);
          }}
          onOk={onOk}
        />
        <Input className="searchTimeline" placeholder="Search" prefix={<SearchOutlined />} />
      </div>
      <CommonTable columns={columns} dataSource={data} className="timelineTable" />
    </Wrapper>
  );
};

export default TimelineTab;
