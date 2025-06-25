import { message } from 'antd';
import { RuleObject } from 'antd/es/form';
import { NoticeType } from 'antd/es/message/interface';
import { setAxiosInterceptor } from 'services/interceptor';
import { v4 as uuidv4 } from 'uuid';

import { authStore } from '@/store/auth';

import { LocalStorageKeys } from '../constants';
import { SetParamOptions } from '../types';

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
    message[type](content);
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

export const capitalizeFirstLetter = (str: string = '') => {
  if (!str?.trim()) return '-';
  return str
    ?.split(' ')
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    ?.join(' ');
};

export function formatPhoneNumber(phone: string): string {
  if (!phone) return '-';
  const cleaned = phone.replace(/\D/g, ''); // remove non-digit characters

  if (!cleaned.startsWith('1') && !cleaned.startsWith('91')) {
    return phone; // return as is if unknown country code
  }

  const countryCode = cleaned.startsWith('91') ? '+91' : '+1';
  const number = cleaned.startsWith('91') ? cleaned.slice(2) : cleaned.slice(1);

  if (number.length !== 10) return phone; // invalid phone number

  const part1 = number.slice(0, 3);
  const part2 = number.slice(3, 6);
  const part3 = number.slice(6);

  return `${countryCode} ${part1} ${part2} ${part3}`;
}

export const capitalizeFirstLetterWhileTyping = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const getSortOrder = (order: string | null | undefined): string | null => {
  switch (order) {
    case 'descend':
      return 'DESC';
    case 'ascend':
      return 'ASC';
    default:
      return '';
  }
};

export function debounce<T>(this: T, func: (...args: any[]) => void): (...args: any[]) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: T, ...args: any[]): void {
    clearTimeout(timer as NodeJS.Timeout);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, 700);
  };
}

export const allowOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  const isNumberKey = /^[0-9]$/.test(e.key);
  const isAllowedKey = allowedKeys.includes(e.key);

  if (!isNumberKey && !isAllowedKey) {
    e.preventDefault();
  }
};

export const uniqueFieldValidator = (
  form: any,
  listFieldName: string,
  currentFieldName: string,
  errorMessage = 'Field must be unique.'
) => {
  return async (_: RuleObject, value: string) => {
    const allValues = form.getFieldValue(listFieldName) || [];

    const isDuplicate =
      allValues.filter(
        (item: any) =>
          item?.[currentFieldName]?.toLowerCase?.()?.trim() === value?.toLowerCase()?.trim()
      ).length > 1;

    if (isDuplicate) {
      return Promise.reject(new Error(errorMessage));
    }

    return Promise.resolve();
  };
};

export const buildSearchParams = (options: SetParamOptions): URLSearchParams => {
  const params = new URLSearchParams();

  if (options.page) params.set('page', String(options.page));
  if (options.limit) params.set('limit', String(options.limit));
  if (options.companyId) params.set('companyId', options.companyId);
  if (options.search?.trim()) params.set('search', options.search.trim());
  if (options.sort_by) params.set('sort_by', options.sort_by);
  if (options.sort_order) params.set('sort_order', options.sort_order);

  return params;
};

export const getAntDSortOrder = (
  currentSortBy: string,
  currentSortOrder: string | undefined,
  columnKey: string
): 'ascend' | 'descend' | undefined => {
  if (currentSortBy !== columnKey) return undefined;
  const order = currentSortOrder?.toLowerCase();
  if (order === 'asc') return 'ascend';
  if (order === 'desc') return 'descend';
  return undefined;
};

export const allowNegativeDecimalOnly = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedControlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  const key = e.key;
  const value = (e.currentTarget as HTMLInputElement).value;
  const isCtrlCmd = e.ctrlKey || e.metaKey;

  if (allowedControlKeys.includes(key) || isCtrlCmd) {
    return; // Allow control keys and CMD/CTRL shortcuts
  }

  if (key === '-') {
    if (value.length !== 0 || value.includes('-')) {
      e.preventDefault(); // Only one minus at the beginning
    }
    return;
  }

  if (key === '.') {
    if (value.includes('.')) {
      e.preventDefault(); // Only one dot allowed
    }
    return;
  }

  if (!/^[0-9]$/.test(key)) {
    e.preventDefault(); // Block everything except 0–9
  }
};
