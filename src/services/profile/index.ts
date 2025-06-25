import { UseMutationOptions } from '@tanstack/react-query';
import apiInstance from 'services/interceptor';

import { defaultQueryOptions } from '@/shared/constants';
import { useApiMutation, useApiQuery } from '@/shared/hooks/masterHook';
import { IApiError, IApiSuccess } from '@/shared/types';

import * as Types from './types';

const apiEndPoints = {
  profile: 'users'
};

export const profileQueryKey = {
  all: ['profile'] as const,
  updateProfile: ['profile', 'updateProfile'],
  getProfile: (id: string) => [...profileQueryKey.all, 'getProfile', id]
};

const profileApi = {
  async getProfileAction(id: string): Promise<Types.IProfileRes> {
    return apiInstance
      .get(`${apiEndPoints.profile}/${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async updateProfileAction(
    data: Types.IUpdateProfile,
    id: string
  ): Promise<IApiSuccess<Types.IUpdateProfileRes>> {
    return apiInstance
      .put(`${apiEndPoints.profile}/${id}`, data)
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

export const profileHooks = {
  useProfile: (id: string) => {
    return useApiQuery(profileQueryKey.getProfile(id), () => profileApi.getProfileAction(id), {
      ...defaultQueryOptions,
      enabled: Boolean(id)
    });
  },

  useUpdateProfile: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Types.IUpdateProfileRes>,
      IApiError,
      Types.IUpdateProfileReq
    >
  ) => {
    return useApiMutation({
      mutationKey: profileQueryKey.updateProfile,
      mutationFn: async (data) => profileApi.updateProfileAction(data?.updatePayload, data?.id),
      mutationOptions
    });
  }
};
