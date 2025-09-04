import { UseMutationOptions } from '@tanstack/react-query';

import { defaultQueryOptions } from '@/shared/constants';
import { useApiMutation, useApiQuery } from '@/shared/hooks/masterHook';
import { IApiError, IApiSuccess } from '@/shared/types';

import { ICommonPagination } from '../common/types';
import apiInstance from '../interceptor';
import * as Types from './types';

const apiEndPoints = {
  facilityList: 'facility/list',
  viewFacility: 'facility',
  activeInactive: 'facility',
  addFacility: 'facility/createFacility',
  editFacility: 'facility',
  findAllFacility: 'facility/findAll',
  findAllFacilityCompanyId: 'facility/findAll',
  activeFacilities: `facility/findAll/activeFacilities`
};

export const facilityQueryKeys = {
  all: ['facility'] as const,
  findAllCompany: ['facility', 'findAllFacility'],
  findAllFacilityCompany: (id?: string) => ['facility', 'findAllFacilityCompany', id],
  facilityList: (args: ICommonPagination) => [...facilityQueryKeys.all, 'facilityList', args],
  facilityView: (id: string) => [...facilityQueryKeys.all, 'facilityView', id],
  activeInactive: ['activeInactive'],
  addFacility: ['addFacility'],
  editFacility: ['editFacility'],
  activeFacilities: (id?: string) => ['facility', 'activeFacilities', id]
};

export const facilityApi = {
  async getFacilityAllListCompany(companyId?: string): Promise<Types.IGetAllFacilityList[]> {
    return apiInstance
      .post(`${apiEndPoints.findAllFacilityCompanyId}?companyId=${companyId}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async getFacilityAllList(): Promise<Types.IGetAllFacilityList[]> {
    return apiInstance
      .post(apiEndPoints.findAllFacility)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async getFacilityAllActiveList(companyId?: string): Promise<Types.IFacilityActiveList[]> {
    return apiInstance
      .post(apiEndPoints.activeFacilities, { companyId })
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getFacilityList(data: ICommonPagination): Promise<Types.IGetFacilityListRes> {
    return apiInstance
      .post(apiEndPoints.facilityList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async getFacilityView(id: string): Promise<Types.IFacilityViewRes> {
    return apiInstance
      .get(`${apiEndPoints.viewFacility}/${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async activeInactiveFacility(id: string, isActive: boolean): Promise<IApiSuccess<string | null>> {
    return apiInstance
      .patch(`${apiEndPoints.activeInactive}/${id}`, { isActive })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  async addFacility(data: Types.IAddChillerReq): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .post(apiEndPoints.addFacility, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  async editFacility(data: Types.IAddChillerReq): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .put(`${apiEndPoints.editFacility}/${data?._id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  }
};

export const facilityHooks = {
  AllFacilityListByCompany: (companyId?: string) => {
    return useApiQuery(
      facilityQueryKeys.findAllFacilityCompany(companyId),
      () => facilityApi.getFacilityAllListCompany(companyId),
      { ...defaultQueryOptions, enabled: Boolean(companyId) }
    );
  },
  AllFacilityList: () => {
    return useApiQuery(
      facilityQueryKeys.findAllCompany,
      () => facilityApi.getFacilityAllList(),
      defaultQueryOptions
    );
  },
  AllFacilityActiveList: (companyId?: string) => {
    return useApiQuery(
      facilityQueryKeys.activeFacilities(companyId),
      () => facilityApi.getFacilityAllActiveList(companyId),
      { ...defaultQueryOptions, enabled: Boolean(companyId), retry: false }
    );
  },
  FacilityList: (args: ICommonPagination) => {
    return useApiQuery(
      facilityQueryKeys.facilityList(args),
      () => facilityApi.getFacilityList(args),
      defaultQueryOptions
    );
  },

  FacilityView: (id: string) => {
    return useApiQuery(facilityQueryKeys.facilityView(id), () => facilityApi.getFacilityView(id), {
      ...defaultQueryOptions,
      enabled: Boolean(id)
    });
  },

  useActiveInactiveFacility: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<string | null>,
      IApiError,
      { id: string; isActive: boolean }
    >
  ) => {
    return useApiMutation({
      mutationKey: facilityQueryKeys.activeInactive,
      mutationFn: async (data) => facilityApi.activeInactiveFacility(data?.id, data?.isActive),
      mutationOptions
    });
  },

  useAddFacility: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddChillerReq
    >
  ) => {
    return useApiMutation({
      mutationKey: facilityQueryKeys.addFacility,
      mutationFn: async (data: Types.IAddChillerReq) => facilityApi.addFacility(data),
      mutationOptions
    });
  },

  useEditFacility: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddChillerReq
    >
  ) => {
    return useApiMutation({
      mutationKey: facilityQueryKeys.editFacility,
      mutationFn: async (data: Types.IAddChillerReq) => facilityApi.editFacility(data),
      mutationOptions
    });
  }
};
