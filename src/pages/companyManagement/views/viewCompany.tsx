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

import { chillerQueryKeys } from '@/services/chiller';
import { companyHooks, companyQueryKeys } from '@/services/company';
import { Chiller, Facility } from '@/services/company/types';
import { facilityQueryKeys } from '@/services/facility';
import { userQueryKeys } from '@/services/user';

import { authStore } from '@/store/auth';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { USER_ROLES, statusType } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { ChillerIcon, EditIcon, FacilityIcon, OperatorIcon } from '@/shared/svg';
import { capitalizeFirstLetter, hasPermission, showToaster } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const statusColorMap: Record<string, string> = {
  active: '#00A86B',
  inactive: '#CF5439',
  demo: '#D5A513',
  prospect: '#00077B',
  pending: '#00077B'
};

const getStatusColor = (status: string) => statusColorMap[status?.toLowerCase()] || 'default';

const renderAddress = ({ address1 = '', address2 = '' }: Facility) => {
  if (address1 && address2) return `${address2}, ${address1}`;
  return address2 || address1 || '-';
};

const ViewCompany: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = authStore((state) => state);
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
        showToaster('success', res?.data || 'Company Status Updated.');
        queryClient.invalidateQueries({ queryKey: facilityQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: chillerQueryKeys.all });
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
      width: 130
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
      width: 100
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
      dataIndex: 'isActive',
      key: 'isActive',
      render: (status: boolean) => (
        <Tag className="statusTag" color={getStatusColor(status ? 'active' : 'inactive')}>
          {status ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    ...(hasPermission('facility', 'view')
      ? [
          {
            title: '',
            key: '_id',
            dataIndex: '_id',
            render: (value: string) => (
              <div className="actionIonWrap">
                <div
                  className="actionIcon"
                  onClick={() => navigate(ROUTES.View_FACILITY_MANAGEMENT(value))}
                >
                  <EyeOutlined />
                </div>
              </div>
            )
          }
        ]
      : [])
  ];

  const chillerColumns: ColumnsType<Chiller> = [
    {
      title: 'Facility',
      key: 'facility',
      dataIndex: 'facility',
      render: (facility: Facility) => <b>{facility?.name || '-'}</b>
    },
    {
      title: 'Chiller Name',
      key: 'ChillerNo',
      dataIndex: 'ChillerNo',
      render: (value: string, record: Chiller) => (
        <div className="chillerNameWrap">
          <a className="chillerName">{record?.make + ' ' + record?.model}</a>
          <span>{value}</span>
        </div>
      )
    },
    {
      title: 'Efficiency Rating (kw/ton)',
      key: 'efficiencyRating',
      width: 180,
      dataIndex: 'efficiencyRating',
      render: (value: number) => value ?? '-'
    },
    {
      title: 'Energy Cost',
      key: 'energyCost',
      dataIndex: 'energyCost'
    },
    {
      title: 'Avg. Load Profile(%)',
      key: 'avgLoadProfile',
      dataIndex: 'avgLoadProfile'
    },
    {
      title: 'Operation Hours (W)',
      key: 'weeklyHours',
      dataIndex: 'weeklyHours'
    },
    {
      title: 'Assigned To',
      key: 'totalOperators',
      dataIndex: 'totalOperators'
    },
    {
      title: 'Efficiency Loss %',
      key: 'efficiencyLoss',
      width: 160,
      render: () => {
        const record = {
          efficiencyLoss: 40
        };
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
      width: 170,
      render: () => {
        const record = {
          efficiencyLoss: 40
        };
        let className = '';
        if (record.efficiencyLoss >= 50) className = 'bgRed';
        else if (record.efficiencyLoss >= 44) className = 'bgYellow';

        return <div className={`loss-cell ${className}`}>{record.efficiencyLoss}</div>;
      }
    },
    {
      title: 'Evap. App. Loss %',
      key: 'evapLoss',
      width: 170,
      dataIndex: 'evapLoss',
      render: () => {
        const record = {
          efficiencyLoss: 40
        };
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
      render: () => {
        const record = {
          efficiencyLoss: 40
        };
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
      render: () => {
        const record = {
          efficiencyLoss: 40
        };
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
      render: (status: string) =>
        status ? (
          <Tag className="statusTag" color={statusColorMap[status?.toLowerCase()] || 'default'}>
            {capitalizeFirstLetter(status)}
          </Tag>
        ) : (
          '-'
        )
    },
    {
      title: 'Last Entry',
      key: 'lastEntry',
      width: 200,
      render: () => {
        const record = {
          efficiencyLoss: 40,
          lastEntry: {
            name: 'Monica Geller',
            datetime: '12/11/24 15:00'
          }
        };
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
    ...(hasPermission('chiller', 'view') || userData?.role === USER_ROLES.OPERATOR
      ? [
          {
            title: '',
            key: '_id',
            dataIndex: '_id',
            render: (value: string) => (
              <div className="actionIonWrap">
                <Link className="actionIcon" to={ROUTES.View_CHILLER_MANAGEMENT(value)}>
                  <EyeOutlined />
                </Link>
              </div>
            )
          }
        ]
      : [])
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
              hasPermission('company', 'toggleStatus') &&
              (data?.status === statusType.ACTIVE || data?.status === statusType.INACTIVE) && (
                <Button className="title-cancel-btn" onClick={() => setIsModalOpen(true)}>
                  {data?.status === statusType.ACTIVE ? 'Inactivate' : 'Activate'}
                </Button>
              )}
            {hasPermission('company', 'edit') && (
              <Button
                className="title-btn"
                type="primary"
                shape="round"
                onClick={() => navigate(ROUTES.Edit_COMPANY_MANAGEMENT(id!))}
                icon={<EditIcon />}
              >
                Edit
              </Button>
            )}
          </div>
        }
      />
      <div className="shadowWrap">
        <ShadowPaper>
          <div className="viewHeader">
            <h2 className="themeColor">Company Details</h2>
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
            <h2 className="themeColor">Facilities</h2>
          </div>
          <CommonTable
            columns={facilityColumns}
            dataSource={data?.facilities || []}
            pagination={false}
            scroll={{ x: 'max-content' }}
            className="facility-table"
            emptyText={
              <EmptyState
                isEmpty={!data?.facilities?.length}
                defaultDescription="No Facility Found"
              />
            }
          />
        </ShadowPaper>
        <ShadowPaper>
          <div className="viewHeader">
            <h2 className="themeColor">Chillers</h2>
          </div>
          <CommonTable
            columns={chillerColumns}
            dataSource={data?.chillers || []}
            pagination={false}
            scroll={{ x: 2600 }}
            className="view-falility-table"
            emptyText={
              <EmptyState isEmpty={!data?.chillers?.length} defaultDescription="No Chiller Found" />
            }
          />
        </ShadowPaper>
        <div className="viewButtonWrap extraActionButton">
          {!isLoading &&
            hasPermission('company', 'toggleStatus') &&
            (data?.status === statusType.ACTIVE || data?.status === statusType.INACTIVE) && (
              <Button className="title-cancel-btn" onClick={() => setIsModalOpen(true)}>
                {data?.status === statusType.ACTIVE ? 'Inactivate' : 'Activate'}
              </Button>
            )}
          {hasPermission('company', 'edit') && (
            <Button
              className="title-btn"
              type="primary"
              shape="round"
              onClick={() => navigate(ROUTES.Edit_COMPANY_MANAGEMENT(id!))}
              icon={<EditIcon />}
            >
              Edit
            </Button>
          )}
        </div>
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
