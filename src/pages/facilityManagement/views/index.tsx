import React from 'react';

import { Link } from 'react-router-dom';

import { DownOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, MenuProps, Space } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable, TableSummaryCell } from '@/shared/components/common/Table';
import { ROUTES } from '@/shared/constants/routes';

import { Wrapper } from '../style';

const facilityData = [
  {
    companyName: 'Petal Grove Academy',
    facilityName: 'ChillTech ArcticCore V156',
    facilityAddress: '430 East 86th St, New York, NY 10028, United States',
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
    chillers: 15,
    operators: 15,
    facilityCode: 'HBK1010',
    status: 'Inactive',
    isAssigned: 'No'
  }
];

const columns = [
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName'
  },
  {
    title: 'Facility Name',
    dataIndex: 'facilityName',
    key: 'facilityName'
  },
  {
    title: 'Facility Address',
    dataIndex: 'facilityAddress',
    key: 'facilityAddress'
  },
  {
    title: 'Timezone',
    dataIndex: 'timezone',
    key: 'timezone'
  },
  {
    title: 'Chillers',
    dataIndex: 'chillers',
    key: 'chillers'
  },
  {
    title: 'Operators',
    dataIndex: 'operators',
    key: 'operators'
  },
  {
    title: 'Facility Code',
    dataIndex: 'facilityCode',
    key: 'facilityCode'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => (
      <span
        style={{
          backgroundColor: status === 'Active' ? '#00b96b' : '#f06548',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '12px'
        }}
      >
        {status}
      </span>
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
    render: () => (
      <>
        <button style={{ marginRight: 8 }}>✏️</button>
        <button>👁️</button>
      </>
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
            summaryRow={
              <>
                <TableSummaryCell index={0} colSpan={9} />
              </>
            }
          />
        </ShadowPaper>
      </div>
    </Wrapper>
  );
};

export default FacilityManagement;
