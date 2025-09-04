import { message } from 'antd';
import { RuleObject } from 'antd/es/form';
import { NoticeType } from 'antd/es/message/interface';
import { setAxiosInterceptor } from 'services/interceptor';
import { v4 as uuidv4 } from 'uuid';

import { authStore } from '@/store/auth';

import { LocalStorageKeys, USER_ROLES } from '../constants';
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
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
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
  if (options.facilityId) params.set('facilityId', options.facilityId);
  if (options.role) params.set('role', options.role);
  if (options.userId) params.set('userId', options.userId);
  if (options.chillerId) params.set('chillerId', options.chillerId);
  if (options.parameter) params.set('parameter', options.parameter);

  if (options.peakLoad) params.set('peakLoad', options.peakLoad ? 'true' : 'false');

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
  const input = e.currentTarget as HTMLInputElement;
  const value = input.value;
  const isCtrlCmd = e.ctrlKey || e.metaKey;

  // Allow control keys and CMD/CTRL shortcuts
  if (allowedControlKeys.includes(key) || isCtrlCmd) {
    return;
  }

  // Allow minus only at the beginning and only once
  if (key === '-') {
    if (value.includes('-')) {
      e.preventDefault();
    }
    return;
  }

  // Allow dot only once
  if (key === '.') {
    if (value.includes('.')) {
      e.preventDefault();
    }
    return;
  }

  // Allow digits 0–9
  if (/^[0-9]$/.test(key)) {
    const [integerPart, decimalPart] = value.split('.');

    // If already has a dot and cursor is after it
    const cursorPos = input.selectionStart ?? value.length;

    if (value.includes('.') && cursorPos > value.indexOf('.')) {
      if (integerPart && decimalPart?.length >= 4) {
        e.preventDefault(); // Limit decimal places to 4
      }
    }

    return;
  }

  // Block all other characters
  e.preventDefault();
};

export const allowOnlyDigits = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedControlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  const key = e.key;

  if (allowedControlKeys.includes(key)) return;

  if (!/^\d$/.test(key)) {
    e.preventDefault(); // block non-digits (including "-" and ".")
  }
};

export const allowEnergyCost = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedControlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  const key = e.key;
  const input = e.currentTarget;
  const value = input.value;
  const selectionStart = input.selectionStart ?? value.length;

  if (allowedControlKeys.includes(key)) return;

  if (key === '-') {
    e.preventDefault(); // disallow minus
    return;
  }

  if (key === '.') {
    if (value.includes('.')) {
      e.preventDefault(); // only one dot allowed
    }
    return;
  }

  if (!/^\d$/.test(key)) {
    e.preventDefault(); // allow only digits
    return;
  }

  // Enforce max 4 digits after decimal
  const dotIndex = value.indexOf('.');
  if (dotIndex !== -1 && selectionStart > dotIndex) {
    const decimals = value.slice(dotIndex + 1);
    if (decimals.length >= 4 && selectionStart > dotIndex) {
      e.preventDefault();
    }
  }
};

export const allowHoursPerWeek = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  const key = e.key;
  const value = (e.currentTarget as HTMLInputElement).value;

  if (allowedKeys.includes(key)) return;

  if (!/^\d$/.test(key)) {
    e.preventDefault(); // Block non-digit input
  }

  // Disallow leading zero as the first character
  if (value.length === 0 && key === '0') {
    e.preventDefault();
  }
};

export const allowAverageLoad = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  const key = e.key;
  const input = e.currentTarget;
  const value = input.value;
  const selectionStart = input.selectionStart ?? value.length;

  if (allowedKeys.includes(key)) return;

  if (key === '-') {
    e.preventDefault(); // Disallow minus sign
    return;
  }

  if (key === '.') {
    if (value.includes('.')) {
      e.preventDefault(); // Only one dot allowed
    }
    return;
  }

  if (!/^\d$/.test(key)) {
    e.preventDefault(); // Allow only digits
    return;
  }

  // Restrict to 4 digits after the decimal
  const dotIndex = value.indexOf('.');
  if (dotIndex !== -1 && selectionStart > dotIndex) {
    const decimals = value.slice(dotIndex + 1);
    if (decimals.length >= 4) {
      e.preventDefault();
    }
  }
};

export const validateAltitude = (field: string) => {
  return (_: any, value: string) => {
    if (
      value === undefined ||
      value === null ||
      value.trim() === '' ||
      value === '-' ||
      value === '.' ||
      value === '-.'
    ) {
      return Promise.reject(new Error(`Please enter a valid ${field}.`));
    }

    const validNumberRegex = /^-?\d+(\.\d+)?$/;

    if (!validNumberRegex.test(value)) {
      return Promise.reject(new Error(`Please enter a valid ${field}.`));
    }

    const num = Number(value);

    if (isNaN(num)) {
      return Promise.reject(new Error(`Please enter a valid ${field}.`));
    }

    return Promise.resolve();
  };
};

