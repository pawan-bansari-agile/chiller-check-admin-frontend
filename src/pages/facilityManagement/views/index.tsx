import React from 'react';

import { Link } from 'react-router-dom';

import { DownOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, MenuProps, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon } from '@/shared/svg';

import { Wrapper } from '../style';

const facilityData = [
  {
    companyName: 'Petal Grove Academy',
    facilityName: 'ChillTech ArcticCore V156',
    facilityAddress: '430 East 86th St, New York, NY 10028, United States',
    altitude: '10 Feet',
    timezone: 'EST',
    chillers: 3,
    operators: 3,
    facilityCode: 'HBK1006',
    status: 'Inactive',
    isAssigned: 'No'
  },
  {
    companyName: 'The agile infotech',
    facilityName: 'ChillTech ArcticCore V10',
    facilityAddress: '430 East 86th St, New York, NY 10028, United States',
    timezone: 'GMT',
    altitude: '10 Feet',

    chillers: 5,
    operators: 5,
    facilityCode: 'HBK1007',
    status: 'Inactive',
    isAssigned: 'Yes'
  },
  {
    companyName: 'Angel investor',
    facilityName: 'ChillTech ArcticCore V19',
    facilityAddress: '430 East 86th St, New York, NY 10028, United States',
    timezone: 'IST',
    altitude: '10 Feet',

    chillers: 5,
    operators: 5,
    facilityCode: 'HBK1008',
    status: 'Active',
    isAssigned: 'No'
  },
  {
    companyName: 'Petal Grove Academy',
    facilityName: 'CryoSystems ArcticCore V10',
    facilityAddress: '430 East 86th St, New York, NY 10028, United States',
    timezone: 'EST',
    altitude: '10 Feet',

    chillers: 10,
    operators: 10,
    facilityCode: 'HBK1009',
    status: 'Active',
    isAssigned: 'No'
  },
  {
    companyName: 'Angel investor',
    facilityName: 'ChillTech ArcticCore V156',
    facilityAddress: '430 East 86th St, New York, NY 10028, United States',
    timezone: 'GMT',
    altitude: '10 Feet',

    chillers: 15,
    operators: 15,
    facilityCode: 'HBK1010',
    status: 'Inactive',
    isAssigned: 'No'
  }
];

const statusColorMap: Record<string, string> = {
  Active: '#00A86B',
  Inactive: '#CF5439'
};

const columns: ColumnsType<any> = [
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
    width: 190
  },
  {
    title: 'Facility Name',
    dataIndex: 'facilityName',
    key: 'facilityName',
    width: 190
  },
  {
    title: 'Facility Address',
    dataIndex: 'facilityAddress',
    key: 'facilityAddress',
    width: 250
  },
  {
    title: 'Timezone',
    dataIndex: 'timezone',
    key: 'timezone',
    sorter: (a: any, b: any) => a.timezone - b.timezone
  },
  {
    title: 'Altitude',
    dataIndex: 'altitude',
    key: 'altitude',
    sorter: (a: any, b: any) => a.altitude - b.altitude
  },
  {
    title: 'Chillers',
    dataIndex: 'chillers',
    key: 'chillers',
    sorter: (a: any, b: any) => a.chillers - b.chillers
  },
  {
    title: 'Operators',
    dataIndex: 'operators',
    key: 'operators',
    sorter: (a: any, b: any) => a.operators - b.operators
  },
  {
    title: 'Facility Code',
    dataIndex: 'facilityCode',
    key: 'facilityCode',
    sorter: (a: any, b: any) => a.facilityCode - b.facilityCode,
    width: 190
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag className="statusTag" color={statusColorMap[status] || 'default'}>
        {status}
      </Tag>
    )
  },
  {
    title: 'Is Assigned',
    dataIndex: 'isAssigned',
    key: 'isAssigned'
  },
  {
    title: 'Actions',
    key: 'actions',
    dataIndex: 'actions',
    fixed: 'right',
    render: () => (
      <div className="actionIonWrap">
        <Link className="actionIcon" to={ROUTES.Edit_FACILITY_MANAGEMENT}>
          <EditIcon />
        </Link>
        <Link className="actionIcon" to={ROUTES.View_FACILITY_MANAGEMENT}>
          <EyeOutlined />
        </Link>
      </div>
    )
  }
];

const items: MenuProps['items'] = [
  {
    label: <span>Petal Grove Academy</span>,
    key: '0'
  },
  {
    label: <span>Angel investor</span>,
    key: '1'
  }
];

const FacilityManagement: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Facility Management" />
      <HeaderToolbar
        title="Facility management"
        button={
          <Link to={ROUTES.Add_FACILITY_MANAGEMENT}>
            <Button type="primary" className="title-btn" size="small" icon={<PlusOutlined />}>
              Add Facility
            </Button>
          </Link>
        }
      />
      <div>
        <ShadowPaper>
          <div className="facilityContentHeader">
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Select Company
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Input
              className="searchFacility"
              placeholder="Search for Facilities"
              prefix={<SearchOutlined color="red" />}
            />
          </div>
          <CommonTable
            columns={columns}
            dataSource={facilityData}
            pagination={{ current: 6 }}
            scroll={{ x: 1700 }}
          />
        </ShadowPaper>
      </div>
    </Wrapper>
  );
};

export default FacilityManagement;
