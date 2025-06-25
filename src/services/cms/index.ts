import { UseMutationOptions } from '@tanstack/react-query';
import apiInstance from 'services/interceptor';

import { defaultQueryOptions } from '@/shared/constants';
import { useApiMutation, useApiQuery } from '@/shared/hooks/masterHook';
import { IApiError, IApiSuccess } from '@/shared/types';

import * as Types from './types';

const apiEndPoints = {
  getCms: `cms/getCmsByTitle`,
  updateCms: 'cms/updateCms'
};

export const cmsQueryKey = {
  all: ['cms'] as const,
  getCms: (title: string) => [...cmsQueryKey.all, 'getCms', title],
  updateCms: ['cms', 'updateCms']
};

export const cmsApi = {
  async getCmsAction(data: { title: string }): Promise<Types.IGetCmsRes> {
    return apiInstance
      .post(`${apiEndPoints.getCms}`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async updateCmsAction(data: {
    title: string;
    value: string;
  }): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .post(`${apiEndPoints.updateCms}`, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

export const cmsHooks = {
  useCmsList: (title: string) => {
    return useApiQuery(
      cmsQueryKey.getCms(title),
      () => cmsApi.getCmsAction({ title }),
      defaultQueryOptions
    );
  },

  useUpdateCms: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      { title: string; value: string }
    >
  ) => {
    return useApiMutation({
      mutationKey: cmsQueryKey.updateCms,
      mutationFn: async ({ title, value }) => cmsApi.updateCmsAction({ title, value }),
      mutationOptions
    });
  }
};
