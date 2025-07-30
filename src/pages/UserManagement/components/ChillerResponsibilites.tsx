import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { EyeOutlined } from '@ant-design/icons';
import { TablePaginationConfig, Tag } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

import { chillerHooks } from '@/services/chiller';
import { ICommonPagination } from '@/services/common/types';

import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { ROUTES } from '@/shared/constants/routes';
import { capitalizeFirstLetter, getSortOrder } from '@/shared/utils/functions';

import { Wrapper } from '../style';

interface IProps {
  facilityIds: string[] | [];
  chillerIds: string[] | [];
  setChillerIds: React.Dispatch<React.SetStateAction<string[] | []>>;
  companyName?: string;
}

const statusColorMap: Record<string, string> = {
  active: '#00A86B',
  inactive: '#CF5439',
  demo: '#D5A513',
  prospect: '#00077B',
  pending: '#00077B'
};

const ChillerResponsibilitiesTab: React.FC<IProps> = ({
  facilityIds,
  chillerIds,
  setChillerIds,
  companyName
}) => {
  const [args, setArgs] = useState<ICommonPagination>({
    page: 1,
    limit: 10,
    sort_by: '',
    sort_order: '',
    facilityIds: []
  });

  const { data, isLoading } = chillerHooks.ChillerAllList(args);

  useEffect(() => {
    if (facilityIds?.length) {
      setArgs({
        page: 1,
        limit: 10,
        sort_by: '',
        sort_order: '',
        facilityIds: facilityIds
      });
    }
  }, [facilityIds]);

  useEffect(() => {
    if (!data?.chillerList) return;

    const availableChillerIds = data?.chillerList.map((chiller) => chiller._id);
    const filteredSelected = chillerIds?.filter((id) => availableChillerIds.includes(id));

    // Only update state if there's a difference
    if (filteredSelected.length !== chillerIds.length) {
      setChillerIds(filteredSelected);
    }
  }, [chillerIds, data?.chillerList, setChillerIds]);

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
      key: 'facilityName'
    },
    {
      title: 'Chiller Name',
      dataIndex: 'ChillerNo',
      key: 'ChillerNo'
    },
    {
      title: 'Eff. Loss',
      dataIndex: 'energyCost',
      key: 'energyCost',
      sorter: true,
      render: () => '-'
    },
    {
      title: 'Energy Cost',
      dataIndex: 'energyCost',
      key: 'energyCost',
      sorter: true
    },
    {
      title: 'Operators',
      dataIndex: 'totalOperators',
      key: 'totalOperators',
      sorter: true
    },
    {
      title: 'Last Entry',
      dataIndex: 'totalOperators',
      key: 'totalOperators',
      sorter: true,
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
      sorter: true,
      render: (status: string) =>
        status && typeof status === 'string' ? (
          <Tag className="statusTag" color={statusColorMap[status?.toLowerCase()] || 'default'}>
            {capitalizeFirstLetter(status)}
          </Tag>
        ) : (
          '-'
        )
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => (
        <div className="actionIonWrap">
          <Link className="actionIcon" to={ROUTES.View_CHILLER_MANAGEMENT(id)}>
            <EyeOutlined />
          </Link>
        </div>
      )
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    if (!Array.isArray(sorter)) {
      setArgs({
        ...args,
        page: pagination?.current ?? 1,
        limit: pagination?.pageSize ?? 10,
        sort_by: sorter?.order ? String(sorter?.field) : '',
        sort_order: getSortOrder(sorter?.order) || ''
      });
    }
  };

  return (
    <Wrapper>
      <h2 className="resposibilityTitle themeColor">Chillers</h2>
      <CommonTable
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={data?.chillerList || []}
        pagination={{
          current: args?.page ?? 1,
          pageSize: args?.limit ?? 10,
          total: data?.totalRecords ?? 0
        }}
        rowSelection={{
          selectedRowKeys: chillerIds,
          onChange: (selectedRowKeys: React.Key[]) => {
            setChillerIds(selectedRowKeys as string[]);
          }
        }}
        loading={isLoading}
        onChange={handleTableChange}
        emptyText={
          <EmptyState isEmpty={!data?.chillerList?.length} defaultDescription="No Chiller Found" />
        }
      />
    </Wrapper>
  );
};

export default ChillerResponsibilitiesTab;
