import { UseMutationOptions } from '@tanstack/react-query';

import { defaultQueryOptions } from '@/shared/constants';
import { useApiMutation, useApiQuery } from '@/shared/hooks/masterHook';
import { IApiError, IApiSuccess } from '@/shared/types';

import { ICommonPagination } from '../common/types';
import apiInstance from '../interceptor';
import * as Types from './types';

const apiEndPoints = {
  companyList: 'company/list',
  companyView: 'company',
  activeInactive: 'company',
  addCompany: 'company/createCompany',
  editCompany: 'company',
  findAllCompany: 'company/findAll',
  findAllCompanyUnAssigned: 'company/findAllNotAssigned',
  activeCompanies: `company/findAll/activeCompanies`
};

export const companyQueryKeys = {
  all: ['company'] as const,
  findAllCompany: ['company', 'findAllCompany'],
  companyList: (args: ICommonPagination) => [...companyQueryKeys.all, 'companyList', args],
  companyView: (id: string) => [...companyQueryKeys.all, 'companyView', id],
  activeInactive: ['activeInactive'],
  addCompany: ['addCompany'],
  editCompany: ['editCompany'],
  companyListUnAssigned: (args: ICommonPagination) => [
    ...companyQueryKeys.all,
    'companyListUnAssigned',
    args
  ],
  activeCompanies: ['company', 'activeCompanies']
};

export const companyApi = {
  async getCompanyAllList(): Promise<Types.IGetAllCompanyList[]> {
    return apiInstance
      .post(apiEndPoints.findAllCompany)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async getActiveCompanyList(): Promise<{ label?: string; value?: string }[]> {
    return apiInstance
      .get(apiEndPoints.activeCompanies)
      .then(
        (response) =>
          response?.data?.map((company: Types.ICompanyActiveList) => {
            return {
              label: company?.name || '',
              value: company?._id
            };
          }) || []
      )
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async getCompanyList(data: ICommonPagination): Promise<Types.IGetCompanyListRes> {
    return apiInstance
      .post(apiEndPoints.companyList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getCompanyListUnAssigned(
    data: ICommonPagination
  ): Promise<Types.IGetCompanyUnAssignedList> {
    return apiInstance
      .post(apiEndPoints.findAllCompanyUnAssigned, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getCompanyView(id: string): Promise<Types.IGetCompanyView> {
    return apiInstance
      .get(`${apiEndPoints.companyView}/${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async activeInactiveCompany(id: string, status: string): Promise<IApiSuccess<string | null>> {
    return apiInstance
      .put(`${apiEndPoints.activeInactive}/${id}`, { status })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  async addCompany(data: Types.IAddCompanyReq): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .post(apiEndPoints.addCompany, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  async editCompany(data: Types.IAddCompanyReq): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .patch(`${apiEndPoints.editCompany}/${data?._id}`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  }
};

export const companyHooks = {
  AllCompanyList: () => {
    return useApiQuery(
      companyQueryKeys.findAllCompany,
      () => companyApi.getCompanyAllList(),
      defaultQueryOptions
    );
  },
  AllActiveCompanyList: () => {
    return useApiQuery(
      companyQueryKeys.activeCompanies,
      () => companyApi.getActiveCompanyList(),
      defaultQueryOptions
    );
  },
  CompanyList: (args: ICommonPagination) => {
    return useApiQuery(
      companyQueryKeys.companyList(args),
      () => companyApi.getCompanyList(args),
      defaultQueryOptions
    );
  },

  CompanyListUnAssigned: (args: ICommonPagination) => {
    return useApiQuery(
      companyQueryKeys.companyListUnAssigned(args),
      () => companyApi.getCompanyListUnAssigned(args),
      defaultQueryOptions
    );
  },

  CompanyView: (id: string) => {
    return useApiQuery(companyQueryKeys.companyView(id), () => companyApi.getCompanyView(id), {
      ...defaultQueryOptions,
      enabled: Boolean(id)
    });
  },

  useActiveInactiveCompany: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<string | null>,
      IApiError,
      { id: string; status: string }
    >
  ) => {
    return useApiMutation({
      mutationKey: companyQueryKeys.activeInactive,
      mutationFn: async (data) => companyApi.activeInactiveCompany(data?.id, data?.status),
      mutationOptions
    });
  },

  useAddCompany: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddCompanyReq
    >
  ) => {
    return useApiMutation({
      mutationKey: companyQueryKeys.addCompany,
      mutationFn: async (data: Types.IAddCompanyReq) => companyApi.addCompany(data),
      mutationOptions
    });
  },

  useEditCompany: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      Types.IAddCompanyReq
    >
  ) => {
    return useApiMutation({
      mutationKey: companyQueryKeys.editCompany,
      mutationFn: async (data: Types.IAddCompanyReq) => companyApi.editCompany(data),
      mutationOptions
    });
  }
};
