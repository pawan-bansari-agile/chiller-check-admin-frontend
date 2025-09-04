import { UseMutationOptions } from '@tanstack/react-query';

import { defaultQueryOptions } from '@/shared/constants';
import { useApiMutation, useApiQuery } from '@/shared/hooks/masterHook';
import { IApiError, IApiSuccess } from '@/shared/types';

import { ICommonPagination } from '../common/types';
import apiInstance from '../interceptor';
import * as Types from './types';

const apiEndPoints = {
  addLog: 'log/createLog',
  editLog: 'log',
  viewLog: 'log',
  logList: 'log/list',
  deleteLog: 'log',
  exportLog: 'log/exportSelectedLogsExcel',
  importLog: '/log/importBulkLogExcel'
};

export const logQueryKeys = {
  all: ['log'] as const,
  addLog: ['addLog'],
  editLog: ['editLog'],
  deleteLog: ['deleteLog'],
  exportLog: ['exportLog'],
  importLog: ['importLog'],
  logView: (id: string) => [...logQueryKeys.all, 'logView', id],
  logList: (args: ICommonPagination) => [...logQueryKeys.all, 'logList', args]
};

export const logApi = {
  async addLog(data: Types.IAddLogReq): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .post(apiEndPoints.addLog, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  async editLog(data: Types.IAddLogReq): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .patch(`${apiEndPoints.editLog}/${data?.id}`, { ...data, id: undefined })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },
  async getLogView(id: string): Promise<Types.IViewLogRes> {
    return apiInstance
      .get(`${apiEndPoints.viewLog}/${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getLogList(data: ICommonPagination): Promise<Types.ILogListRes> {
    return apiInstance
      .post(apiEndPoints.logList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async logDelete(id: string): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .delete(`${apiEndPoints.deleteLog}/${id}`)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async exportLog(data: { logIds: string[] | [] }): Promise<IApiSuccess<{ name?: string }>> {
    return apiInstance
      .post(apiEndPoints.exportLog, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async importLog(data: FormData): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .post(apiEndPoints.importLog, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

export const logHooks = {
  useAddLogs: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddLogReq
    >
  ) => {
    return useApiMutation({
      mutationKey: logQueryKeys.addLog,
      mutationFn: async (data: Types.IAddLogReq) => logApi.addLog(data),
      mutationOptions
    });
  },

  useEditLogs: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddLogReq
    >
  ) => {
    return useApiMutation({
      mutationKey: logQueryKeys.editLog,
      mutationFn: async (data: Types.IAddLogReq) => logApi.editLog(data),
      mutationOptions
    });
  },

  LogView: (id: string) => {
    return useApiQuery(logQueryKeys.logView(id), () => logApi.getLogView(id), {
      ...defaultQueryOptions,
      enabled: Boolean(id)
    });
  },

  LogList: (args: ICommonPagination) => {
    return useApiQuery(
      logQueryKeys.logList(args),
      () => logApi.getLogList(args),
      defaultQueryOptions
    );
  },

  useDeleteLog: (
    mutationOptions?: UseMutationOptions<IApiSuccess<Record<string, unknown>>, IApiError, string>
  ) => {
    return useApiMutation({
      mutationKey: logQueryKeys.deleteLog,
      mutationFn: async (id) => logApi.logDelete(id),
      mutationOptions
    });
  },

  useExportLog: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<{ name?: string }>,
      IApiError,
      { logIds: string[] | [] }
    >
  ) => {
    return useApiMutation({
      mutationKey: logQueryKeys.exportLog,
      mutationFn: async (data) => logApi.exportLog(data),
      mutationOptions
    });
  },

  useImportLog: (
    mutationOptions?: UseMutationOptions<IApiSuccess<Record<string, unknown>>, IApiError, FormData>
  ) => {
    return useApiMutation({
      mutationKey: logQueryKeys.importLog,
      mutationFn: async (data) => logApi.importLog(data),
      mutationOptions
    });
  }
};
