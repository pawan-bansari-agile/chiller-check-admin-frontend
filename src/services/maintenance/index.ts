import { UseMutationOptions } from '@tanstack/react-query';

import { defaultQueryOptions } from '@/shared/constants';
import { useApiMutation, useApiQuery } from '@/shared/hooks/masterHook';
import { IApiError, IApiSuccess } from '@/shared/types';

import { ICommonPagination } from '../common/types';
import apiInstance from '../interceptor';
import * as Types from './types';

const apiEndPoints = {
  addMaintenance: 'maintenance-records/create',
  editMaintenance: 'maintenance-records',
  maintenanceView: 'maintenance-records',
  maintenanceList: 'maintenance-records/list',
  deleteMaintenance: 'maintenance-records',
  exportMaintenance: 'maintenance-records/exportMaintenanceExcel'
};

export const maintenanceQueryKey = {
  all: ['maintenance'] as const,
  addMaintenance: ['addMaintenance'],
  editMaintenance: ['editMaintenance'],
  deleteMaintenance: ['deleteMaintenance'],
  exportMaintenance: ['exportMaintenance'],
  maintenanceView: (id: string) => [...maintenanceQueryKey.all, 'maintenanceView', id],
  maintenanceList: (args: ICommonPagination) => [
    ...maintenanceQueryKey.all,
    'maintenanceList',
    args
  ]
};

export const maintenanceApi = {
  async addMaintenance(
    data: Types.IAddMaintenanceReq
  ): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .post(apiEndPoints.addMaintenance, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  async editMaintenance(
    data: Types.IAddMaintenanceReq
  ): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .patch(`${apiEndPoints.editMaintenance}/${data?.id}`, { ...data, id: undefined })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },
  async getMaintenanceView(id: string): Promise<Types.IViewMaintenance> {
    return apiInstance
      .get(`${apiEndPoints.maintenanceView}/${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getMaintenanceList(data: ICommonPagination): Promise<Types.IMaintenanceListRes> {
    return apiInstance
      .post(apiEndPoints.maintenanceList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async maintenanceDelete(id: string): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .delete(`${apiEndPoints.deleteMaintenance}/${id}`)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async exportMaintenance(data: {
    maintenanceIds: string[] | [];
  }): Promise<IApiSuccess<{ name?: string }>> {
    return apiInstance
      .post(apiEndPoints.exportMaintenance, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

export const maintenanceHooks = {
  useAddMaintenance: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddMaintenanceReq
    >
  ) => {
    return useApiMutation({
      mutationKey: maintenanceQueryKey.addMaintenance,
      mutationFn: async (data: Types.IAddMaintenanceReq) => maintenanceApi.addMaintenance(data),
      mutationOptions
    });
  },

  useEditMaintenance: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddMaintenanceReq
    >
  ) => {
    return useApiMutation({
      mutationKey: maintenanceQueryKey.editMaintenance,
      mutationFn: async (data: Types.IAddMaintenanceReq) => maintenanceApi.editMaintenance(data),
      mutationOptions
    });
  },

  MaintenanceView: (id: string) => {
    return useApiQuery(
      maintenanceQueryKey.maintenanceView(id),
      () => maintenanceApi.getMaintenanceView(id),
      {
        ...defaultQueryOptions,
        enabled: Boolean(id)
      }
    );
  },

  MaintenanceList: (args: ICommonPagination) => {
    return useApiQuery(
      maintenanceQueryKey.maintenanceList(args),
      () => maintenanceApi.getMaintenanceList(args),
      defaultQueryOptions
    );
  },

  useDeleteMaintenance: (
    mutationOptions?: UseMutationOptions<IApiSuccess<Record<string, unknown>>, IApiError, string>
  ) => {
    return useApiMutation({
      mutationKey: maintenanceQueryKey.deleteMaintenance,
      mutationFn: async (id) => maintenanceApi.maintenanceDelete(id),
      mutationOptions
    });
  },

  useExportMaintenance: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<{ name?: string }>,
      IApiError,
      { maintenanceIds: string[] | [] }
    >
  ) => {
    return useApiMutation({
      mutationKey: maintenanceQueryKey.exportMaintenance,
      mutationFn: async (data) => maintenanceApi.exportMaintenance(data),
      mutationOptions
    });
  }
};
