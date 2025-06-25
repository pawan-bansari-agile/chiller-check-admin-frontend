import React from 'react';

import { Link } from 'react-router-dom';

import {
  AuditOutlined,
  BankOutlined,
  CalendarOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  NotificationOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Input, MenuProps, Space, Tag } from 'antd';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import Details from '@/shared/components/common/Details';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { ROUTES } from '@/shared/constants/routes';
import { EditIcon, FacilityIcon, SettingIcon, User } from '@/shared/svg';
import { toAbsoluteUrl } from '@/shared/utils/functions';

import { Wrapper } from '../style';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

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

const roleItems: MenuProps['items'] = [
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
    title: 'User',
    dataIndex: 'user',
    key: 'user',
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
    title: 'Role',
    key: 'role',
    dataIndex: 'role'
  },
  {
    title: 'Email Address',
    key: 'emailAddress',
    dataIndex: 'emailAddress'
  },
  {
    title: 'Phone Number',
    key: 'phoneNumber',
    dataIndex: 'phoneNumber'
  },
  {
    title: 'Company Name',
    key: 'companyName',
    dataIndex: 'companyName'
  },
  {
    title: 'Facilities',
    key: 'facilities',
    dataIndex: 'facilities'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => (
      <Tag className="statusTag" color={statusColorMap[status] || 'default'}>
        {status}
      </Tag>
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
        <Link className="actionIcon" to={ROUTES.NOTIFICATION}>
          <EyeOutlined />
        </Link>
      </div>
    )
  }
];

const data: ReportRow[] = [
  {
    role: 'admin',
    emailAddress: 'xyz@xyz.com',
    phoneNumber: '+1 203 125 9988',
    companyName: 'The Agile Info',
    facilities: 'CryoSystems ArcticCore V10',
    status: 'Active'
  }
];

interface ReportRow {
  role: string;
  emailAddress: string;
  phoneNumber: string;
  companyName: string;
  facilities: string;
  status: string;
}

const statusColorMap: Record<string, string> = {
  Active: '#00A86B',
  Inactive: '#CF5439'
};

const chartData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'East Coast',
      data: [4.5, 10, 7.5, 5.75, 10.5, 6, 5.5],
      fill: true,
      backgroundColor: 'rgba(240, 74, 36, 0.1)',
      borderColor: '#F04924',
      pointBackgroundColor: '#F04924',
      tension: 0.4
    },
    {
      label: 'West Coast',
      data: [6.5, 5.8, 10.7, 5.2, 7.5, 16, 4.8],
      fill: true,
      backgroundColor: 'rgba(30, 64, 175, 0.1)',
      borderColor: '#1E40AF',
      pointBackgroundColor: '#1E40AF',
      tension: 0.4
    }
  ]
};

const options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.dataset.label}: ${context.parsed.y}`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5
      }
    }
  }
};

const ViewReport: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Reports" />
      <HeaderToolbar
        title="Build Reports"
        backBtn={true}
        button={
          <div className="viewButtonWrap">
            <Button className="title-cancel-btn">
              Export{' '}
              <i>
                <DownOutlined />
              </i>
            </Button>
            <Button type="primary" className="title-btn" size="small" icon={<EditIcon />}>
              Edit
            </Button>
          </div>
        }
      />

      <div className="shadowPaperWrap">
        <ShadowPaper>
          <p className="headerFooterViewContent">
            This information is confidential. Please make sure you not to share it with anyone else.
          </p>
        </ShadowPaper>

        <ShadowPaper>
          <ul className="reportDetailsList">
            <Details
              detailsTitle="Report name"
              detailsDescription="Chiller Performance Overview"
              detailsIcon={<AuditOutlined />}
            />
            <Details
              detailsTitle="Start Date and End Date"
              detailsDescription="Last 6 Months"
              detailsIcon={<CalendarOutlined />}
            />
            <Details
              detailsTitle="Automated Notification"
              detailsDescription="Web & Email"
              detailsIcon={<NotificationOutlined />}
            />
            <Details
              detailsTitle="Parameter"
              detailsDescription="Con. Inlet Temp"
              detailsIcon={<SettingIcon />}
            />
            <Details
              detailsTitle="Company"
              detailsDescription="Agile tech info | John tech hub"
              detailsIcon={<BankOutlined />}
            />
            <Details
              detailsTitle="Facilities"
              detailsDescription="Bldg A, Bldg B, Bldg C, Bldg D"
              detailsIcon={<FacilityIcon />}
            />
            <Details
              detailsTitle="Report Owner"
              detailsDescription="Doe John"
              detailsIcon={<User />}
            />
            <Details
              detailsTitle="Description"
              detailsDescription="Lorem ipsum lorem ipsum Lorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem "
              detailsIcon={<ExclamationCircleOutlined />}
              className="descriptionDetails"
            />
          </ul>
        </ShadowPaper>

        <ShadowPaper>
          <div className="reportLineChart">
            <Line data={chartData} options={options} height={80} />
          </div>
        </ShadowPaper>

        <ShadowPaper>
          <div className="reportContentHeader">
            <div className="dropdownWrap">
              <h2 className="notifyUser">Notify Users [10]</h2>
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

              <Dropdown menu={{ items: roleItems }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Select Role
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <Input
              className="searchReport"
              placeholder="Search for User"
              prefix={<SearchOutlined />}
            />
          </div>
          <CommonTable columns={columns} dataSource={data} pagination={{ current: 6 }} />
        </ShadowPaper>

        <ShadowPaper>
          <p className="headerFooterViewContent">
            This information is confidential. Please make sure you not to share it with anyone else.
          </p>
        </ShadowPaper>
      </div>
    </Wrapper>
  );
};

export default ViewReport;
