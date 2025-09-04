import { UseMutationOptions } from '@tanstack/react-query';

import { defaultQueryOptions } from '@/shared/constants';
import { useApiMutation, useApiQuery } from '@/shared/hooks/masterHook';
import { IApiError, IApiSuccess } from '@/shared/types';

import { ICommonPagination } from '../common/types';
import apiInstance from '../interceptor';
import * as Types from './types';

const apiEndPoints = {
  reportList: 'reports/list',
  addReport: 'reports/create',
  notifyUser: 'reports/userList',
  editreport: 'reports',
  reportView: 'reports',
  reportChart: 'reports/chart',
  exportReport: 'reports/exportExcel'
};

export const reportQueryKey = {
  all: ['report'] as const,
  reportList: (args: ICommonPagination) => [...reportQueryKey.all, 'reportList', args],
  reportChat: (args: { id: string; isFacility: boolean }) => [
    ...reportQueryKey.all,
    'reportChat',
    args
  ],
  addReport: ['addReport'],
  editreport: ['editreport'],
  exportReport: ['exportReport'],
  notifyUser: (args: ICommonPagination) => [...reportQueryKey.all, 'notifyUser', args],
  reportView: (id: string) => [...reportQueryKey.all, 'reportView', id]
};

export const reportApi = {
  async getReportsList(data: ICommonPagination): Promise<Types.IReportsList> {
    return apiInstance
      .post(apiEndPoints.reportList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async getReprtsCharts(data: { id: string; isFacility: boolean }): Promise<any> {
    return apiInstance
      .post(apiEndPoints.reportChart, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async addReport(data: Types.IAddReportReq): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .post(apiEndPoints.addReport, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },
  async getNotifyUserList(data: ICommonPagination): Promise<Types.INotifyUserListRes> {
    return apiInstance
      .post(apiEndPoints.notifyUser, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async getReportView(id: string): Promise<Types.IViewReportRes> {
    return apiInstance
      .get(`${apiEndPoints.reportView}/${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async editReport(data: Types.IAddReportReq): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .patch(`${apiEndPoints.editreport}/${data?.id}`, { ...data, id: undefined })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  async exportReport(data: {
    id: string;
    isFacility: boolean;
  }): Promise<IApiSuccess<{ name?: string }>> {
    return apiInstance
      .post(apiEndPoints.exportReport, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

export const reportHooks = {
  ReportList: (args: ICommonPagination) => {
    return useApiQuery(
      reportQueryKey.reportList(args),
      () => reportApi.getReportsList(args),
      defaultQueryOptions
    );
  },
  ReportChartList: (args: { id: string; isFacility: boolean }) => {
    return useApiQuery(reportQueryKey.reportChat(args), () => reportApi.getReprtsCharts(args), {
      ...defaultQueryOptions,
      enabled: Boolean(args?.id)
    });
  },
  NotifyUserList: (args: ICommonPagination) => {
    return useApiQuery(reportQueryKey.notifyUser(args), () => reportApi.getNotifyUserList(args), {
      ...defaultQueryOptions,
      enabled: Boolean(args?.facilityIds?.length)
    });
  },
  useAddReport: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddReportReq
    >
  ) => {
    return useApiMutation({
      mutationKey: reportQueryKey.addReport,
      mutationFn: async (data: Types.IAddReportReq) => reportApi.addReport(data),
      mutationOptions
    });
  },
  ReportView: (id: string) => {
    return useApiQuery(reportQueryKey.reportView(id), () => reportApi.getReportView(id), {
      ...defaultQueryOptions,
      enabled: Boolean(id)
    });
  },

  useEditReport: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddReportReq
    >
  ) => {
    return useApiMutation({
      mutationKey: reportQueryKey.editreport,
      mutationFn: async (data: Types.IAddReportReq) => reportApi.editReport(data),
      mutationOptions
    });
  },

  useExportReport: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<{ name?: string }>,
      IApiError,
      { id: string; isFacility: boolean }
    >
  ) => {
    return useApiMutation({
      mutationKey: reportQueryKey.exportReport,
      mutationFn: async (data) => reportApi.exportReport(data),
      mutationOptions
    });
  }
};
