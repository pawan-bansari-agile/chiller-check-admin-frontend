// Env variables
export const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;
export const APP_NAME = import.meta.env.VITE_REACT_APP_NAME;
export const APP_SECRET = import.meta.env.VITE_REACT_APP_SECRET;
export const IMAGE_URL = import.meta.env.VITE_REACT_APP_IMAGE_URL;
export const GOOGLE_KEY = import.meta.env.VITE_REACT_APP_GOGGLE_PLACE_KEY;

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

export const CMS_TYPE = {
  PRIVACY_POLICY: 'privacyPolicy',
  TERMS_CONDITION: 'termsAndCond'
};

export const PATTERNS = {
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,64}$/,
  VALID_NAMES: /^[A-Za-z]+$/,
  BLANK_SPACE: /^(?!\s)(?!.*\s$)(?!\s+$).+/,
  ZIP_CODE: /^[0-9]{5}$/
};

export const defaultQueryOptions = {
  staleTime: Infinity,
  refetchInterval: 10 * 60 * 1000 // 10 minutes
};

export const IMAGE_MODULE_NAME = {
  PROFILE_PIC: 'profilePic'
};

export const USER_ROLES = {
  ADMIN: 'admin'
};

export const STATES = [
  { label: 'Alabama', value: 'Alabama' },
  { label: 'Alaska', value: 'Alaska' },
  { label: 'Arizona', value: 'Arizona' },
  { label: 'Arkansas', value: 'Arkansas' },
  { label: 'California', value: 'California' },
  { label: 'Colorado', value: 'Colorado' },
  { label: 'Connecticut', value: 'Connecticut' },
  { label: 'Delaware', value: 'Delaware' },
  { label: 'Florida', value: 'Florida' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Hawaii', value: 'Hawaii' },
  { label: 'Idaho', value: 'Idaho' },
  { label: 'Illinois', value: 'Illinois' },
  { label: 'Indiana', value: 'Indiana' },
  { label: 'Iowa', value: 'Iowa' },
  { label: 'Kansas', value: 'Kansas' },
  { label: 'Kentucky', value: 'Kentucky' },
  { label: 'Louisiana', value: 'Louisiana' },
  { label: 'Maine', value: 'Maine' },
  { label: 'Maryland', value: 'Maryland' },
  { label: 'Massachusetts', value: 'Massachusetts' },
  { label: 'Michigan', value: 'Michigan' },
  { label: 'Minnesota', value: 'Minnesota' },
  { label: 'Mississippi', value: 'Mississippi' },
  { label: 'Missouri', value: 'Missouri' },
  { label: 'Montana', value: 'Montana' },
  { label: 'Nebraska', value: 'Nebraska' },
  { label: 'Nevada', value: 'Nevada' },
  { label: 'New Hampshire', value: 'New Hampshire' },
  { label: 'New Jersey', value: 'New Jersey' },
  { label: 'New Mexico', value: 'New Mexico' },
  { label: 'New York', value: 'New York' },
  { label: 'North Carolina', value: 'North Carolina' },
  { label: 'North Dakota', value: 'North Dakota' },
  { label: 'Ohio', value: 'Ohio' },
  { label: 'Oklahoma', value: 'Oklahoma' },
  { label: 'Oregon', value: 'Oregon' },
  { label: 'Pennsylvania', value: 'Pennsylvania' },
  { label: 'Rhode Island', value: 'Rhode Island' },
  { label: 'South Carolina', value: 'South Carolina' },
  { label: 'South Dakota', value: 'South Dakota' },
  { label: 'Tennessee', value: 'Tennessee' },
  { label: 'Texas', value: 'Texas' },
  { label: 'Utah', value: 'Utah' },
  { label: 'Vermont', value: 'Vermont' },
  { label: 'Virginia', value: 'Virginia' },
  { label: 'Washington', value: 'Washington' },
  { label: 'West Virginia', value: 'West Virginia' },
  { label: 'Wisconsin', value: 'Wisconsin' },
  { label: 'Wyoming', value: 'Wyoming' },
  { label: 'District of Columbia', value: 'District of Columbia' },
  { label: 'American Samoa', value: 'American Samoa' },
  { label: 'Guam', value: 'Guam' },
  { label: 'Northern Mariana Islands', value: 'Northern Mariana Islands' },
  { label: 'Puerto Rico', value: 'Puerto Rico' },
  { label: 'U.S. Virgin Islands', value: 'U.S. Virgin Islands' }
];

export const STATE_OPTIONS = Object.entries(STATES).map(([label]) => ({
  label,
  value: label
}));

export const statusType = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEMO: 'demo',
  PROSPECT: 'prospect'
};

export const TIMEZONE_OPTIONS = [
  { value: 'EST', label: 'EST' },
  { value: 'PST', label: 'PST' },
  { value: 'IST', label: 'IST' },
  { value: 'MST', label: 'MST' },
  { value: 'AKST', label: 'AKST' },
  { value: 'HAST', label: 'HAST' }
];

export const ALTITUDE_OPTIONS = [
  { value: 'meter', label: 'Meter' },
  { value: 'feet', label: 'Feet' }
];
