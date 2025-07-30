import React from 'react';

import { Link } from 'react-router-dom';

import { EyeOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import { authStore } from '@/store/auth';

import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { USER_ROLES } from '@/shared/constants';
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
      dataIndex: 'totalOperators',
      key: 'totalOperators',
      render: () => '-'
    },
    {
      title: 'Energy Cost',
      dataIndex: 'energyCost',
      key: 'energyCost'
    },
    {
      title: 'Operators',
      dataIndex: 'totalOperators',
      key: 'totalOperators'
    },
    {
      title: 'Last Entry',
      dataIndex: 'totalOperators',
      key: 'totalOperators',
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
