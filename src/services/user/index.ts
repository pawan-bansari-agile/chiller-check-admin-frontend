import { UseMutationOptions } from '@tanstack/react-query';
import apiInstance from 'services/interceptor';

import { defaultQueryOptions } from '@/shared/constants';
import { useApiMutation, useApiQuery } from '@/shared/hooks/masterHook';
import { IApiError, IApiSuccess } from '@/shared/types';

import { ICommonPagination } from '../common/types';
import { IUserAddReq, IUserListRes } from './types';

const ApiEndPoints = {
  userList: 'users/list',
  addUser: 'users/createUser',
  activeInactive: 'users/status',
  getUserDetail: 'users/',
  editUser: `users`,
  operatorsList: `users/assigned-to-chillers`
};

export const userQueryKeys = {
  all: ['user'] as const,
  userlist: (args: ICommonPagination) => [...userQueryKeys.all, 'userList', args],
  userAdd: ['userAdd'],
  userEdit: ['userEdit'],
  activeInactive: ['activeInactive'],
  userDetail: (id: string) => [...userQueryKeys.all, 'userDetail', id],
  operatorsList: (ids: string[] | []) => [...userQueryKeys.all, 'operatorsList', ids]
};

// API
export const userAPI = {
  async getUserList(data: ICommonPagination): Promise<IUserListRes> {
    return apiInstance
      .post(ApiEndPoints.userList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async addUser(data: IUserAddReq): Promise<IApiSuccess<any>> {
    return apiInstance
      .post(ApiEndPoints.addUser, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  async activeInactiveUser(
    userId: string,
    isActive: boolean,
    shouldUnassign: boolean
  ): Promise<IApiSuccess<string | null>> {
    return apiInstance
      .patch(`${ApiEndPoints.activeInactive}`, { userId, isActive, shouldUnassign })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  async getUserDetail(userId: string): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.getUserDetail}${userId}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async editUser(data: IUserAddReq): Promise<IApiSuccess<any>> {
    return apiInstance
      .put(`${ApiEndPoints.editUser}/${data?.id}`, { ...data, id: undefined })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  async getOperatorsList(facilityIds: string[] | []): Promise<{ label: string; value: string }[]> {
    return apiInstance
      .post(ApiEndPoints.operatorsList, { facilityIds })
      .then((response) =>
        response?.data?.map(
          (operators: { firstName?: string; lastName?: string; _id?: string }) => {
            return {
              label: `${operators?.firstName || ''} ${operators?.lastName || ''}`,
              value: operators?._id || ''
            };
          }
        )
      )
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

// Hooks
export const userHooks = {
  UserList: (args: ICommonPagination) => {
    return useApiQuery(
      userQueryKeys.userlist(args),
      () => userAPI.getUserList(args),
      defaultQueryOptions
    );
  },

  useAddUser: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      IUserAddReq
    >
  ) => {
    return useApiMutation({
      mutationKey: userQueryKeys.userAdd,
      mutationFn: async (data: IUserAddReq) => userAPI.addUser(data),
      mutationOptions
    });
  },

  useActiveInactiveUser: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<string | null>,
      IApiError,
      { id: string; isActive: boolean; shouldUnassign: boolean }
    >
  ) => {
    return useApiMutation({
      mutationKey: userQueryKeys.activeInactive,
      mutationFn: async (data) =>
        userAPI.activeInactiveUser(data?.id, data?.isActive, data?.shouldUnassign),
      mutationOptions
    });
  },
  GetUserDetail: (userId: string) => {
    return useApiQuery(userQueryKeys.userDetail(userId), () => userAPI.getUserDetail(userId), {
      ...defaultQueryOptions,
      enabled: Boolean(userId)
    });
  },

  useEditUser: (mutationOptions?: UseMutationOptions<IApiSuccess<any>, IApiError, IUserAddReq>) => {
    return useApiMutation({
      mutationKey: userQueryKeys.userEdit,
      mutationFn: async (data: IUserAddReq) => userAPI.editUser(data),
      mutationOptions
    });
  },

  OperatorsList: (facilityIds: string[] | []) => {
    return useApiQuery(
      userQueryKeys.operatorsList(facilityIds),
      () => userAPI.getOperatorsList(facilityIds),
      { ...defaultQueryOptions, enabled: Boolean(facilityIds?.length) }
    );
  }
};
