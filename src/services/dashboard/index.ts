import { defaultQueryOptions } from '@/shared/constants';
import { useApiQuery } from '@/shared/hooks/masterHook';

import apiInstance from '../interceptor';
import { IDashboardDetails } from './types';

const apiEndPoints = {
  dashboardDetails: 'dashboard/allDetails'
};

export const dashboardQueryKey = {
  all: ['dashboard'] as const,
  dashboardDetails: (companyId: string) => [...dashboardQueryKey.all, 'dashboardDetails', companyId]
};

export const dashboardApi = {
  async getDashboardDetails(companyId: string): Promise<IDashboardDetails> {
    return apiInstance
      .post(apiEndPoints.dashboardDetails, { companyId })
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

export const dashboardHooks = {
  DashboardDetails: (companyId: string) => {
    return useApiQuery(
      dashboardQueryKey.dashboardDetails(companyId),
      () => dashboardApi.getDashboardDetails(companyId),
      { ...defaultQueryOptions, enabled: Boolean(companyId) }
    );
  }
};
