import { UseMutationOptions } from '@tanstack/react-query';

import { defaultQueryOptions } from '@/shared/constants';
import { useApiMutation, useApiQuery } from '@/shared/hooks/masterHook';
import { IApiError, IApiSuccess } from '@/shared/types';

import { ICommonPagination } from '../common/types';
import apiInstance from '../interceptor';
import * as Types from './types';

const apiEndPoints = {
  addChiller: 'chiller/createChiller',
  chillerList: 'chiller/list',
  bulkUpdate: 'chiller/bulk-update-energy-cost',
  viewChiller: 'chiller',
  editChiller: 'chiller',
  activeInactive: 'chiller',
  chillerTimeLine: 'timeline/list',
  getAllChillers: 'chiller/findAll'
};

export const chillerQueryKeys = {
  all: ['chiller'] as const,
  addChiller: ['addChiller'],
  editChiller: ['editChiller'],
  activeInactive: ['activeInactive'],
  bulkUpdate: ['bulkUpdate'],
  chillerList: (args: ICommonPagination) => [...chillerQueryKeys.all, 'chillerList', args],
  chillerAllList: (args: ICommonPagination) => [...chillerQueryKeys.all, 'chillerAllList', args],
  chillerTimeLineList: (args: ICommonPagination) => [
    ...chillerQueryKeys.all,
    'chillerTimeLineList',
    args
  ],
  chillerView: (id: string) => [...chillerQueryKeys.all, 'chillerView', id]
};

export const chillerApi = {
  async addChiller(data: Types.IAddChillerReq): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .post(apiEndPoints.addChiller, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },
  async getChillerList(data: ICommonPagination): Promise<Types.IChillerListRes> {
    return apiInstance
      .post(apiEndPoints.chillerList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getChillerAllList(data: ICommonPagination): Promise<Types.IChillerAllListRes> {
    return apiInstance
      .post(apiEndPoints.getAllChillers, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getChillerTimeLineList(data: ICommonPagination): Promise<Types.IChillerTimeLine> {
    return apiInstance
      .post(apiEndPoints.chillerTimeLine, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async bulkUpdate(data: {
    chillerIds: string[];
    energyCost: number;
  }): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .patch(apiEndPoints.bulkUpdate, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getChillerView(id: string): Promise<Types.IChillerViewRes> {
    return apiInstance
      .get(`${apiEndPoints.viewChiller}/${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async editChiller(data: Types.IAddChillerReq): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .patch(`${apiEndPoints.editChiller}/${data?.id}`, { ...data, id: undefined })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  async activeInactiveChiller(id: string, status: string): Promise<IApiSuccess<string | null>> {
    return apiInstance
      .patch(`${apiEndPoints.activeInactive}/${id}/inactivate`, { status })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  }
};

export const chillerHooks = {
  useAddChiller: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddChillerReq
    >
  ) => {
    return useApiMutation({
      mutationKey: chillerQueryKeys.addChiller,
      mutationFn: async (data: Types.IAddChillerReq) => chillerApi.addChiller(data),
      mutationOptions
    });
  },

  ChillerList: (args: ICommonPagination) => {
    return useApiQuery(
      chillerQueryKeys.chillerList(args),
      () => chillerApi.getChillerList(args),
      defaultQueryOptions
    );
  },

  ChillerAllList: (args: ICommonPagination) => {
    return useApiQuery(
      chillerQueryKeys.chillerAllList(args),
      () => chillerApi.getChillerAllList(args),
      { ...defaultQueryOptions, enabled: Boolean(args?.facilityIds?.length) }
    );
  },

  ChillerTimeLineList: (args: ICommonPagination) => {
    return useApiQuery(
      chillerQueryKeys.chillerTimeLineList(args),
      () => chillerApi.getChillerTimeLineList(args),
      defaultQueryOptions
    );
  },

  ChillerView: (id: string) => {
    return useApiQuery(chillerQueryKeys.chillerView(id), () => chillerApi.getChillerView(id), {
      ...defaultQueryOptions,
      enabled: Boolean(id)
    });
  },

  useBulkUpdate: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      {
        chillerIds: string[];
        energyCost: number;
      }
    >
  ) => {
    return useApiMutation({
      mutationKey: chillerQueryKeys.bulkUpdate,
      mutationFn: async (data: { chillerIds: string[]; energyCost: number }) =>
        chillerApi.bulkUpdate(data),
      mutationOptions
    });
  },

  useEditChiller: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddChillerReq
    >
  ) => {
    return useApiMutation({
      mutationKey: chillerQueryKeys.editChiller,
      mutationFn: async (data: Types.IAddChillerReq) => chillerApi.editChiller(data),
      mutationOptions
    });
  },

  useActiveInactiveChiller: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<string | null>,
      IApiError,
      { id: string; status: string }
    >
  ) => {
    return useApiMutation({
      mutationKey: chillerQueryKeys.activeInactive,
      mutationFn: async (data) => chillerApi.activeInactiveChiller(data?.id, data?.status),
      mutationOptions
    });
  }
};