export const validateEnergyCost = (fieldLabel: string, isRequired = true) => {
  return (_: any, value: string) => {
    if (!value) {
      if (isRequired) {
        return Promise.reject(new Error(`Please enter ${fieldLabel}.`));
      }
      return Promise.resolve();
    }

    const regex = /^\d+(\.\d{1,4})?$/;

    if (!regex.test(value)) {
      return Promise.reject(new Error(`Please enter valid ${fieldLabel}.`));
    }

    return Promise.resolve();
  };
};

export const validateWeeklyHours = (fieldLabel: string, min = 1, max = 168) => {
  return (_: any, value: string) => {
    if (!value || value.trim() === '') {
      return Promise.reject(new Error(`Please enter ${fieldLabel}.`));
    }

    if (!/^[1-9]\d*$/.test(value)) {
      return Promise.reject(new Error(`Please enter valid ${fieldLabel}.`));
    }

    const num = parseInt(value, 10);

    if (num < min || num > max) {
      return Promise.reject(
        new Error(
          `${fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1)} must be between ${min} and ${max}.`
        )
      );
    }

    return Promise.resolve();
  };
};

export const validateAverageLoad = (fieldLabel: string, min = 0, max = Infinity) => {
  return (_: any, value: string) => {
    if (!value || value.trim() === '') {
      return Promise.reject(new Error(`Please enter ${fieldLabel}.`));
    }

    const decimalRegex = /^\d+(\.\d+)?$/; // allows 0, 0.1, 10.25, etc.

    if (!decimalRegex.test(value)) {
      return Promise.reject(
        new Error(
          `${fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1)} must be between ${min} and ${max}.`
        )
      );
    }

    const num = parseFloat(value);

    if (isNaN(num) || num < min || num > max) {
      return Promise.reject(
        new Error(
          `${fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1)} must be between ${min} and ${max}.`
        )
      );
    }

    return Promise.resolve();
  };
};

export const getUnitValidator = (unitType: 'English' | 'SI Metric') => {
  return (_: any, value: string) => {
    if (value === undefined || value === null || value === '') {
      return Promise.resolve(); // handled by required rule
    }

    const num = parseFloat(value);

    if (!/^\d+(\.\d+)?$/.test(value)) {
      return Promise.reject(
        unitType === 'English' ? 'Please enter valid tons.' : 'Please enter valid kWR.'
      );
    }

    if (unitType === 'English') {
      if (num < 10 || num > 8000 || /^0\d+/.test(value)) {
        return Promise.reject('Tons must be between 10 and 8000.');
      }
    }
    // else if (unitType === 'SI Metric') {
    //   if (num < 28.128 || num > 35 || /^0\d+/.test(value)) {
    //     return Promise.reject('kWR must be between 28.128 and 35.');
    //   }
    // }

    return Promise.resolve();
  };
};

export const getUnitValidatorForEfficiency = (unitType: 'English' | 'SI Metric') => {
  return (_: any, value: string) => {
    if (value === undefined || value === null || value === '') {
      return Promise.resolve(); // handled by required rule
    }

    const num = parseFloat(value);

    if (!/^\d+(\.\d+)?$/.test(value)) {
      return Promise.reject('Please enter valid efficiency rating.');
    }

    if (unitType === 'English') {
      if (num < 0.3 || num > 3 || /^0\d+/.test(value)) {
        return Promise.reject('kW/ton - Value Must be between 0.3 and 3.');
      }
    } else if (unitType === 'SI Metric') {
      if (num < 3 || num > 12 || /^0\d+/.test(value)) {
        return Promise.reject('COP - Value must be between 3 and 12.');
      }
    }

    return Promise.resolve();
  };
};

export const allowTonsKwr = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

  const isControlKey = allowedKeys.includes(e.key);
  const isNumber = /^[0-9]$/.test(e.key);
  const isDot = e.key === '.';

  const input = e.currentTarget;
  const value = input.value || '';
  const selectionStart = input.selectionStart ?? value.length;
  const hasDot = value.includes('.');

  // Disallow:
  // - if not number or control or dot
  // - if already has dot and dot is pressed again
  if (!isNumber && !isControlKey && (!isDot || hasDot)) {
    e.preventDefault();
    return;
  }

  // Limit to 4 digits after the decimal
  const dotIndex = value.indexOf('.');
  if (dotIndex !== -1 && selectionStart > dotIndex && isNumber) {
    const decimals = value.slice(dotIndex + 1);
    if (decimals.length >= 4) {
      e.preventDefault();
    }
  }
};

