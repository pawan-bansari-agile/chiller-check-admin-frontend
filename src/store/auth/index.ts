import { ISignInRes } from 'services/auth/types';
import apiInstance from 'services/interceptor';
import { create } from 'zustand';

import { LocalStorageKeys } from '@/shared/constants';

export type IAuthStore = {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: ISignInRes;
  isSuperAdmin?: boolean;
};

interface IAuthAction {
  actions: {
    loaderChange: (status: IAuthStore['isLoading']) => void;
    authSuccess: (payload: { data: ISignInRes }) => void;
    authFail: () => void;
  };
}

export const authStore = create<IAuthStore & IAuthAction>((set) => ({
  // initial state
  isLoading: false,
  isLoggedIn: false,
  userData: {} as ISignInRes,

  // Actions
  actions: {
    loaderChange: (status) => set((state) => ({ ...state, isLoading: status })),
    authSuccess: (payload) =>
      set((state) => {
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${payload.data.accessToken}`;
        localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, JSON.stringify(payload.data.accessToken));
        localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(payload.data));
        return {
          ...state,
          userData: payload.data,
          isLoggedIn: true
        };
      }),
    authFail: () =>
      set((state) => {
        delete apiInstance.defaults.headers.common['Authorization'];
        localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN);
        localStorage.removeItem(LocalStorageKeys.USER);
        return {
          ...state,
          userData: {} as ISignInRes,
          isLoggedIn: false
        };
      })
  }
}));
