import React from 'react';

import { Link } from 'react-router-dom';

import {
  DownOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Button, Checkbox, Dropdown, Input, MenuProps, Space } from 'antd';

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

const chillerItems: MenuProps['items'] = [
  {
    label: <span>CryoStream</span>,
    key: 'CryoStream'
  },
  {
    label: <span>CryoStream</span>,
    key: 'CryoStream'
  }
];

const columns = [
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
    width: 200,
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
    title: 'Chiller Name',
    key: 'chillerName',
    width: 165,
    render: () => (
      <div className="chillerNameWrap">
        <a className="chillerName">CryoStream</a>
        <span>CHL-983472-AQ</span>
      </div>
    ),
    sorter: (a: any, b: any) => a.chillerName - b.chillerName
  },
  {
    title: 'Make & Model',
    key: 'makeModel',
    dataIndex: 'makeModel',
    width: 165,
    sorter: (a: any, b: any) => a.makeModel - b.makeModel,
    render: () => (
      <>
        <h6 className="makeName">CryoSystems</h6>
        <span>ArcticCore V10</span>
      </>
    )
  },
  {
    title: 'Category',
    key: 'category',
    dataIndex: 'category',
    sorter: (a: any, b: any) => a.category - b.category
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
    sorter: (a: any, b: any) => a.type - b.type
  },
  {
    title: 'Operator Notes',
    key: 'operatorNotes',
    dataIndex: 'operatorNotes',
    sorter: (a: any, b: any) => a.operatorNotes - b.operatorNotes
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 165,
    sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
    render: () => (
      <>
        <span>12/11/24</span>
        <b className="time">15:53</b>
      </>
    )
  },
  ...(hasPermission('maintenance', 'edit') || hasPermission('maintenance', 'view')
    ? [
        {
          title: '',
          key: 'action',
          render: () => (
            <div className="actionIonWrap">
              {hasPermission('maintenance', 'edit') && (
                <Link className="actionIcon" to={ROUTES.EDIT_MAINTENANCE}>
                  <EditIcon />
                </Link>
              )}
              {hasPermission('maintenance', 'view') && (
                <Link className="actionIcon" to={ROUTES.VIEW_MAINTENANCE}>
                  <EyeOutlined />
                </Link>
              )}
            </div>
          )
        }
      ]
    : [])
];

const data = [
  {
    selectAll: '',
    makeModel: '',
    category: 'Major Stop Inspection (Com.)',
    type: 'Suspendisse augue',
    operatorNotes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    updatedAt: ''
  }
];

const MaintenanceRecord: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Maintenance Records" />
      <HeaderToolbar
        title="Maintenance Records"
        button={
          <div className="maintenanceButtonWrap">
            {hasPermission('maintenance', 'view') && (
              <Button type="primary" className="title-btn" size="small" icon={<UploadOutlined />}>
                Export (2)
              </Button>
            )}
            {hasPermission('maintenance', 'add') && (
              <Button type="primary" className="title-btn" icon={<PlusOutlined />}>
                <Link to={ROUTES.ADD_MAINTENANCE}>Add Log</Link>
              </Button>
            )}
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

            <Dropdown menu={{ items: chillerItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Select Chiller
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <Input
            className="searchChiller"
            placeholder="Search for Chiller"
            prefix={<SearchOutlined />}
          />
        </div>
        <CommonTable scroll={{ x: 1000 }} columns={columns} dataSource={data} />
      </ShadowPaper>
    </Wrapper>
  );
};

export default MaintenanceRecord;
