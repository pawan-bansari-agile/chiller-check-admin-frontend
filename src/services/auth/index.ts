import { UseMutationOptions } from '@tanstack/react-query';
import apiInstance from 'services/interceptor';

import { useApiMutation } from '@/shared/hooks/masterHook';
import { IApiError, IApiSuccess } from '@/shared/types';

import * as Types from './types';

//End Points
const ApiEndPoints = {
  signIn: `auth/login`,
  verifyOtp: `auth/verifyOtp`,
  forgotPassword: 'auth/forgotPassword',
  resetPassword: 'auth/resetPassword',
  logout: 'auth/logout',
  changePassword: 'auth/changePassword',
  resendOtp: 'auth/resendOtp',
  validatePhoneNumber: 'auth/validateUSMobileNumber'
};

//Query Keys
const authQueryKeys = {
  signIn: ['signIn'],
  verifyOtp: ['verifyOtp'],
  forgotPassword: ['forgotPassword'],
  resetPassword: ['resetPassword'],
  changePassword: ['changePassword'],
  resendOtp: ['resendOtp']
};

// API
export const authApi = {
  // SignIn
  async signIn(data: Types.ISignInReq): Promise<IApiSuccess<Types.ISignInRes>> {
    return apiInstance
      .post(ApiEndPoints.signIn, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  //verify otp
  async verifyOtp(data: Types.IVerifyOtpReq): Promise<IApiSuccess<Types.ISignInRes>> {
    return apiInstance
      .post(ApiEndPoints.verifyOtp, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  //resend otp
  async resendOtp(data: { userId: string }): Promise<IApiSuccess<any>> {
    return apiInstance
      .post(ApiEndPoints.resendOtp, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  //forgot-password
  async forgotPassword(data: { email: string }): Promise<IApiSuccess<Types.IForgotPasswordRes>> {
    return apiInstance
      .post(ApiEndPoints.forgotPassword, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  //reset-password
  async resetPassword(data: {
    resetPasswordToken: string;
    password: string;
  }): Promise<IApiSuccess<{ _id: string; phoneNumber: string }>> {
    return apiInstance
      .post(ApiEndPoints.resetPassword, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  //logout
  async logout(): Promise<IApiSuccess<any>> {
    return apiInstance
      .get(ApiEndPoints.logout)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  //reset-password
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .post(ApiEndPoints.changePassword, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  },

  //validate phone number
  async validatePhoneNumberAction(data: {
    phone: string;
  }): Promise<IApiSuccess<Record<string, unknown>>> {
    return apiInstance
      .post(ApiEndPoints.validatePhoneNumber, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response?.data;
      });
  }
};

//Hooks
export const authHooks = {
  useSignIn: (
    mutationOptions?: UseMutationOptions<IApiSuccess<Types.ISignInRes>, IApiError, Types.ISignInReq>
  ) => {
    return useApiMutation({
      mutationKey: authQueryKeys.signIn,
      mutationFn: async (data: Types.ISignInReq) => authApi.signIn(data),
      mutationOptions
    });
  },

  useVerifyOtp: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Types.ISignInRes>,
      IApiError,
      Types.IVerifyOtpReq
    >
  ) => {
    return useApiMutation({
      mutationKey: authQueryKeys.verifyOtp,
      mutationFn: async (data: Types.IVerifyOtpReq) => authApi.verifyOtp(data),
      mutationOptions
    });
  },

  useResendOtp: (
    mutationOptions?: UseMutationOptions<IApiSuccess<any>, IApiError, { userId: string }>
  ) => {
    return useApiMutation({
      mutationKey: authQueryKeys.resendOtp,
      mutationFn: async (data: { userId: string }) => authApi.resendOtp(data),
      mutationOptions
    });
  },

  useForgotPassword: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Types.IForgotPasswordRes>,
      IApiError,
      { email: string }
    >
  ) => {
    return useApiMutation({
      mutationKey: authQueryKeys.forgotPassword,
      mutationFn: async (data: { email: string }) => authApi.forgotPassword(data),
      mutationOptions
    });
  },

  useResetPassword: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<{ _id: string; phoneNumber: string }>,
      IApiError,
      {
        resetPasswordToken: string;
        password: string;
      }
    >
  ) => {
    return useApiMutation({
      mutationKey: authQueryKeys.resetPassword,
      mutationFn: async (data: { resetPasswordToken: string; password: string }) =>
        authApi.resetPassword(data),
      mutationOptions
    });
  },

  useChangePassword: (
    mutationOptions?: UseMutationOptions<
      IApiSuccess<Record<string, unknown>>,
      IApiError,
      {
        currentPassword: string;
        newPassword: string;
      }
    >
  ) => {
    return useApiMutation({
      mutationKey: authQueryKeys.changePassword,
      mutationFn: async (data: { currentPassword: string; newPassword: string }) =>
        authApi.changePassword(data),
      mutationOptions
    });
  }
};
