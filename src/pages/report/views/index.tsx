import React from 'react';

import { Link } from 'react-router-dom';

import { DownOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, MenuProps, Space } from 'antd';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon } from '@/shared/svg';
import { toAbsoluteUrl } from '@/shared/utils/functions';

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

const parameterItems: MenuProps['items'] = [
  {
    label: <span>Admin</span>,
    key: 'Admin'
  },
  {
    label: <span>Corporate Manager</span>,
    key: 'Corporate Manager'
  },
  {
    label: <span>Facility Manager</span>,
    key: 'Facility Manager'
  },
  {
    label: <span>Operator</span>,
    key: 'Operator'
  }
];

const columns = [
  {
    title: 'Report Name',
    key: 'reportName',
    dataIndex: 'reportName',
    sorter: (a: any, b: any) => a.reportName - b.reportName
  },
  {
    title: 'Facility',
    key: 'facility',
    dataIndex: 'facility',
    sorter: (a: any, b: any) => a.facility - b.facility
  },
  {
    title: 'Parameter',
    key: 'parameter',
    dataIndex: 'parameter',
    sorter: (a: any, b: any) => a.parameter - b.parameter
  },
  {
    title: 'Date Range',
    key: 'dateRange',
    dataIndex: 'dateRange',
    sorter: (a: any, b: any) => a.dateRange - b.dateRange
  },
  {
    title: 'Notify By',
    key: 'notifyBy',
    dataIndex: 'notifyBy',
    sorter: (a: any, b: any) => a.notifyBy - b.notifyBy
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
    render: () => (
      <>
        <span>12/11/24</span>
        <b className="time">15:53</b>
      </>
    )
  },
  {
    title: 'Updated By',
    dataIndex: 'updatedBy',
    key: 'updatedBy',
    width: 200,
    render: () => (
      <div className="updateUser">
        <figure>
          <img src={toAbsoluteUrl('/public/icons/header-logo.svg')} alt="user" />
        </figure>
        <h4>Joey Tribiyani</h4>
      </div>
    )
  },
  {
    title: '',
    key: 'action',
    render: () => (
      <div className="actionIonWrap">
        <Link className="actionIcon" to={ROUTES.EDIT_REPORT}>
          <EditIcon />
        </Link>
        <Link className="actionIcon" to={ROUTES.VIEW_REPORT}>
          <EyeOutlined />
        </Link>
      </div>
    )
  }
];

const data = [
  {
    reportName: 'Chiller Performance Overview',
    facility: 'CryoSystems ArcticCore V10',
    parameter: 'Percentage Loss',
    dateRange: 'Last Week',
    notifyBy: 'Web & Email',
    updateAt: ''
  }
];

const Report: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Reports" />
      <HeaderToolbar
        title="Reports"
        button={
          <Link to={ROUTES.ADD_REPORT}>
            <Button type="primary" className="title-btn" size="small" icon={<PlusOutlined />}>
              Create Report
            </Button>
          </Link>
        }
      />
      <ShadowPaper>
        <div className="reportContentHeader">
          <div className="dropdownWrap">
            <Dropdown menu={{ items: parameterItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Select Parameters
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>

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
          <Input className="searchReport" placeholder="Search report" prefix={<SearchOutlined />} />
        </div>
        <CommonTable
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={data}
          pagination={{ current: 6 }}
        />
      </ShadowPaper>
    </Wrapper>
  );
};

export default Report;
