import { UseQueryOptions } from '@tanstack/react-query';
import apiInstance from 'services/interceptor';

import { useApiQuery } from '@/shared/hooks/masterHook';
import { IApiSuccess } from '@/shared/types';

import { IUserListReq, IUserListRes } from './types';

const ApiEndPoints = {
  list: `admin/user/list`,
  create: `admin/user`
};

export const userQueryKey = {
  all: ['user'],
  list: (args: IUserListReq) => [...userQueryKey.all, args],
  detail: (id: string) => [...userQueryKey.all, id]
};

// API
export const userAPI = {
  getUserList(data: IUserListReq): Promise<IUserListRes> {
    return apiInstance
      .post(ApiEndPoints.list, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  createUser(data: IUserListReq): Promise<IApiSuccess<unknown>> {
    return apiInstance.post(ApiEndPoints.create, data);
  }
};

// Hooks
export const userHooks = {
  UserList: (args: IUserListReq, queryOptions?: UseQueryOptions<any>) => {
    return useApiQuery(userQueryKey.list(args), () => userAPI.getUserList(args), {
      ...queryOptions
    });
  }
};
