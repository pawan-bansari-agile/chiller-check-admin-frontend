import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
  AuditOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Tag } from 'antd';
import dayjs from 'dayjs';

import { chillerQueryKeys } from '@/services/chiller';
import { LatestLog } from '@/services/chiller/types';
import { companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityHooks, facilityQueryKeys } from '@/services/facility';
import { ChillerData } from '@/services/facility/types';
import { logQueryKeys } from '@/services/log';
import { maintenanceQueryKey } from '@/services/maintenance';
import { reportQueryKey } from '@/services/report';
import { userQueryKeys } from '@/services/user';

import { authStore } from '@/store/auth';

import Details from '@/shared/components/common/Details';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { ALERT_TYPE, USER_ROLES } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { ChillerIcon, EditIcon, FacilityIcon, ScaleIcon } from '@/shared/svg';
import { capitalizeFirstLetter, hasPermission, showToaster } from '@/shared/utils/functions';

import { Wrapper } from '../style';

const statusColorMap: Record<string, string> = {
  active: '#00A86B',
  inactive: '#CF5439',
  demo: '#D5A513',
  prospect: '#00077B',
  pending: '#00077B'
};

const ViewFacility: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = authStore((state) => state);

  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data, isLoading } = facilityHooks.FacilityView(id ?? '');
  const { mutate: activeInactiveAction, isPending } = facilityHooks.useActiveInactiveFacility();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const renderClassName = () => (data?.isActive ? 'active' : 'inactive');

  const activeInactiveFacility = () => {
    const payload = {
      id: id || '',
      isActive: !data?.isActive
    };
    activeInactiveAction(payload, {
      onSuccess: (res) => {
        showToaster('success', res?.data || 'Facility Status Updated.');
        queryClient.invalidateQueries({ queryKey: facilityQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: chillerQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: logQueryKeys.all });
        queryClient.invalidateQueries({ queryKey: maintenanceQueryKey.all });
        queryClient.invalidateQueries({ queryKey: reportQueryKey.all });
        queryClient.invalidateQueries({ queryKey: dashboardQueryKey.all });

        setIsModalOpen(false);
      },
      onError: (err) => {
        showToaster('error', err?.message || err?.message?.[0] || 'Something went wrong');
      }
    });
  };

  const columns = [
    {
      title: 'Facility Name',
      key: 'facilityName',
      dataIndex: 'facilityName',
      render: () => data?.name || '-'
    },
    {
      title: 'Make / Model',
      key: 'chillerName',
      render: (_: any, record: ChillerData) => (
        <div className="chillerNameWrap">
          {record?.make && record?.model && (
            <a className="chillerName">{record?.make + ' ' + record?.model}</a>
          )}
          <span>{record?.ChillerNo || ''}</span>
        </div>
      )
    },
    {
      title: 'Efficiency Loss %',
      key: 'latestLog',
      dataIndex: 'latestLog',
      render: (data: LatestLog) => {
        let className = '';
        if (data?.effLoss?.type === ALERT_TYPE.ALERT) className = 'bgRed';
        if (data?.effLoss?.type === ALERT_TYPE.WARNING) className = 'bgYellow';

        return <div className={`loss-cell ${className}`}>{data?.effLoss?.value ?? '-'}</div>;
      }
    },
    // {
    //   title: '12 Mon. Loss $',
    //   key: 'annualLoss',
    //   dataIndex: 'annualLoss',
    //   render: () => '$1200'
    // },
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
      title: 'Last Log Entry',
      key: 'latestLog',
      dataIndex: 'latestLog',
      render: (data: LatestLog) => {
        return (
          <div className={`last-entry-cell`}>
            <div>
              {(data?.updatedByUser?.firstName || '') + ' ' + (data?.updatedByUser?.lastName || '')}
            </div>
            <div>{data?.updatedAt ? dayjs(data?.updatedAt).format('MM/DD/YY HH:mm') : '-'}</div>
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
                <div
                  className="actionIcon"
                  onClick={() => navigate(ROUTES.View_CHILLER_MANAGEMENT(value))}
                >
                  <EyeOutlined />
                </div>
              </div>
            )
          }
        ]
      : [])
  ];

  return (
    <Wrapper>
      <Meta title="Facility Management" />
      {isLoading && <Loader />}
      <HeaderToolbar
        title="View Facility Management"
        backBtn={true}
        button={
          <div className="viewButtonWrap">
            {!isLoading && hasPermission('facility', 'toggleStatus') && (
              <Button className="title-cancel-btn" onClick={() => setIsModalOpen(true)}>
                {data?.isActive ? 'Inactivate' : 'Activate'}
              </Button>
            )}
            {hasPermission('facility', 'edit') && (
              <Button
                onClick={() => navigate(ROUTES.Edit_FACILITY_MANAGEMENT(id!))}
                className="title-btn"
                type="primary"
                icon={<EditIcon />}
              >
                Edit
              </Button>
            )}
          </div>
        }
      />
      <div className="shadowPaperWrap">
        <ShadowPaper>
          <div className="viewFacilityHeader">
            <h2 className="themeColor">Facility Details</h2>
            <div className={`statusBedge ${renderClassName()}`}>
              {data?.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
          <ul className="company-info-container">
            <Details
              detailsIcon={<FacilityIcon />}
              detailsTitle="Facility Name"
              detailsDescription={data?.name || '-'}
            />
            <Details
              detailsIcon={<AuditOutlined />}
              detailsTitle="Company Name"
              detailsDescription={data?.companyName || '-'}
            />
            <Details
              detailsIcon={<ClockCircleOutlined />}
              detailsTitle="Timezone"
              detailsDescription={data?.timezone ?? '-'}
            />
            <Details
              detailsIcon={<ScaleIcon />}
              detailsTitle="Altitude"
              detailsDescription={data?.altitude + ' ' + capitalizeFirstLetter(data?.altitudeUnit)}
            />
            <Details
              detailsIcon={<ChillerIcon />}
              detailsTitle="Chillers"
              detailsDescription={data?.totalChiller ?? '-'}
            />
            <Details
              detailsIcon={<EnvironmentOutlined />}
              detailsTitle="Address"
              detailsDescription={data?.address ?? '-'}
              className="address"
            />
          </ul>
        </ShadowPaper>
        <ShadowPaper>
          <div className="viewChillerFacilityHeader">
            <h2 className="themeColor">Chillers</h2>
          </div>
          <CommonTable
            columns={columns}
            dataSource={data?.chillers || []}
            pagination={false}
            className="facility-table"
            emptyText={
              <EmptyState isEmpty={!data?.chillers?.length} defaultDescription="No Chiller Found" />
            }
          />
        </ShadowPaper>
        <div className="viewButtonWrap extraActionButton">
          {!isLoading && hasPermission('facility', 'toggleStatus') && (
            <Button className="title-cancel-btn" onClick={() => setIsModalOpen(true)}>
              {data?.isActive ? 'Inactivate' : 'Activate'}
            </Button>
          )}
          {hasPermission('facility', 'edit') && (
            <Button
              onClick={() => navigate(ROUTES.Edit_FACILITY_MANAGEMENT(id!))}
              className="title-btn"
              type="primary"
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
                {data?.isActive ? (
                  <ExclamationCircleOutlined style={{ color: '#FEBE00' }} />
                ) : (
                  <CheckSquareOutlined style={{ color: '#00A86B' }} />
                )}
              </i>
              <span className="main-title">
                {data?.isActive ? 'Inactivate Facility' : 'Activate Facility'}
              </span>
            </div>
          }
          onCancel={() => setIsModalOpen(false)}
        >
          <p>
            {data?.isActive
              ? `If a facility is inactivated, all the chillers under it will be inactivated but the users will remain active. The data of the log entries will remain as it is. Just new entries will now be prohibited.`
              : 'If the facility is activated back, the chillers under the facility will still remain inactive. The admin, company manager or facility manager will have to manually activate them.'}
          </p>
          <div className="modalFooter">
            <Button onClick={() => setIsModalOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button
              className="footerBtn"
              onClick={activeInactiveFacility}
              loading={isPending}
              disabled={isPending}
            >
              {data?.isActive ? 'Inactivate' : 'Activate'}
            </Button>
          </div>
        </CommonModal>
      )}
    </Wrapper>
  );
};

export default ViewFacility;
