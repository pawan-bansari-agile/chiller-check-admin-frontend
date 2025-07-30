import React from 'react';

import { Link } from 'react-router-dom';

import { EyeOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { ROUTES } from '@/shared/constants/routes';
import { capitalizeFirstLetter, hasPermission } from '@/shared/utils/functions';

import { Wrapper } from '../style';

interface IProps {
  companyList?: any;
}

const statusColorMap: Record<string, string> = {
  active: '#00A86B',
  inactive: '#CF5439',
  demo: '#D5A513',
  prospect: '#00077B'
};

const ViewResponsibilitiesTab: React.FC<IProps> = ({ companyList }) => {
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Facilities',
      dataIndex: 'totalFacilities',
      key: 'totalFacilities'
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
    ...(hasPermission('company', 'view')
      ? [
          {
            title: 'Action',
            key: '_id',
            dataIndex: '_id',
            render: (id: string) => (
              <div className="actionIonWrap">
                {hasPermission('company', 'view') && (
                  <Link className="actionIcon" to={ROUTES.VIEW_COMPANY_MANAGEMENT(id)}>
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
      <h2 className="resposibilityTitle themeColor">Company</h2>
      <CommonTable
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={companyList}
        emptyText={
          <EmptyState isEmpty={!companyList?.length} defaultDescription="No Company Found" />
        }
      />
    </Wrapper>
  );
};

export default ViewResponsibilitiesTab;