export const validatePhoneNumber = async (_: any, value: string) => {
  if (value) {
    const phoneNumber = value.replace(/\D/g, ''); // Remove non-digit characters
    if (phoneNumber.length !== 10) {
      return Promise.reject(new Error('Please enter valid phone number.'));
    }
  } else {
    return Promise.reject(new Error('Please enter phone number.'));
  }
};

export function formatPhoneNumberInUsFormat(value: string) {
  if (!value) return '-';
  const match = value.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+1 ${match[1]} ${match[2]} ${match[3]}`;
  }
  return value;
}

export const validateDesignVoltage = (fieldName: string = '', min = 0, max = Infinity) => {
  return (_: any, value: string) => {
    if (!value || value.trim() === '') {
      return Promise.reject(new Error(`Please enter ${fieldName}.`));
    }

    const decimalRegex = /^\d+(\.\d+)?$/; // allows 0, 0.1, 10.25, etc.

    if (!decimalRegex.test(value)) {
      return Promise.reject(new Error(`Please enter valid ${fieldName}.`));
    }

    const num = parseFloat(value);

    if (isNaN(num) || num < min || num > max) {
      return Promise.reject(
        new Error(
          `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be between ${min} and ${max}.`
        )
      );
    }

    if (!decimalRegex.test(value)) {
      return Promise.reject(new Error(`Please enter valid ${fieldName}.`));
    }

    return Promise.resolve();
  };
};

export const hasPermission = (
  module: string,
  action: 'add' | 'edit' | 'view' | 'toggleStatus'
): boolean => {
  const { userData } = authStore.getState();
  const { role = '', permissions = {} } = userData;
  if (role && role === USER_ROLES.ADMIN) return true;
  return !!permissions?.[module]?.[action];
};

export const validateLogFieldWithMinMax = (fieldName: string = '', min = 0, max = Infinity) => {
  console.log('max: ', max);
  console.log('min: ', min);
  return (_: any, value: string) => {
    if (!value || !value?.trim()) return Promise.reject(new Error(`Please enter ${fieldName}.`));
    if (value === '-' || value === '.' || value === '-.') {
      return Promise.reject(new Error(`Please enter valid ${fieldName}.`));
    }
    const num = parseFloat(value);

    if (isNaN(num)) {
      return Promise.reject(new Error(`Please enter valid ${fieldName}.`));
    }

    const decimalRegex = /^-?\d+(\.\d+)?$/; // allows 0, 0.1, 10.25, etc.

    if (!decimalRegex.test(value)) {
      return Promise.reject(new Error(`Please enter valid ${fieldName}.`));
    }

    // if (isNaN(num) || num < min || num > max) {
    //   return Promise.reject(
    //     new Error(
    //       `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be between ${min} and ${max}.`
    //     )
    //   );
    // }

    return Promise.resolve();
  };
};

export const validateCommonLogFields = (fieldLabel: string) => {
  return (_: any, value: string) => {
    if (!value || !value.trim()) return Promise.reject(new Error(`Please enter ${fieldLabel}.`));

    if (value === '-' || value === '.' || value === '-.') {
      return Promise.reject(new Error(`Please enter valid ${fieldLabel}.`));
    }

    const validNumberRegex = /^-?\d+(\.\d+)?$/;
    if (!validNumberRegex.test(value)) {
      return Promise.reject(new Error(`Please enter valid ${fieldLabel}.`));
    }

    const num = Number(value);
    if (isNaN(num)) {
      return Promise.reject(new Error(`Please enter valid ${fieldLabel}.`));
    }

    return Promise.resolve();
  };
};

export const allowOnlyNonNegativeInteger = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];

  if (
    allowedKeys.includes(e.key) ||
    (e.ctrlKey && (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 'x'))
  ) {
    return;
  }

  // Block if key is not a digit
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
};

export const validateNonNegativeInteger = (fieldLabel: string) => {
  return (_: any, value: string) => {
    if (!value || !value?.trim()) return Promise.reject(new Error(`Please enter ${fieldLabel}.`));

    const intValue = Number(value);

    if (!/^\d+$/.test(value)) {
      return Promise.reject(new Error(`Please enter valid ${fieldLabel}.`));
    }

    if (isNaN(intValue) || intValue < 0) {
      return Promise.reject(new Error(`${fieldLabel} must be 0 or a positive integer.`));
    }

    return Promise.resolve();
  };
};

export const generateColors = (count: number) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i); // evenly spaced hues
    const border = `hsl(${hue}, 85%, 50%)`; // bright color
    const bg = `hsla(${hue}, 85%, 50%, 0.1)`; // transparent background
    colors.push({ bg, border });
  }
  return colors;
};
