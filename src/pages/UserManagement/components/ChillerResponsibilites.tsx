import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { EyeOutlined } from '@ant-design/icons';
import { TablePaginationConfig, Tag } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import dayjs from 'dayjs';

import { chillerHooks } from '@/services/chiller';
import { IChillerAllList } from '@/services/chiller/types';
import { ICommonPagination } from '@/services/common/types';

import { CommonTable } from '@/shared/components/common/Table';
import EmptyState from '@/shared/components/common/Table/EmptyState';
import { ALERT_TYPE, getDefaultLogs } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';
import { capitalizeFirstLetter, getSortOrder } from '@/shared/utils/functions';

import { Wrapper } from '../style';

interface IProps {
  facilityIds: string[] | [];
  chillerIds: string[] | [];
  setChillerIds: React.Dispatch<React.SetStateAction<string[] | []>>;
  companyName?: string;
  form: any;
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
  companyName,
  form
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
      dataIndex: 'effLoss',
      key: 'effLoss',
      sorter: true,
      render: (_: any, record: IChillerAllList) => {
        let className = '';
        if (record?.latestLog?.effLoss?.type === ALERT_TYPE.ALERT) className = 'bgRed';
        if (record?.latestLog?.effLoss?.type === ALERT_TYPE.WARNING) className = 'bgYellow';

        return (
          <div className={`loss-cell ${className}`}>{record?.latestLog?.effLoss?.value ?? '-'}</div>
        );
      }
    },
    {
      title: 'Energy Cost $',
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
      title: 'Last Log Entry',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: true,
      render: (_: any, record: IChillerAllList) => {
        return (
          <div className={`last-entry-cell`}>
            <div>
              {(record?.latestLog?.updatedByUser?.firstName || '') +
                ' ' +
                (record?.latestLog?.updatedByUser?.lastName || '')}
            </div>
            <div>
              {record?.latestLog?.updatedAt
                ? dayjs(record?.latestLog?.updatedAt).format('MM/DD/YY HH:mm')
                : '-'}
            </div>
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
          onChange: (selectedRowKeys: any) => {
            form.resetFields(['notifyBy', 'general', 'logs']);
            form.setFieldValue('logs', getDefaultLogs());
            form.setFieldValue('programFacility', null);
            form.setFieldValue('programOperator', null);
            setChillerIds(selectedRowKeys);
          },
          preserveSelectedRowKeys: true // <-- Important!
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
