import React from 'react';

import {
  AuditOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { Button, Tag } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { EditIcon, FacilityIcon } from '@/shared/svg';

import { Wrapper } from '../style';

const ViewFacility: React.FC = () => {
  interface ChillerRow {
    facilityName: string;
    chiller: {
      name: string;
      code: string;
      link: string;
    };
    efficiencyLoss: number;
    annualLoss: string;
    subscription: string;
    status: 'Active';
    lastEntry: {
      name: string;
      datetime: string;
      highlight?: 'red' | 'yellow';
    };
  }

  const data: ChillerRow[] = [
    {
      facilityName: 'CryoSystems ArcticCore V10',
      chiller: { name: 'CryoStream', code: 'CHL-983472-AQ', link: '#' },
      efficiencyLoss: 42,
      annualLoss: '$1200',
      subscription: '$240',
      status: 'Active',
      lastEntry: { name: 'Monica Gellar', datetime: '12/11/24 15:00' }
    },
    {
      facilityName: 'CryoSystems ArcticCore V10',
      chiller: { name: 'FrostLine', code: 'FST-764239-BX', link: '#' },
      efficiencyLoss: 50,
      annualLoss: '$1600',
      subscription: '$255',
      status: 'Active',
      lastEntry: {
        name: 'Joey Tribiyani',
        datetime: '13/11/24 14:00',
        highlight: 'red'
      }
    },
    {
      facilityName: 'CryoSystems ArcticCore V10',
      chiller: { name: 'ArcticNova', code: 'GLC-572148-MT', link: '#' },
      efficiencyLoss: 41.5,
      annualLoss: '$1800',
      subscription: '$300',
      status: 'Active',
      lastEntry: { name: 'Chandler Bing', datetime: '11/11/24 16:00' }
    },
    {
      facilityName: 'CryoSystems ArcticCore V10',
      chiller: { name: 'IceCascade', code: 'POL-394857-VZ', link: '#' },
      efficiencyLoss: 44,
      annualLoss: '$3567',
      subscription: '$450',
      status: 'Active',
      lastEntry: {
        name: 'Ross Smith',
        datetime: '10/11/24 15:30',
        highlight: 'yellow'
      }
    },
    {
      facilityName: 'CryoSystems ArcticCore V10',
      chiller: { name: 'PolarZen', code: 'CRY-685429-KQ', link: '#' },
      efficiencyLoss: 43,
      annualLoss: '$4567',
      subscription: '$380',
      status: 'Active',
      lastEntry: { name: 'Jennifer Lawrence', datetime: '12/11/24 17:30' }
    }
  ];

  const columns = [
    {
      title: 'Facility name',
      key: 'facilityName',
      dataIndex: 'facilityName'
    },
    {
      title: 'Chiller Name',
      key: 'chillerName',
      render: (_: any, record: ChillerRow) => (
        <div>
          <a href={record.chiller.link} style={{ color: '#3b82f6', fontWeight: 500 }}>
            {record.chiller.name}
          </a>
          <div>{record.chiller.code}</div>
        </div>
      )
    },
    {
      title: 'Efficiency Loss %',
      key: 'efficiencyLoss',
      render: (_: any, record: ChillerRow) => {
        let className = '';
        if (record.efficiencyLoss >= 50) className = 'bg-red';
        else if (record.efficiencyLoss >= 44) className = 'bg-yellow';

        return <div className={`loss-cell ${className}`}>{record.efficiencyLoss}</div>;
      }
    },
    {
      title: '12 Mon. Loss $',
      key: 'annualLoss',
      dataIndex: 'annualLoss'
    },
    {
      title: 'Annual Subscription',
      key: 'subscription',
      dataIndex: 'subscription'
    },
    {
      title: 'Status',
      key: 'status',
      render: () => <Tag color="green">Active</Tag>
    },
    {
      title: 'Last Entry',
      key: 'lastEntry',
      render: (_: any, record: ChillerRow) => {
        const highlightClass =
          record.lastEntry.highlight === 'red'
            ? 'highlight-red'
            : record.lastEntry.highlight === 'yellow'
              ? 'highlight-yellow'
              : '';
        return (
          <div className={`last-entry-cell ${highlightClass}`}>
            <div>{record.lastEntry.name}</div>
            <div>{record.lastEntry.datetime}</div>
          </div>
        );
      }
    },
    {
      title: '',
      key: 'action',
      render: () => <Button type="text" icon={<EyeOutlined />} />
    }
  ];

  return (
    <Wrapper>
      <Meta title="Facility Management" />
      <HeaderToolbar
        title="View Facility Management"
        backBtn={true}
        button={
          <div className="button-wrap">
            <Button shape="round">Inactivate</Button>
            <Button type="primary" shape="round" icon={<EditIcon />}>
              Edit
            </Button>
          </div>
        }
      />
      <ShadowPaper>
        <h2>Company details</h2>
        <ul className="company-info-container">
          <li>
            <div className="info-item-wrap">
              <div className="icon">
                <FacilityIcon />
              </div>
              <div className="label">Facility Name</div>
            </div>
            <div className="value">CryoSystems ArcticCore V10</div>
          </li>
          <li>
            <div className="info-item-wrap">
              <AuditOutlined className="icon" />
              <div className="label">Company name</div>
            </div>
            <div className="value">The agile academy</div>
          </li>
          <li>
            <div className="info-item-wrap">
              <ClockCircleOutlined className="icon" />
              <div className="label">Timezone</div>
            </div>
            <div className="value">EST</div>
          </li>
          <li className="address">
            <div className="info-item-wrap">
              <EnvironmentOutlined className="icon" />
              <div className="label">Address</div>
            </div>
            <div className="value">123 Main Street, Apartment 4B, New York, NY10001 USA</div>
          </li>
        </ul>
      </ShadowPaper>
      <ShadowPaper>
        <div className="viewHeader">
          <h2>Chillers</h2>
        </div>
        <CommonTable
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={false}
          bordered
          className="facility-table"
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default ViewFacility;
