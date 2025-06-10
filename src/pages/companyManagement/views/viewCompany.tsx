import React from 'react';

import { AuditOutlined, EnvironmentOutlined, EyeOutlined, GlobalOutlined } from '@ant-design/icons';
import { Button, Tag, Tooltip } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { ChillerIcon, EditIcon, FacilityIcon, OperatorIcon } from '@/shared/svg';

import { Wrapper } from '../style';

const statusColorMap: Record<string, string> = {
  Active: 'green',
  Inactive: 'volcano'
};

const columns = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    width: 50
  },
  {
    title: 'Facility name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city'
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state'
  },
  {
    title: 'Zip code',
    dataIndex: 'zip',
    key: 'zip'
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country'
  },
  {
    title: 'Time Zone',
    dataIndex: 'timezone',
    key: 'timezone'
  },
  {
    title: '# Chillers',
    dataIndex: 'chillers',
    key: 'chillers'
  },
  {
    title: '# Of Operators',
    dataIndex: 'operators',
    key: 'operators'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => <Tag color={statusColorMap[status]}>{status}</Tag>
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <Tooltip title="View">
        <Button type="text" shape="circle" icon={<EyeOutlined />} />
      </Tooltip>
    )
  }
];

const data = [
  {
    key: 1,
    index: 1,
    name: 'Main Building',
    address: '430 East 86th St, New York, NY 10028, United States',
    city: 'New York',
    state: 'New York',
    zip: '10024',
    country: 'USA',
    timezone: 'EST',
    chillers: 1,
    operators: 1,
    status: 'Active'
  },
  {
    key: 2,
    index: 2,
    name: 'Back Building',
    address: '430 East 86th St, New York, NY 10028, United States',
    city: 'New York',
    state: 'New York',
    zip: '10024',
    country: 'USA',
    timezone: 'EST',
    chillers: 2,
    operators: 2,
    status: 'Active'
  },
  {
    key: 3,
    index: 3,
    name: 'Bldg 1',
    address: '430 East 86th St, New York, NY 10028, United States',
    city: 'Jersey City',
    state: 'New Jersey',
    zip: '07302',
    country: 'USA',
    timezone: 'EST',
    chillers: 3,
    operators: 3,
    status: 'Inactive'
  }
];

