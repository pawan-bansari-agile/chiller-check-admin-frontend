// Env variables
export const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;
export const APP_NAME = import.meta.env.VITE_REACT_APP_NAME;
export const APP_SECRET = import.meta.env.VITE_REACT_APP_SECRET;

// Local Storage Variables
export const LocalStorageKeys = {
  USER: `user${APP_NAME}`,
  AUTH_TOKEN: `authToken${APP_NAME}`,
  AUTH_SESSION: (id: string) => `authSession-${id}`,
  DEVICE_ID: `deviceId`
};

export const QueryParamKey = {
  sessionId: 'sessionId'
};

export const DEVICE_TYPE = {
  WEB: 'web'
};

export const PATTERNS = {
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,64}$/
};
