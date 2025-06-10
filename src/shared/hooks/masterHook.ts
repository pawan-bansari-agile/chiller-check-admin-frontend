// useApiQuery.ts
import {
  MutationFunction,
  MutationKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery
} from '@tanstack/react-query';

import { IApiError } from '../types';

export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
type UseApiQueryOptions<T> = Omit<UseQueryOptions<T>, 'queryKey'>;

export function useApiQuery<TFn extends (...args: any[]) => Promise<any>>(
  queryKey: any[],
  queryFn: TFn,
  queryOptions?: UseApiQueryOptions<UnwrapPromise<ReturnType<TFn>>>
): UseQueryResult<UnwrapPromise<ReturnType<TFn>>> {
  return useQuery<UnwrapPromise<ReturnType<TFn>>>({
    queryKey,
    queryFn,
    ...queryOptions
  });
}

/* custom hook useRequest logic end */

interface MutationConfig<T, P> {
  mutationKey?: MutationKey;
  mutationFn: MutationFunction<T, P>;
  mutationOptions?: Omit<UseMutationOptions<T, IApiError, P>, 'mutationKey' | 'mutationFn'>;
}

type MutationResult<T, P> = UseMutationResult<T, IApiError, P>;

export const useApiMutation = <T, P>({
  mutationKey,
  mutationFn,
  mutationOptions
}: MutationConfig<T, P>): MutationResult<T, P> => {
  return useMutation<T, IApiError, P>({
    mutationKey,
    mutationFn,
    ...mutationOptions
  });
};
/* custom hook useRequest logic end */
