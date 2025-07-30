import React from 'react';

import { Link } from 'react-router-dom';

import { EyeOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { USER_ROLES } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { hasPermission } from '@/shared/utils/functions';

import { Wrapper } from '../style';
import ViewChillerResponsibilitiesTab from './ViewChillerTab';

interface IProps {
  facilityList?: any;
  role?: string;
  chillerList?: any;
  companyName?: string;
}

const ViewFacilityResponsibilitiesTab: React.FC<IProps> = ({
  facilityList,
  role,
  chillerList,
  companyName
}) => {
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      render: () => companyName || '-'
    },
    {
      title: 'Facility Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Chillers',
      dataIndex: 'totalChiller',
      key: 'totalChiller'
    },
    {
      title: 'Operators',
      dataIndex: 'totalOperators',
      key: 'totalOperators'
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (status: string) => (
        <Tag className="statusTag" color={status ? '#00A86B' : '#CF5439'}>
          {status ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    ...(hasPermission('facility', 'view')
      ? [
          {
            title: 'Action',
            key: '_id',
            dataIndex: '_id',
            render: (id: string) => (
              <div className="actionIonWrap">
                {hasPermission('facility', 'view') && (
                  <Link className="actionIcon" to={ROUTES.View_FACILITY_MANAGEMENT(id)}>
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
      <h2 className="resposibilityTitle themeColor">Facilities</h2>
      <CommonTable
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={facilityList}
        emptyText={
          <EmptyState isEmpty={!facilityList?.length} defaultDescription="No Facility Found" />
        }
      />
      {role === USER_ROLES.OPERATOR ? (
        <ViewChillerResponsibilitiesTab chillerList={chillerList} companyName={companyName} />
      ) : null}
    </Wrapper>
  );
};

export default ViewFacilityResponsibilitiesTab;
