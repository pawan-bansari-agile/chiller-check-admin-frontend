import React from 'react';

import { Link } from 'react-router-dom';

import { EyeOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import dayjs from 'dayjs';

import { LatestLog } from '@/services/chiller/types';

import { authStore } from '@/store/auth';

import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { ALERT_TYPE, USER_ROLES } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { capitalizeFirstLetter, hasPermission } from '@/shared/utils/functions';

import { Wrapper } from '../style';

interface IProps {
  chillerList?: any;
  companyName?: string;
}

const statusColorMap: Record<string, string> = {
  active: '#00A86B',
  inactive: '#CF5439',
  demo: '#D5A513',
  prospect: '#00077B',
  pending: '#00077B'
};

const ViewChillerResponsibilitiesTab: React.FC<IProps> = ({ chillerList, companyName }) => {
  const { userData } = authStore((state) => state);
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      render: () => companyName || '-'
    },
    {
      title: 'Facility Name',
      dataIndex: 'facilityName',
      key: 'facilityName',
      render: (record: any) => record?.name || '-'
    },
    {
      title: 'Chiller Name',
      dataIndex: 'ChillerNo',
      key: 'ChillerNo'
    },
    {
      title: 'Eff. Loss',
      dataIndex: 'latestLog',
      key: 'latestLog',
      render: (data: LatestLog) => {
        let className = '';
        if (data?.effLoss?.type === ALERT_TYPE.ALERT) className = 'bgRed';
        if (data?.effLoss?.type === ALERT_TYPE.WARNING) className = 'bgYellow';

        return <div className={`loss-cell ${className}`}>{data?.effLoss?.value ?? '-'}</div>;
      }
    },
    {
      title: 'Energy Cost $',
      dataIndex: 'energyCost',
      key: 'energyCost'
    },
    {
      title: 'Operators',
      dataIndex: 'totalOperators',
      key: 'totalOperators'
    },
    {
      title: 'Last Log Entry',
      dataIndex: 'latestLog',
      key: 'latestLog',
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
    ...(hasPermission('chiller', 'view') || userData?.role === USER_ROLES.OPERATOR
      ? [
          {
            title: 'Action',
            key: '_id',
            dataIndex: '_id',
            render: (id: string) => (
              <div className="actionIonWrap">
                {hasPermission('chiller', 'view') && (
                  <Link className="actionIcon" to={ROUTES.View_CHILLER_MANAGEMENT(id)}>
                    <EyeOutlined />
                  </Link>
                )}
              </div>
            )
          }
        ]
      : [])
  ];

  return (
    <Wrapper>
      <h2 className="chillerTitle themeColor">Chillers</h2>
      <CommonTable
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={chillerList}
        emptyText={
          <EmptyState isEmpty={!chillerList?.length} defaultDescription="No Chiller Found" />
        }
      />
    </Wrapper>
  );
};

export default ViewChillerResponsibilitiesTab;
