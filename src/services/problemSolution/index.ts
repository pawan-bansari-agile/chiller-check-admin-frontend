import { UseMutationOptions } from '@tanstack/react-query';

import { defaultQueryOptions } from '@/shared/constants';
import { useApiMutation, useApiQuery } from '@/shared/hooks/masterHook';
import { IApiError, IApiSuccess } from '@/shared/types';

import { ICommonPagination } from '../common/types';
import apiInstance from '../interceptor';
import { IProblemSolutionListRes } from './types';

const ApiEndPoints = {
  problemSolutionList: 'setting/list',
  getProblemSolutionDetail: 'setting/'
};

export const problemSolutionQueryKeys = {
  all: ['problem Solution'] as const,
  problemSolutionlist: (args: ICommonPagination) => [
    ...problemSolutionQueryKeys.all,
    'problemSolutionList',
    args
  ],
  problemSolutionDetail: (problemSolutionId: string) => [`ProblemSolution-${problemSolutionId}`],
  editProblemSolution: [`edit-problem-solution`]
};

// API
export const problemSolutionAPI = {
  async getProblemSolutionList(data: ICommonPagination): Promise<IProblemSolutionListRes> {
    return apiInstance
      .post(ApiEndPoints.problemSolutionList, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async getProblemSolutionDetail(problemSolutionId: string): Promise<any> {
    return apiInstance
      .get(`${ApiEndPoints.getProblemSolutionDetail}${problemSolutionId}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  },
  async editProblemSolutionDetail(problemSolutionData: any): Promise<any> {
    console.log(problemSolutionData);

    return apiInstance
      .put(`${ApiEndPoints.getProblemSolutionDetail}${problemSolutionData.id}`, {
        problem: problemSolutionData.WriteProblem,
        solution: problemSolutionData.WriteSolution
      })
      .then((response) => response)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
};

// Hooks
export const problemSolutionHooks = {
  ProblemSolutionList: (args: ICommonPagination) => {
    return useApiQuery(
      problemSolutionQueryKeys.problemSolutionlist(args),
      () => problemSolutionAPI.getProblemSolutionList(args),
      defaultQueryOptions
    );
  },

  GetProblemSolutionDetail: (problemSolutionId: string) => {
    return useApiQuery(
      problemSolutionQueryKeys.problemSolutionDetail(problemSolutionId),
      () => problemSolutionAPI.getProblemSolutionDetail(problemSolutionId),
      { ...defaultQueryOptions, staleTime: 0 }
    );
  },

  useEditProblemSolution: (
    mutationOptions?: UseMutationOptions<IApiSuccess<Record<string, unknown>>, IApiError, any>
  ) => {
    return useApiMutation({
      mutationKey: problemSolutionQueryKeys.editProblemSolution,
      mutationFn: async (data: any) => problemSolutionAPI.editProblemSolutionDetail(data),
      mutationOptions
    });
  }
};
