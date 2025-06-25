import React from 'react';

import { useNavigate } from 'react-router-dom';

import {
  AuditOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { Button, Tag } from 'antd';

import Details from '@/shared/components/common/Details';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { ChillerIcon, EditIcon, FacilityIcon, ScaleIcon } from '@/shared/svg';

import { Wrapper } from '../style';

const ViewFacility: React.FC = () => {
  const navigate = useNavigate();
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
        <div className="chillerNameWrap">
          <a className="chillerName">{record.chiller.name}</a>
          <span>{record.chiller.code}</span>
        </div>
      ),
      sorter: (a: any, b: any) => a.chillerName - b.chillerName
    },
    {
      title: 'Efficiency Loss %',
      key: 'efficiencyLoss',
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
      key: 'annualLoss',
      dataIndex: 'annualLoss',
      sorter: (a: any, b: any) => a.annualLoss - b.annualLoss
    },
    {
      title: 'Annual Subscription',
      key: 'subscription',
      dataIndex: 'subscription',
      sorter: (a: any, b: any) => a.subscription - b.subscription
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
            <div className="entryName">{record.lastEntry.name}</div>
            <div>{record.lastEntry.datetime}</div>
          </div>
        );
      }
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <div className="actionIonWrap">
          <div className="actionIcon" onClick={() => navigate('/chiller-management/view')}>
            <EyeOutlined />
          </div>
        </div>
      )
    }
  ];

  const statusColorMap: Record<string, string> = {
    Active: '#00A86B',
    Inactive: '#CF5439'
  };

  return (
    <Wrapper>
      <Meta title="Facility Management" />
      <HeaderToolbar
        title="View Facility Management"
        backBtn={true}
        button={
          <div className="viewButtonWrap">
            <Button className="title-cancel-btn">Inactivate</Button>
            <Button className="title-btn" type="primary" icon={<EditIcon />}>
              Edit
            </Button>
          </div>
        }
      />
      <div className="shadowPaperWrap">
        <ShadowPaper>
          <div className="viewFacilityHeader">
            <h2>Company details</h2>
          </div>
          <ul className="company-info-container">
            <Details
              detailsIcon={<FacilityIcon />}
              detailsTitle="Facility Name"
              detailsDescription="CryoSystems ArcticCore V10"
            />
            <Details
              detailsIcon={<AuditOutlined />}
              detailsTitle="Company name"
              detailsDescription="The agile academy"
            />
            <Details
              detailsIcon={<ClockCircleOutlined />}
              detailsTitle="Timezone"
              detailsDescription="EST"
            />
            <Details
              detailsIcon={<ScaleIcon />}
              detailsTitle="Altitude"
              detailsDescription="25 Feet"
            />
            <Details detailsIcon={<ChillerIcon />} detailsTitle="Chillers" detailsDescription="5" />
            <Details
              detailsIcon={<EnvironmentOutlined />}
              detailsTitle="Address"
              detailsDescription="123 Main Street, Apartment 4B, New York, NY10001 USA"
              className="address"
            />
          </ul>
        </ShadowPaper>
        <ShadowPaper>
          <div className="viewChillerFacilityHeader">
            <h2>Chillers</h2>
          </div>
          <CommonTable
            columns={columns}
            dataSource={data}
            pagination={false}
            className="facility-table"
          />
        </ShadowPaper>
      </div>
    </Wrapper>
  );
};

export default ViewFacility;
