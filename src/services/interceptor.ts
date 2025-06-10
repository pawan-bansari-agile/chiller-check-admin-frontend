import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { authStore } from '@/store/auth';

import { API_BASE } from '@/shared/constants';
import { appLoader, showToaster } from '@/shared/utils/functions';

const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE
});

let isErrorShow = false;

export function setAxiosInterceptor() {
  apiInstance.interceptors.request.use(
    (config) => {
      appLoader(true);
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // It's used to intercept all the axios api response
  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      appLoader(false);
      return response.data;
    },
    (err) => {
      appLoader(false);
      if (err.response) {
        if (err.response.status === 403) {
          authStore.getState().actions.authFail();
          if (!isErrorShow) {
            isErrorShow = true;
            showToaster('error', err?.response?.data?.message);
            setTimeout(() => {
              isErrorShow = false; // Allow future errors to display messages
            }, 3000); // Adjust the timeout as needed
          }
          return Promise.reject(err);
        } else {
          return Promise.reject(err);
        }
      } else if (err.request) {
        return Promise.reject({
          response: {
            data: {
              message: 'Something went wrong, Please try again later!!!'
            }
          }
        });
      }
    }
  );
}

export default apiInstance;