const viewColumns = [
  { title: 'Facility', dataIndex: 'facility', key: 'facility' },
  { title: 'Chiller Name', dataIndex: 'chiller', key: 'chiller' },
  { title: 'Efficiency Rating (kw/ton)', dataIndex: 'efficiencyRating', key: 'efficiencyRating' },
  { title: 'Energy Cost', dataIndex: 'energyCost', key: 'energyCost' },
  { title: 'Avg. Load Profile (%)', dataIndex: 'avgLoadProfile', key: 'avgLoadProfile' },
  { title: 'Operation Hours (W)', dataIndex: 'operationHours', key: 'operationHours' },
  { title: 'Assigned To', dataIndex: 'assignedTo', key: 'assignedTo' },
  { title: 'Efficiency Loss %', dataIndex: 'efficiencyLoss', key: 'efficiencyLoss' },
  { title: 'Cond. App. Loss %', dataIndex: 'condLoss', key: 'condLoss' },
  { title: 'Evap. App. Loss %', dataIndex: 'evapLoss', key: 'evapLoss' },
  { title: 'Non-Cond. Loss %', dataIndex: 'nonCondLoss', key: 'nonCondLoss' },
  { title: 'Other Losses %', dataIndex: 'otherLoss', key: 'otherLoss' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Last Entry', dataIndex: 'lastEntry', key: 'lastEntry' },
  { title: '', dataIndex: 'view', key: 'view' }
];

const viewData = [
  {
    key: '1',
    facility: 'Bldg #1',
    chiller: (
      <>
        <a>CryoStream</a>
        <div>CHL-983472-AQ</div>
      </>
    ),
    efficiencyRating: '12.36',
    energyCost: '1.23',
    avgLoadProfile: '67.65',
    operationHours: '24',
    assignedTo: '3',
    efficiencyLoss: '42',
    condLoss: '12',
    evapLoss: '12',
    nonCondLoss: '12',
    otherLoss: '12',
    status: <span className="badge badge-success">Active</span>,
    lastEntry: (
      <>
        <div>Monica Gellar</div>
        <div>12/11/24 15:00</div>
      </>
    ),
    view: <i className="icon-eye" />
  },
  {
    key: '2',
    facility: 'Bldg #1',
    chiller: (
      <>
        <a>FrostLine</a>
        <div>FST-764239-BX</div>
      </>
    ),
    efficiencyRating: '29.3',
    energyCost: '1.5',
    avgLoadProfile: '67.65',
    operationHours: '48',
    assignedTo: '3',
    efficiencyLoss: <span className="badge badge-danger">50</span>,
    condLoss: <span className="badge badge-danger">29</span>,
    evapLoss: <span className="badge badge-danger">29</span>,
    nonCondLoss: <span className="badge badge-danger">29</span>,
    otherLoss: <span className="badge badge-danger">29</span>,
    status: <span className="badge badge-success">Active</span>,
    lastEntry: (
      <span className="badge badge-danger">
        Joey Tribiyani <br /> 11/11/24 11:40
      </span>
    ),
    view: <i className="icon-eye" />
  },
  {
    key: '3',
    facility: 'Bldg #1',
    chiller: (
      <>
        <a>ArcticNova</a>
        <div>GLC-572148-MT</div>
      </>
    ),
    efficiencyRating: '31.36',
    energyCost: '1',
    avgLoadProfile: '67.65',
    operationHours: '50',
    assignedTo: '3',
    efficiencyLoss: '41.5',
    condLoss: '31',
    evapLoss: '31',
    nonCondLoss: '31',
    otherLoss: '31',
    status: <span className="badge badge-success">Active</span>,
    lastEntry: (
      <>
        <div>Chandler Bing</div>
        <div>10/11/24 16:00</div>
      </>
    ),
    view: <i className="icon-eye" />
  },
  {
    key: '4',
    facility: 'Bldg #1',
    chiller: (
      <>
        <a>IceCascade</a>
        <div>POL-394857-VZ</div>
      </>
    ),
    efficiencyRating: '17.64',
    energyCost: '1.5',
    avgLoadProfile: '67.65',
    operationHours: '60',
    assignedTo: '3',
    efficiencyLoss: <span className="badge badge-warning">44</span>,
    condLoss: <span className="badge badge-warning">17</span>,
    evapLoss: <span className="badge badge-warning">17</span>,
    nonCondLoss: <span className="badge badge-warning">17</span>,
    otherLoss: <span className="badge badge-warning">17</span>,
    status: <span className="badge badge-success">Active</span>,
    lastEntry: (
      <span className="badge badge-warning">
        Jennifer Lawrence <br /> 9/11/24 20:00
      </span>
    ),
    view: <i className="icon-eye" />
  },
  {
    key: '5',
    facility: 'Bldg #1',
    chiller: (
      <>
        <a>PolarZen</a>
        <div>CRY-685429-KQ</div>
      </>
    ),
    efficiencyRating: '16.24',
    energyCost: '1',
    avgLoadProfile: '67.65',
    operationHours: '24',
    assignedTo: '3',
    efficiencyLoss: '43',
    condLoss: '16',
    evapLoss: '16',
    nonCondLoss: '16',
    otherLoss: '16',
    status: <span className="badge badge-success">Active</span>,
    lastEntry: (
      <>
        <div>Eva Adams</div>
        <div>8/11/24 15:00</div>
      </>
    ),
    view: <i className="icon-eye" />
  }
];

const ViewCompany: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Company Management" />
      <HeaderToolbar
        title="View Company"
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
        <div className="viewHeader">
          <h2>Company details</h2>
          <span className="statusBedge active">Active</span>
        </div>
        <ul className="company-info-container">
          <li>
            <div className="info-item-wrap">
              <AuditOutlined className="icon" />
              <div className="label">Corporate name</div>
            </div>
            <div className="value">Petal Grove Academy</div>
          </li>
          <li>
            <div className="info-item-wrap">
              <GlobalOutlined className="icon" />
              <div className="label">Website</div>
            </div>
            <div className="value">www.chiller.io</div>
          </li>
          <li>
            <div className="info-item-wrap">
              <div className="icon">
                <FacilityIcon />
              </div>
              <div className="label">Facilities</div>
            </div>
            <div className="value">5</div>
          </li>
          <li>
            <div className="info-item-wrap">
              <div className="icon">
                <ChillerIcon />
              </div>
              <div className="label">Chillers</div>
            </div>
            <div className="value">5</div>
          </li>
          <li>
            <div className="info-item-wrap">
              <div className="icon">
                <OperatorIcon />
              </div>
              <div className="label">Operators</div>
            </div>
            <div className="value">5</div>
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
          <h2>Facilities</h2>
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
      <ShadowPaper>
        <CommonTable
          columns={viewColumns}
          dataSource={viewData}
          size="middle"
          pagination={false}
          bordered
          className="view-falility-table"
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default ViewCompany;
