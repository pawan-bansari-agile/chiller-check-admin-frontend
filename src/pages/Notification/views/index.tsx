import React, { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Empty, Input, Pagination } from 'antd';
import dayjs from 'dayjs';

import { ICommonPagination } from '@/services/common/types';
import { notificationApi, notificationHooks } from '@/services/notification';
import { Data } from '@/services/notification/types';

import { useNotificationStore } from '@/store/notification';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import { ROUTES } from '@/shared/constants/routes';
import { debounce } from '@/shared/utils/functions';

import NotificationCard from '../component/NotificationCard';
import { Wrapper } from '../style';

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const [args, setArgs] = useState<ICommonPagination>({
    page: 1,
    limit: 10,
    search: '',
    sort_by: '',
    sort_order: ''
  });

  const { data, isLoading, refetch } = notificationHooks.NotificationList(args);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await notificationApi.readNotification();
        if (res) {
          await notificationApi
            .getCount()
            .then((res) => {
              useNotificationStore.getState().setCount(res?.totalUnReadNotification ?? 0);
            })
            .catch(() => {
              return;
            });
        }
      } catch {
        return;
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const updateSearch = debounce((value: string) => {
    setArgs((prevArgs) => ({ ...prevArgs, search: value, page: 1 }));
  });

  const handleRangeChange = (dates: any) => {
    if (!dates || dates.length === 0) {
      setArgs((prev) => ({ ...prev, page: 1, startDate: undefined, endDate: undefined }));
      return;
    }

    const [start, end] = dates;

    const startDate = start.startOf('day');
    const endDate = end.endOf('day');
    setArgs((prev) => ({
      ...prev,
      page: 1,
      startDate: startDate.format('MM-DD-YYYY'),
      endDate: endDate.format('MM-DD-YYYY')
    }));
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setArgs((prev) => ({
      ...prev,
      page,
      limit: pageSize || prev.limit
    }));
  };

  const handleNotificationClick = (data: Data) => {
    const routeMap: Record<string, (id: string) => string> = {
      companyId: ROUTES.VIEW_COMPANY_MANAGEMENT,
      facilityId: ROUTES.View_FACILITY_MANAGEMENT,
      chillerId: ROUTES.View_CHILLER_MANAGEMENT,
      userId: ROUTES.VIEW_USER_MANAGEMENT,
      reportId: ROUTES.VIEW_REPORT
    };

    for (const key in routeMap) {
      const id = (data as any)[key];
      if (id) {
        navigate(routeMap[key](id));
        break;
      }
    }
  };

  return (
    <Wrapper>
      {isLoading && <Loader />}
      <Meta title="Notification" />
      <HeaderToolbar title="Notification" backBtn={true} backTo={ROUTES.DASHBOARD} />
      <div className="timelineContentHeader">
        <RangePicker
          showTime={false}
          className="timelineRangePicker"
          format="MM-DD-YYYY"
          onChange={handleRangeChange}
        />
        <Input
          className="searchTimeline"
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateSearch(e.target.value)}
        />
      </div>
      <ul>
        {data?.list?.length ? (
          data?.list?.map(({ title, message, createdAt, data }, index) => {
            return (
              <NotificationCard
                key={index + createdAt}
                onClick={() => handleNotificationClick(data)}
                notificationTitle={title || '-'}
                notificationDate={createdAt ? dayjs(createdAt).format('MM/DD/YY - HH:mm') : ''}
                notificationDescription={message || ''}
              />
            );
          })
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No notifications" />
        )}
      </ul>
      {data?.totalRecords && data?.totalRecords > 0 ? (
        <Pagination
          className="notification-table notification-pagination"
          current={args.page || 1}
          pageSize={args.limit || 10}
          total={data.totalRecords || 0}
          showSizeChanger
          showQuickJumper
          onChange={handlePageChange}
          // style={{ margin: '0 16', textAlign: 'right' }}
          showTotal={(total) => `Total ${total} items`}
        />
      ) : null}
    </Wrapper>
  );
};

export default Notification;
