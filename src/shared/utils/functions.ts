import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import { setAxiosInterceptor } from 'services/interceptor';
import { v4 as uuidv4 } from 'uuid';

import { authStore } from '@/store/auth';

import { APP_SECRET, LocalStorageKeys } from '../constants';

//To concat the path for the public folder
export const toAbsoluteUrl = (pathname: string) => window.location.origin + pathname;

// Rehydrate store and set axios default headers
export const setupAxios = () => {
  const { actions } = authStore.getState();

  const userStorage = localStorage.getItem(LocalStorageKeys.USER);
  const tokenStorage = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN);

  if (userStorage && tokenStorage) {
    const token = JSON.parse(tokenStorage);
    const userData = JSON.parse(userStorage);

    if (token) {
      const USER_DATA = { ...userData, authToken: token };
      actions.authSuccess({ data: USER_DATA });
    } else {
      actions.authFail();
    }
  }

  // Set Axios Interceptor
  setAxiosInterceptor();
};

export const appLoader = (status: boolean) => {
  const { actions } = authStore.getState();
  actions.loaderChange(status);
};

export const showToaster = (type: NoticeType, content: string = ''): void => {
  const fallback = 'An unexpected error occurred';

  if (message[type]) {
    message[type](content || fallback);
  } else {
    message.error(fallback);
  }
};

/**
 * Convert a hex color to an rgba string with specified opacity
 *
 * @param hex - The hex color string, e.g. "#4B88FF" or "#4B8"
 * @param opacity - The opacity as a number between 0 (transparent) and 1 (fully opaque)
 * @returns A string in rgba format, e.g. "rgba(75, 136, 255, 0.5)"
 */
export function hexToRGBA(hex: string, opacity: number): string {
  let cleanedHex = hex.replace('#', '');

  if (cleanedHex.length === 3) {
    cleanedHex = cleanedHex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  if (cleanedHex.length !== 6) {
    throw new Error('Invalid hex color format');
  }

  const r = parseInt(cleanedHex.substring(0, 2), 16);
  const g = parseInt(cleanedHex.substring(2, 4), 16);
  const b = parseInt(cleanedHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const encryptionUtils = {
  encryptData: (data: any) => {
    try {
      const ciphertext = AES.encrypt(
        JSON.stringify(data),
        APP_SECRET ?? 'default-secret-key'
      ).toString();
      return ciphertext;
    } catch (error) {
      console.error('Error encrypting data:', error);
      return '';
    }
  },

  decryptData: (data: any) => {
    try {
      const bytes = AES.decrypt(data, APP_SECRET ?? 'default-secret-key');
      const decryptedData = JSON.parse(bytes.toString(Utf8));
      return decryptedData;
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null;
    }
  }
};

export const initializeDeviceId = (
  deviceId: string | null,
  setDeviceId: (id: string) => void
): void => {
  const localDeviceId = localStorage.getItem(LocalStorageKeys.DEVICE_ID);

  if (!localDeviceId) {
    const generatedDeviceId = uuidv4();
    setDeviceId(generatedDeviceId);
    localStorage.setItem(LocalStorageKeys.DEVICE_ID, generatedDeviceId);
  } else if (!deviceId) {
    setDeviceId(localDeviceId);
  }
};

export const isPasswordValid = (password: string): boolean => {
  const noSpaces = /^\S*$/;
  const minLength = /.{8,}/;
  const upperCase = /[A-Z]/;
  const numeric = /[0-9]/;
  const specialChar = /[^A-Za-z0-9]/;

  return (
    noSpaces.test(password) &&
    minLength.test(password) &&
    upperCase.test(password) &&
    numeric.test(password) &&
    specialChar.test(password)
  );
};
