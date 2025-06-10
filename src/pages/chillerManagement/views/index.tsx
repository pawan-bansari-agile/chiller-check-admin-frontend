import React from 'react';

import { Link } from 'react-router-dom';

import {
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  SlidersOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Input, MenuProps, Space, Tag, Tooltip } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable, TableSummaryCell } from '@/shared/components/common/Table';
import { ROUTES } from '@/shared/constants/routes';

import { Wrapper } from '../style';

const companyItems: MenuProps['items'] = [
  {
    label: <span>Petal Grove Academy</span>,
    key: '0'
  },
  {
    label: <span>Angel investor</span>,
    key: '1'
  }
];

const facilityItems: MenuProps['items'] = [
  {
    label: <span>ChillTech ArcticCore V156</span>,
    key: 'ChillTech ArcticCore V156'
  },
  {
    label: <span>ChillTech ArcticCore V10</span>,
    key: 'ChillTech ArcticCore V10'
  }
];

const getLossClass = (value: number) => {
  if (value >= 50) return 'loss-red';
  if (value >= 40) return 'loss-yellow';
  return '';
};

const getStatusTag = (status: string) => {
  const colorMap: Record<string, string> = {
    Active: 'green',
    Pending: 'purple'
  };
  return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
};

const columns = [
  {
    title: '',
    dataIndex: 'select',
    render: () => <input type="checkbox" />,
    width: 40
  },
  {
    title: 'Company name',
    dataIndex: 'company'
  },
  {
    title: 'Facility Name',
    dataIndex: 'facility'
  },
  {
    title: 'Chiller Name',
    dataIndex: 'chillerName',
    render: (_: any, record: any) => (
      <div>
        <a href="#">{record.chillerNameTitle}</a>
        <div>{record.chillerName}</div>
      </div>
    )
  },
  {
    title: 'Tons',
    dataIndex: 'tons'
  },
  {
    title: 'Energy Cost',
    dataIndex: 'energyCost'
  },
  {
    title: 'Efficiency Loss %',
    dataIndex: 'effLoss',
    render: (value: number) => <div className={getLossClass(value)}>{value}</div>
  },
  {
    title: '12 Mon. Loss $',
    dataIndex: 'loss12mo'
  },
  {
    title: 'Cond. App. Loss %',
    dataIndex: 'condLoss',
    render: (value: number) => <div className={getLossClass(value)}>{value}</div>
  },
  {
    title: 'Evap. App. Loss %',
    dataIndex: 'evapLoss',
    render: (value: number) => <div className={getLossClass(value)}>{value}</div>
  },
  {
    title: 'Non-Cond. Loss %',
    dataIndex: 'nonCondLoss',
    render: (value: number) => <div className={getLossClass(value)}>{value}</div>
  },
  {
    title: 'Other Losses %',
    dataIndex: 'otherLoss',
    render: (value: number) => <div className={getLossClass(value)}>{value}</div>
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (value: string) => getStatusTag(value)
  },
  {
    title: 'Last Entry',
    dataIndex: 'lastEntry',
    render: (value: string, record: any) => (
      <div className={getLossClass(record.effLoss)}>
        <div>{record.lastUser}</div>
        <div>{value}</div>
      </div>
    )
  },
  {
    title: '',
    dataIndex: 'actions',
    render: () => (
      <Space>
        <Tooltip title="Edit">
          <EditOutlined style={{ color: '#00c389' }} />
        </Tooltip>
        <Tooltip title="View">
          <EyeOutlined style={{ color: '#00c389' }} />
        </Tooltip>
      </Space>
    )
  }
];

const chillerData = [
  {
    key: '1',
    company: 'Petal Grove Academy',
    facility: 'ChillTech ArcticCore V156',
    chillerNameTitle: 'CryoStream',
    chillerName: 'CHL-983472-AQ',
    tons: 2000,
    energyCost: 1.23,
    effLoss: 42,
    loss12mo: '$1200',
    condLoss: 12,
    evapLoss: 12,
    nonCondLoss: 12,
    otherLoss: 12,
    status: 'Active',
    lastUser: 'Monica Gellar',
    lastEntry: '12/11/24 15:00'
  },
  {
    key: '2',
    company: 'The agile infotech',
    facility: 'ChillTech ArcticCore V10',
    chillerNameTitle: 'FrostLine',
    chillerName: 'FST-764239-BX',
    tons: 500,
    energyCost: 1.5,
    effLoss: 50,
    loss12mo: '$1600',
    condLoss: 29,
    evapLoss: 29,
    nonCondLoss: 29,
    otherLoss: 29,
    status: 'Active',
    lastUser: 'Joey Tribiyani',
    lastEntry: '13/11/24 14:00'
  },
  {
    key: '3',
    company: 'Angel investor',
    facility: 'ChillTech ArcticCore V19',
    chillerNameTitle: 'ArcticNova',
    chillerName: 'GLC-572148-MT',
    tons: 1500,
    energyCost: 1,
    effLoss: 41.5,
    loss12mo: '$1800',
    condLoss: 31,
    evapLoss: 31,
    nonCondLoss: 31,
    otherLoss: 31,
    status: 'Active',
    lastUser: 'Chandler Bing',
    lastEntry: '11/11/24 16:00'
  }
];

const ChillerManagement: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Chiller Management" />
      <HeaderToolbar
        title="Chiller management"
        button={
          <div className="chillerButtonWrap">
            <Button type="primary" className="title-btn" size="small" icon={<SlidersOutlined />}>
              Columns
            </Button>
            <Button type="primary" className="title-btn" size="small" icon={<SyncOutlined />}>
              Bulk Update
            </Button>
            <Link to={ROUTES.Add_CHILLER_MANAGEMENT}>
              <Button type="primary" className="title-btn" size="small" icon={<PlusOutlined />}>
                Add Chiller
              </Button>
            </Link>
          </div>
        }
      />
      <ShadowPaper>
        <div className="chillerContentHeader">
          <div className="dropdownWrap">
            <Dropdown menu={{ items: companyItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Select Company
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>

            <Dropdown menu={{ items: facilityItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Select Facility
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <Input
            className="searchChiller"
            placeholder="Search for Chillers"
            prefix={<SearchOutlined color="red" />}
          />
        </div>
        <CommonTable
          columns={columns}
          dataSource={chillerData}
          pagination={{ current: 6 }}
          summaryRow={
            <>
              <TableSummaryCell index={0} colSpan={9} />
            </>
          }
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default ChillerManagement;
