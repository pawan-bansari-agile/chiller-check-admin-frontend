import { defaultQueryOptions } from '@/shared/constants';
import { useApiQuery } from '@/shared/hooks/masterHook';
import { IApiSuccess } from '@/shared/types';

import { ICommonPagination } from '../common/types';
import apiInstance from '../interceptor';
import { INotificationListRes } from './types';

const apiEndPoints = {
  getCount: 'notifications/getCount',
  readNotification: 'notifications/readNotifications',
  notificationList: 'notifications/list'
};

export const notificationQueryKey = {
  all: ['notification'] as const,
  noptificationList: (args: ICommonPagination) => [
    ...notificationQueryKey.all,
    'noptificationList',
    args
  ]
};

export const notificationApi = {
  async getNotificationsList(data: ICommonPagination): Promise<INotificationListRes> {
    return apiInstance
      .post(apiEndPoints.notificationList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async getCount(): Promise<{
    totalUnReadNotification: number;
    totalReadNotificationOpen: number;
  }> {
    return apiInstance
      .get(apiEndPoints.getCount)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async readNotification(): Promise<IApiSuccess<any>> {
    return apiInstance
      .get(apiEndPoints.readNotification)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

export const notificationHooks = {
  NotificationList: (args: ICommonPagination) => {
    return useApiQuery(
      notificationQueryKey.noptificationList(args),
      () => notificationApi.getNotificationsList(args),
      defaultQueryOptions
    );
  }
};
