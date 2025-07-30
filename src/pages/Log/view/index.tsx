import React from 'react';

import { Link } from 'react-router-dom';

import {
  DownOutlined,
  DownloadOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  SlidersOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Button, Checkbox, Dropdown, Input, MenuProps, Space, Switch } from 'antd';
import { ColumnsType } from 'antd/es/table';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon } from '@/shared/svg';
import { hasPermission, toAbsoluteUrl } from '@/shared/utils/functions';

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

const operatorItems: MenuProps['items'] = [
  {
    label: <span>Admin</span>,
    key: 'Admin'
  }
];

interface ChillerRow {
  selectAll: string;
  creator: string;
  facilityName: string;
  chiller: {
    name: string;
    code: string;
    link: string;
  };
  updatedAt: string;
  efficiencyLoss: number;
  condLoss: number;
  evapLoss: number;
  nonCondLoss: number;
  otherLoss: number;
}

const data: ChillerRow[] = [
  {
    selectAll: '',
    creator: '',
    facilityName: 'CryoSystems ArcticCore V10',
    chiller: { name: 'CryoStream', code: 'CHL-983472-AQ', link: '#' },
    updatedAt: '12/11/24 15:00',
    efficiencyLoss: 40,
    condLoss: 29,
    evapLoss: 29,
    nonCondLoss: 29,
    otherLoss: 29
  }
];

const columns: ColumnsType<any> = [
  {
    title: () => <Checkbox />,
    dataIndex: 'selectAll',
    key: 'selectAll',
    render: () => <Checkbox checked />
  },
  {
    title: 'Creator & Timestamp',
    dataIndex: 'creator',
    key: 'creator',
    // width: 200,
    render: () => (
      <div className="updateUser">
        <figure>
          <img src={toAbsoluteUrl('/public/icons/header-logo.svg')} alt="user" />
        </figure>
        <div>
          <h4>Joey Tribiyani</h4>
          <span>12/11/24 15:00</span>
        </div>
      </div>
    )
  },
  {
    title: 'Facility name',
    key: 'facilityName',
    dataIndex: 'facilityName'
  },
  {
    title: 'Chiller Name',
    key: 'chillerName',
    // width: 165,
    render: (_: any, record: ChillerRow) => (
      <div className="chillerNameWrap">
        <a className="chillerName">{record.chiller.name}</a>
        <span>{record.chiller.code}</span>
      </div>
    ),
    sorter: (a: any, b: any) => a.chillerName - b.chillerName
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    // width: 165,
    sorter: (a: any, b: any) => a.updatedAt - b.updatedAt
  },
  {
    title: 'Efficiency Loss %',
    key: 'efficiencyLoss',
    // width: 185,
    sorter: (a: any, b: any) => a.efficiencyLoss - b.efficiencyLoss,
    render: (_: any, record: ChillerRow) => {
      let className = '';
      if (record.efficiencyLoss >= 50) className = 'bgRed';
      else if (record.efficiencyLoss >= 44) className = 'bgYellow';

      return <div className={`loss-cell ${className}`}>{record.efficiencyLoss}</div>;
    }
  },
  {
    title: 'Cond. App. Loss %',
    key: 'condLoss',
    dataIndex: 'condLoss',
    sorter: (a: any, b: any) => a.condLoss - b.condLoss,
    render: (_: any, record: ChillerRow) => {
      let className = '';
      if (record.efficiencyLoss >= 50) className = 'bgRed';
      else if (record.efficiencyLoss >= 44) className = 'bgYellow';

      return <div className={`loss-cell ${className}`}>{record.efficiencyLoss}</div>;
    }
  },
  {
    title: 'Evap. App. Loss %',
    key: 'evapLoss',
    dataIndex: 'evapLoss',
    sorter: (a: any, b: any) => a.evapLoss - b.evapLoss,
    render: (_: any, record: ChillerRow) => {
      let className = '';
      if (record.efficiencyLoss >= 50) className = 'bgRed';
      else if (record.efficiencyLoss >= 44) className = 'bgYellow';

      return <div className={`loss-cell ${className}`}>{record.efficiencyLoss}</div>;
    }
  },
  {
    title: 'Non-Cond. App. Loss %',
    key: 'nonCondLoss',
    dataIndex: 'nonCondLoss',
    sorter: (a: any, b: any) => a.nonCondLoss - b.nonCondLoss,
    render: (_: any, record: ChillerRow) => {
      let className = '';
      if (record.efficiencyLoss >= 50) className = 'bgRed';
      else if (record.efficiencyLoss >= 44) className = 'bgYellow';

      return <div className={`loss-cell ${className}`}>{record.efficiencyLoss}</div>;
    }
  },
  {
    title: 'Other Losses %',
    key: 'otherLoss',
    dataIndex: 'otherLoss',
    // width: 165,
    sorter: (a: any, b: any) => a.otherLoss - b.otherLoss,
    render: (_: any, record: ChillerRow) => {
      let className = '';
      if (record.efficiencyLoss >= 50) className = 'bgRed';
      else if (record.efficiencyLoss >= 44) className = 'bgYellow';

      return <div className={`loss-cell ${className}`}>{record.efficiencyLoss}</div>;
    }
  },
  ...(hasPermission('log', 'edit') || hasPermission('log', 'view')
    ? [
        {
          title: '',
          key: 'action',
          fixed: 'right' as any,
          render: () => (
            <div className="actionIonWrap">
              {hasPermission('log', 'edit') && (
                <Link className="actionIcon" to={ROUTES.EDIT_LOG_ENTRY}>
                  <EditIcon />
                </Link>
              )}
              {hasPermission('log', 'view') && (
                <Link className="actionIcon" to={ROUTES.VIEW_LOG_ENTRY}>
                  <EyeOutlined />
                </Link>
              )}
            </div>
          )
        }
      ]
    : [])
];

const LogEntry: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Log Entries" />
      <HeaderToolbar
        title="Log Entries"
        button={
          <div className="logButtonWrap">
            {hasPermission('log', 'view') && (
              <Button type="primary" className="title-btn" size="small" icon={<UploadOutlined />}>
                Export (2)
              </Button>
            )}
            {hasPermission('log', 'view') && (
              <Button type="primary" className="title-btn" size="small" icon={<DownloadOutlined />}>
                Import CSV
              </Button>
            )}
            {hasPermission('log', 'add') && (
              <Link to={ROUTES.ADD_LOG_ENTRY}>
                <Button type="primary" className="title-btn" size="small" icon={<PlusOutlined />}>
                  Add Log
                </Button>
              </Link>
            )}
            {hasPermission('log', 'view') && (
              <Button type="primary" className="title-btn" size="small" icon={<SlidersOutlined />}>
                Columns
              </Button>
            )}
          </div>
        }
      />
      <ShadowPaper>
        <div className="chillerContentHeader">
          <div className="dropdownWrap">
            {hasPermission('log', 'view') && (
              <div>
                <label className="peakLoad">Peak Load</label>
                <Switch defaultChecked />
              </div>
            )}
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

            <Dropdown menu={{ items: operatorItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Select Operator
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <Input
            className="searchChiller"
            placeholder="Search for Chillers"
            prefix={<SearchOutlined />}
          />
        </div>

        <CommonTable
          columns={columns}
          dataSource={data}
          pagination={{ current: 6 }}
          scroll={{ x: 1700 }}
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default LogEntry;
