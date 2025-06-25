import React from 'react';

import { Link } from 'react-router-dom';

import {
  DownOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  SlidersOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { Button, Checkbox, Dropdown, Input, MenuProps, Space, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon } from '@/shared/svg';

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

const ChillerManagement: React.FC = () => {
  interface ChillerRow {
    selectAll: string;
    companyName: string;
    facilityName: string;
    chiller: {
      name: string;
      code: string;
      link: string;
    };
    tons: number;
    energyCost: number;
    efficiencyLoss: number;
    monLoss: number;
    condLoss: number;
    evapLoss: number;
    nonCondLoss: number;
    otherLoss: number;
    status: string;
    lastEntry: {
      datetime: string;
      highlight?: 'red' | 'yellow';
    };
  }

  const chillerData: ChillerRow[] = [
    {
      selectAll: '',
      companyName: 'Petal Grove Academy',
      facilityName: 'CryoSystems ArcticCore V10',
      chiller: { name: 'CryoStream', code: 'CHL-983472-AQ', link: '#' },
      tons: 1000,
      energyCost: 1.23,
      efficiencyLoss: 42,
      monLoss: 12,
      condLoss: 29,
      evapLoss: 29,
      nonCondLoss: 29,
      otherLoss: 29,
      status: 'Active',
      lastEntry: { datetime: '12/11/24 15:00' }
    },
    {
      selectAll: '',
      companyName: 'Petal Grove Academy',

      facilityName: 'CryoSystems ArcticCore V10',
      chiller: { name: 'FrostLine', code: 'FST-764239-BX', link: '#' },
      tons: 1000,
      energyCost: 1.23,
      efficiencyLoss: 50,
      monLoss: 12,
      condLoss: 29,
      evapLoss: 29,
      nonCondLoss: 29,
      otherLoss: 29,

      status: 'Active',
      lastEntry: {
        datetime: '13/11/24 14:00',
        highlight: 'red'
      }
    },
    {
      selectAll: '',
      companyName: 'Petal Grove Academy',

      facilityName: 'CryoSystems ArcticCore V10',
      chiller: { name: 'ArcticNova', code: 'GLC-572148-MT', link: '#' },
      tons: 1000,
      energyCost: 1.23,
      efficiencyLoss: 41.5,
      monLoss: 12,
      condLoss: 29,
      evapLoss: 29,
      nonCondLoss: 29,
      otherLoss: 29,

      status: 'Pending',
      lastEntry: { datetime: '11/11/24 16:00' }
    },
    {
      selectAll: '',
      companyName: 'Petal Grove Academy',

      facilityName: 'CryoSystems ArcticCore V10',
      chiller: { name: 'IceCascade', code: 'POL-394857-VZ', link: '#' },
      tons: 1000,
      energyCost: 1.23,
      efficiencyLoss: 44,
      monLoss: 12,
      condLoss: 29,
      evapLoss: 29,
      nonCondLoss: 29,
      otherLoss: 29,

      status: 'Active',
      lastEntry: {
        datetime: '10/11/24 15:30',
        highlight: 'yellow'
      }
    },
    {
      selectAll: '',
      companyName: 'Petal Grove Academy',

      facilityName: 'CryoSystems ArcticCore V10',
      chiller: { name: 'PolarZen', code: 'CRY-685429-KQ', link: '#' },
      tons: 1000,
      energyCost: 1.23,
      efficiencyLoss: 43,
      monLoss: 12,
      condLoss: 29,
      evapLoss: 29,
      nonCondLoss: 29,

      otherLoss: 29,

      status: 'Active',
      lastEntry: { datetime: '12/11/24 17:30' }
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
      title: 'Company name',
      key: 'companyName',
      dataIndex: 'companyName',
      width: 180
    },
    {
      title: 'Facility name',
      key: 'facilityName',
      dataIndex: 'facilityName',
      width: 220
    },
    {
      title: 'Chiller Name',
      key: 'chillerName',
      render: (_: any, record: ChillerRow) => (
        <div className="chillerNameWrap">
          <a className="chillerName">{record.chiller.name}</a>
          <span>{record.chiller.code}</span>
        </div>
      ),
      sorter: (a: any, b: any) => a.chillerName - b.chillerName
    },
    {
      title: 'Tons',
      key: 'tons',
      dataIndex: 'tons',
      sorter: (a: any, b: any) => a.tons - b.tons
    },
    {
      title: 'Energy Cost',
      key: 'energyCost',
      dataIndex: 'energyCost',
      sorter: (a: any, b: any) => a.energyCost - b.energyCost
    },
    {
      title: 'Efficiency Loss %',
      key: 'efficiencyLoss',
      width: 150,
      sorter: (a: any, b: any) => a.efficiencyLoss - b.efficiencyLoss,
      render: (_: any, record: ChillerRow) => {
        let className = '';
        if (record.efficiencyLoss >= 50) className = 'bgRed';
        else if (record.efficiencyLoss >= 44) className = 'bgYellow';

        return <div className={`loss-cell ${className}`}>{record.efficiencyLoss}</div>;
      }
    },
    {
      title: '12 Mon. Loss $',
      key: 'monLoss',
      dataIndex: 'monLoss',
      sorter: (a: any, b: any) => a.monLoss - b.monLoss,
      render: (monLoss: number) => <>$ {monLoss}</>
    },
    {
      title: 'Cond. App. Loss %',
      key: 'condLoss',
      dataIndex: 'condLoss',
      width: 155,
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
      width: 155,
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
      width: 180,
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
      sorter: (a: any, b: any) => a.otherLoss - b.otherLoss,
      render: (_: any, record: ChillerRow) => {
        let className = '';
        if (record.efficiencyLoss >= 50) className = 'bgRed';
        else if (record.efficiencyLoss >= 44) className = 'bgYellow';

        return <div className={`loss-cell ${className}`}>{record.efficiencyLoss}</div>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => (
        <Tag className="statusTag" color={statusColorMap[status] || 'default'}>
          {status}
        </Tag>
      ),
      sorter: (a: any, b: any) => a.status - b.status
    },
    {
      title: 'Last Entry',
      key: 'lastEntry',
      sorter: (a: any, b: any) => a.lastEntry - b.lastEntry,
      render: (_: any, record: ChillerRow) => {
        let className = '';
        if (record.efficiencyLoss >= 50) className = 'bgRed';
        else if (record.efficiencyLoss >= 44) className = 'bgYellow';
        return (
          <div className={`last-entry-cell ${className}`}>
            <div>{record.lastEntry.datetime}</div>
          </div>
        );
      }
    },
    {
      title: '',
      key: 'action',
      fixed: 'right',
      render: () => (
        <div className="actionIonWrap">
          <Link className="actionIcon" to={ROUTES.Edit_CHILLER_MANAGEMENT}>
            <EditIcon />
          </Link>
          <Link className="actionIcon" to={ROUTES.View_CHILLER_MANAGEMENT}>
            <EyeOutlined />
          </Link>
        </div>
      )
    }
  ];

  const statusColorMap: Record<string, string> = {
    Active: '#00A86B',
    Inactive: '#CF5439',
    Pending: '#000ABC'
  };

  const menu = (
    <div className="chillerColumns">
      <ul className="chillerColumnsList">
        <li>
          <Checkbox>
            <span className="checkboxLabelTitle">Entry</span>
          </Checkbox>
        </li>
        <li>
          <Checkbox>Chiller Name</Checkbox>
        </li>
        <li>
          <Checkbox>Make & Model</Checkbox>
        </li>
        <li>
          <Checkbox>Load %</Checkbox>
        </li>
        <li>
          <Checkbox>Loss %</Checkbox>
        </li>
        <li>
          <Checkbox>Outside Air Temp</Checkbox>
        </li>
        <li>
          <Checkbox>Con. Inlet Temp</Checkbox>
        </li>
      </ul>
    </div>
  );

  return (
    <Wrapper>
      <Meta title="Chiller Management" />
      <HeaderToolbar
        title="Chiller management"
        button={
          <div className="chillerButtonWrap">
            <Dropdown overlay={menu} trigger={['click']}>
              <Button type="primary" className="title-btn" size="small" icon={<SlidersOutlined />}>
                Columns
              </Button>
            </Dropdown>
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
            prefix={<SearchOutlined />}
          />
        </div>
        <CommonTable
          columns={columns}
          dataSource={chillerData}
          pagination={{ current: 6 }}
          scroll={{ x: 2300 }}
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default ChillerManagement;
