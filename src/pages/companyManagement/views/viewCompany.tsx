import React, { useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  AuditOutlined,
  CheckSquareOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { companyHooks, companyQueryKeys } from '@/services/company';
import { Facility } from '@/services/company/types';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import { statusType } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { ChillerIcon, EditIcon, FacilityIcon, OperatorIcon } from '@/shared/svg';
import { capitalizeFirstLetter, showToaster } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const statusColorMap: Record<string, string> = {
  active: '#00A86B',
  inactive: '#CF5439',
  demo: '#D5A513',
  prospect: '#00077B'
};

const getStatusColor = (status: string) => statusColorMap[status] || 'default';

const renderAddress = ({ address1 = '', address2 = '' }: Facility) => {
  if (address1 && address2) return `${address2}, ${address1}`;
  return address2 || address1 || '-';
};

interface ChillerRow {
  facilityName: string;
  chiller: { name: string; code: string; link: string };
  efficiencyRating: number;
  energyCost: number;
  avgProfile: number;
  operationHour: number;
  assigned: number;
  efficiencyLoss: number;
  condLoss: number;
  evapLoss: number;
  nonCondLoss: number;
  otherLoss: number;
  status: string;
  lastEntry: { name: string; datetime: string; highlight?: 'red' | 'yellow' };
}

const ViewCompany: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data, isLoading } = companyHooks.CompanyView(id ?? '');
  const { mutate: activeInactiveAction, isPending } = companyHooks.useActiveInactiveCompany();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const renderClassName = () => data?.status ?? '';

  const activeInactiveCompany = () => {
    const payload = {
      id: id || '',
      status: data?.status === statusType.ACTIVE ? 'inactive' : 'active'
    };
    activeInactiveAction(payload, {
      onSuccess: (res) => {
        showToaster('success', res?.message);
        queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
        setIsModalOpen(false);
      },
      onError: (err) => {
        showToaster('error', err?.message || err?.message?.[0] || 'Something went wrong');
      }
    });
  };

  const facilityColumns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 50,
      render: (_: any, __: any, index: number) => index + 1
    },
    {
      title: 'Facility Name',
      dataIndex: 'name',
      key: 'name',
      width: 120
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 250,
      render: (_: any, record: Facility) => renderAddress(record)
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: 100
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      width: 100
    },
    {
      title: 'Zip Code',
      dataIndex: 'zipcode',
      key: 'zipcode',
      width: 90
    },
    {
      title: 'Altitude',
      dataIndex: 'altitude',
      key: 'altitude',
      width: 150,
      render: (_value: number, record: Facility) =>
        `${record?.altitude + ' ' + capitalizeFirstLetter(record?.altitudeUnit)}`
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
      dataIndex: 'totalChiller',
      key: 'totalChiller'
    },
    {
      title: '# Of Operators',
      dataIndex: 'totalOperators',
      key: 'totalOperators'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) =>
        status ? (
          <Tag className="statusTag" color={getStatusColor(status)}>
            {status}
          </Tag>
        ) : (
          '-'
        )
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <div className="actionIonWrap">
          <div className="actionIcon" onClick={() => navigate(ROUTES.View_FACILITY_MANAGEMENT)}>
            <EyeOutlined />
          </div>
        </div>
      )
    }
  ];

  const viewColumns: ColumnsType<any> = [
    {
      title: 'Facility',
      key: 'facilityName',
      dataIndex: 'facilityName',
      sorter: (a: any, b: any) => a.facilityName - b.facilityName,
      render: (facilityName: string) => <b>{facilityName}</b>
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
      title: 'Efficiency Rating (kw/ton)',
      key: 'efficiencyRating',
      width: 180,
      dataIndex: 'efficiencyRating',
      sorter: (a: any, b: any) => a.efficiencyRating - b.efficiencyRating
    },
    {
      title: 'Energy Cost',
      key: 'energyCost',
      dataIndex: 'energyCost',
      sorter: (a: any, b: any) => a.energyCost - b.energyCost
    },
    {
      title: 'Avg. Load Profile(%)',
      key: 'avgProfile',
      dataIndex: 'avgProfile',
      sorter: (a: any, b: any) => a.avgProfile - b.avgProfile
    },
    {
      title: 'Operation Hours (W)',
      key: 'operationHour',
      dataIndex: 'operationHour',
      sorter: (a: any, b: any) => a.operationHour - b.operationHour
    },
    {
      title: 'Assigned To',
      key: 'assigned',
      dataIndex: 'assigned',
      sorter: (a: any, b: any) => a.assigned - b.assigned
    },
    {
      title: 'Efficiency Loss %',
      key: 'efficiencyLoss',
      width: 160,
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
      width: 160,
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
      width: 160,

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
      width: 180,

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
      width: 160,

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
      width: 200,
      sorter: (a: any, b: any) => a.lastEntry - b.lastEntry,
      render: (_: any, record: ChillerRow) => {
        let className = '';
        if (record.efficiencyLoss >= 50) className = 'bgRed';
        else if (record.efficiencyLoss >= 44) className = 'bgYellow';
        return (
          <div className={`last-entry-cell ${className}`}>
            <div>{record.lastEntry.name}</div>
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
          <Link className="actionIcon" to={ROUTES.View_CHILLER_MANAGEMENT}>
            <EyeOutlined />
          </Link>
        </div>
      )
    }
  ];

  const viewData: ChillerRow[] = [
    {
      facilityName: 'BIdg #1',
      chiller: { name: 'CryoStream', code: 'CHL-983472-AQ', link: '#' },
      efficiencyRating: 12.36,
      energyCost: 1.23,
      avgProfile: 67.65,
      operationHour: 24,
      assigned: 3,
      efficiencyLoss: 50,
      condLoss: 29,
      evapLoss: 29,
      nonCondLoss: 29,
      otherLoss: 29,
      status: 'active',
      lastEntry: { name: 'Monica Geller', datetime: '12/11/24 15:00' }
    }
  ];

  return (
    <Wrapper>
      <Meta title="Company Management" />
      {isLoading && <Loader />}
      <HeaderToolbar
        title="View Company"
        backBtn={true}
        button={
          <div className="viewButtonWrap">
            {!isLoading &&
              (data?.status === statusType.ACTIVE || data?.status === statusType.INACTIVE) && (
                <Button className="title-cancel-btn" onClick={() => setIsModalOpen(true)}>
                  {data?.status === statusType.ACTIVE ? 'Inactivate' : 'Activate'}
                </Button>
              )}
            <Button
              className="title-btn"
              type="primary"
              shape="round"
              onClick={() => navigate(ROUTES.Edit_COMPANY_MANAGEMENT(id!))}
              icon={<EditIcon />}
            >
              Edit
            </Button>
          </div>
        }
      />
      <div className="shadowWrap">
        <ShadowPaper>
          <div className="viewHeader">
            <h2>Company Details</h2>
            <span className={`statusBedge ${renderClassName()}`}>
              {data?.status ? capitalizeFirstLetter(data?.status) : '-'}
            </span>
          </div>
          <ul className="company-info-container">
            <li>
              <div className="info-item-wrap">
                <AuditOutlined className="icon" />
                <div className="label">Corporate Name</div>
              </div>
              <div className="value">{capitalizeFirstLetter(data?.name)}</div>
            </li>
            <li>
              <div className="info-item-wrap">
                <GlobalOutlined className="icon" />
                <div className="label">Website</div>
              </div>

              <div className="value">
                <a href={`https://${data?.website}`} target="_blank" rel="noreferrer">
                  {data?.website || '-'}
                </a>
              </div>
            </li>
            <li>
              <div className="info-item-wrap">
                <div className="icon">
                  <FacilityIcon />
                </div>
                <div className="label">Facilities</div>
              </div>
              <div className="value">{data?.totalFacilities ?? '-'}</div>
            </li>
            <li>
              <div className="info-item-wrap">
                <div className="icon">
                  <ChillerIcon />
                </div>
                <div className="label">Chillers</div>
              </div>
              <div className="value">{data?.totalChiller ?? '-'}</div>
            </li>
            <li>
              <div className="info-item-wrap">
                <div className="icon">
                  <OperatorIcon />
                </div>
                <div className="label">Operators</div>
              </div>
              <div className="value">{data?.totalOperators ?? '-'}</div>
            </li>
            <li className="address">
              <div className="info-item-wrap">
                <EnvironmentOutlined className="icon" />
                <div className="label">Address</div>
              </div>
              <div className="value">{data?.address || '-'}</div>
            </li>
          </ul>
        </ShadowPaper>
        <ShadowPaper>
          <div className="viewHeader">
            <h2>Facilities</h2>
          </div>
          <CommonTable
            columns={facilityColumns}
            dataSource={data?.facilities}
            pagination={false}
            scroll={{ x: 'max-content' }}
            className="facility-table"
          />
        </ShadowPaper>
        <ShadowPaper>
          <div className="viewHeader">
            <h2>Chillers</h2>
          </div>
          <CommonTable
            columns={viewColumns}
            dataSource={viewData}
            pagination={false}
            scroll={{ x: 2600 }}
            className="view-falility-table"
          />
        </ShadowPaper>
      </div>
      {isModalOpen && (
        <CommonModal
          open={isModalOpen}
          closeIcon={true}
          closable={true}
          centered={true}
          maskClosable={false}
          className="InactiveModalWrap"
          title={
            <div className="modalTitleWrapper">
              <i>
                {data?.status === statusType.ACTIVE ? (
                  <ExclamationCircleOutlined style={{ color: '#FEBE00' }} />
                ) : (
                  <CheckSquareOutlined style={{ color: '#00A86B' }} />
                )}
              </i>
              <span className="main-title">
                {data?.status === statusType.ACTIVE ? 'Inactivate Company' : 'Activate Company'}
              </span>
            </div>
          }
          onCancel={() => setIsModalOpen(false)}
        >
          <p>
            {data?.status === statusType.ACTIVE
              ? `If a company is inactivated, all the facilities, chillers under it will be inactivated
            but the users will remain active. The data of the log entries will remain as it is. Just
            new entries will now be prohibited.`
              : 'If the company is activated back, the facilities, chillers under the company will still remain inactive. The user who has access to them will have to manually activate them.'}
          </p>
          <div className="modalFooter">
            <Button onClick={() => setIsModalOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button
              className="footerBtn"
              onClick={activeInactiveCompany}
              loading={isPending}
              disabled={isPending}
            >
              {data?.status === statusType.ACTIVE ? 'Inactivate' : 'Activate'}
            </Button>
          </div>
        </CommonModal>
      )}
    </Wrapper>
  );
};

export default ViewCompany;
