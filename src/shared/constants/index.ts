// Env variables
export const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;
export const APP_NAME = import.meta.env.VITE_REACT_APP_NAME;
export const APP_SECRET = import.meta.env.VITE_REACT_APP_SECRET;
export const IMAGE_URL = import.meta.env.VITE_REACT_APP_IMAGE_URL;
export const GOOGLE_KEY = import.meta.env.VITE_REACT_APP_GOGGLE_PLACE_KEY;
export const TERMS_LINK = import.meta.env.VITE_REACT_APP_CMS_LINK_TERMS;
export const PRIVACY_LINK = import.meta.env.VITE_REACT_APP_CMS_LINK_PRIVACY;
export const CONTACT_LINK = import.meta.env.VITE_REACT_APP_CMS_LINK_CONTACT;
export const APP_ENV = import.meta.env.VITE_REACT_APP_ENV;
export const FIREBASE_API_KEY = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY;
export const FIREBASE_APP_ID = import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID;
export const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN;
export const FIREBASE_PROJECT_ID = import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID;
export const FIREBASE_SENDER_ID = import.meta.env.VITE_REACT_APP_FIREBASE_SENDER_ID;
export const FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET;
export const FIREBASE_VAPID_KEY = import.meta.env.VITE_REACT_APP_FIREBASE_VAPID_KEY;

// Local Storage Variables
export const LocalStorageKeys = {
  USER: `user${APP_NAME}`,
  AUTH_TOKEN: `authToken${APP_NAME}`,
  AUTH_SESSION: (id: string) => `authSession-${id}`,
  DEVICE_ID: `deviceId`,
  EXCEL_FILE: 'excelFile',
  FILE_TYPE: 'fileType',
  FCM_TOKEN: 'fcmToken'
};

export const ENVIRONMENT = {
  DEV: 'development',
  PROD: 'production',
  LOCAL: 'local'
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
  ZIP_CODE: /^(?! )(?:\d{5}(?:-\d{4})?|[A-Za-z]\d[A-Za-z](?: ?\d[A-Za-z]\d))(?! )$/
};

export const defaultQueryOptions = {
  staleTime: Infinity,
  refetchInterval: 10 * 60 * 1000 // 10 minutes
};

export const IMAGE_MODULE_NAME = {
  PROFILE_PIC: 'profilePic',
  MAITENANCE: 'maintenanceFiles'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  SUB_ADMIN: 'subAdmin',
  CORPORATE_MANAGER: 'corporateManager',
  FACILITY_MANAGER: 'facilityManager',
  OPERATOR: 'operator'
};

export enum ParameterType {
  'Percentage Loss' = 'Percentage Loss',
  'Loss Cost' = 'Loss Cost',
  'kWh Loss' = 'kWh Loss',
  'Avg. Excess Cond. Approach' = 'Avg. Excess Cond. Approach',
  'Avg. Excess Evap. Approach' = 'Avg. Excess Evap. Approach',
  'Avg. Other Losses' = 'Avg. Other Losses'
}

export enum ChartType {
  'Line Chart' = 'Line Chart',
  'Bar Chart' = 'Bar Chart'
}

export enum DateRange {
  'This Week' = 'This week',
  'This Month' = 'This month',
  'Quarter' = 'Quarter',
  '6 Months' = '6 months',
  'This Year' = 'This year',
  'Last Year' = 'Last year',
  'Last 2 Years' = 'Last 2 years',
  'Last 5 Years' = 'Last 5 years',
  'Custom Range' = 'Custom Range'
}

export enum NotificationType {
  WEB = 'Web',
  EMAIL = 'Email',
  BOTH = 'Both'
}

export const enumToDropdownOptions = <T extends Record<string, string>>(enumObj: T) =>
  Object.values(enumObj).map((value) => ({
    label: value,
    value
  }));

// Usage
export const parameterTypeOptions = enumToDropdownOptions(ParameterType);
export const chartTypeOptions = enumToDropdownOptions(ChartType);
export const dateRangeOptions = enumToDropdownOptions(DateRange);
export const notificationOptions = enumToDropdownOptions(NotificationType);

export const CHART_DROPDOWN = [
  {
    label: 'All Facility',
    value: 'facility'
  },
  {
    label: 'All Chillers',
    value: 'chiller'
  }
];

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
  { label: 'U.S. Virgin Islands', value: 'U.S. Virgin Islands' },
  { label: 'Alberta', value: 'Alberta' },
  { label: 'British Columbia', value: 'British Columbia' },
  { label: 'Manitoba', value: 'Manitoba' },
  { label: 'New Brunswick', value: 'New Brunswick' },
  { label: 'Newfoundland and Labrador', value: 'Newfoundland and Labrador' },
  { label: 'Northwest Territories', value: 'Northwest Territories' },
  { label: 'Nova Scotia', value: 'Nova Scotia' },
  { label: 'Nunavut', value: 'Nunavut' },
  { label: 'Ontario', value: 'Ontario' },
  { label: 'Prince Edward Island', value: 'Prince Edward Island' },
  { label: 'Quebec', value: 'Quebec' },
  { label: 'Saskatchewan', value: 'Saskatchewan' },
  { label: 'Yukon', value: 'Yukon' }
];

export const COUNTRY = [
  { label: 'USA', value: 'US' },
  { label: 'Canada', value: 'CA' }
];

export const MAINTENANCE_CATEGORIES = [
  {
    id: 1,
    name: 'Annual Maintenance',
    types: ['Annual Maintenance Date']
  },
  {
    id: 2,
    name: 'Oil Maintenance',
    types: ['Oil Change Date', 'Date Oil Added', 'Oil Filter Change Date', 'Oil Analysis Date']
  },
  {
    id: 3,
    name: 'Eddy Current Tests',
    types: ['Eddy Current Test Date (Condenser)', 'Eddy Current Test Date (Evaporator)']
  },
  {
    id: 4,
    name: 'Major Stop Inspection (compressor teardown)',
    types: ['Major Stop Inspection']
  },
  {
    id: 5,
    name: 'Refrigerant Maintenance',
    types: ['Refrigerant Analysis Date', 'Date Refrigerant Added']
  },
  {
    id: 6,
    name: 'Tube Cleaning',
    types: ['Condenser Tube Cleaning Date', 'Evaporator Tube Cleaning Date']
  },
  {
    id: 7,
    name: 'Purge Maintenance',
    types: ['Purge Tank Reclaim Date', 'Purge Filter Dryer Change Date']
  },
  {
    id: 8,
    name: 'Major Repairs',
    types: ['Major Repair']
  },
  {
    id: 9,
    name: 'Running Inspection',
    types: ['Running Inspection']
  },
  {
    id: 10,
    name: 'Vibration Analysis',
    types: ['Vibration Analysis']
  }
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

export enum ALERT_TYPE {
  ALERT = 'alert',
  WARNING = 'warning',
  NORMAL = 'normal'
}

export const TIMEZONE_OPTIONS = [
  { value: 'EST', label: 'EST' },
  { value: 'CST', label: 'CST' },
  { value: 'MST', label: 'MST' },
  { value: 'PST', label: 'PST' },
  { value: 'AKST', label: 'AKST' },
  { value: 'HST', label: 'HST' }, // corrected (instead of HAST)
  { value: 'AST', label: 'AST' }, // Atlantic (Canada + US Territories)
  { value: 'NST', label: 'NST' } // Newfoundland (Canada only)
];

export enum TimezoneEnum {
  EST = 'America/New_York', // Eastern
  CST = 'America/Chicago', // Central
  MST = 'America/Denver', // Mountain
  PST = 'America/Los_Angeles', // Pacific
  AKST = 'America/Anchorage', // Alaska
  HST = 'Pacific/Honolulu', // Hawaii
  AST = 'America/Halifax', // Atlantic (Canada)
  NST = 'America/St_Johns' // Newfoundland
}

export const ALTITUDE_OPTIONS = [
  { value: 'meter', label: 'Meter' },
  { value: 'feet', label: 'Feet' }
];

export const MAKE = [
  { label: 'Trane', value: 'Trane' },
  { label: 'Carrier', value: 'Carrier' },
  { label: 'York', value: 'York' },
  { label: 'McQuay', value: 'McQuay' },
  { label: 'Westinghouse', value: 'Westinghouse' },
  { label: 'Dunham-Bush', value: 'Dunham-Bush' },
  { label: 'FES', value: 'FES' },
  { label: 'Sullair', value: 'Sullair' },
  { label: 'Arctic Cool', value: 'Arctic Cool' },
  { label: 'Multistack', value: 'Multistack' },
  { label: 'Daikin', value: 'Daikin' }
];

export const MEASUREMENT_UNITS = [
  { label: 'US/English', value: 'English' },
  { label: 'SI/Metric', value: 'SI Metric' }
];

export const DES_INLET_WATER_TEMP = [
  { label: '85°F / 29.44°C', value: '85°F / 29.44°C' },
  { label: '86°F / 30°C', value: '86°F / 30°C' }
];

export const Design_Condenser_Water_Pressure_Drop_English = [
  { label: 'PSIG', value: 'PSIG' },
  { label: 'Feet', value: 'Feet' }
];

export const Design_Condenser_Water_Pressure_Drop_SI_Metric = [
  { label: 'KPA', value: 'KPA' },
  { label: 'Bar', value: 'Bar' }
];

export const Actual_Condenser_Water_Pressure_Drop_English = [
  { label: 'PSIG', value: 'PSIG' },
  { label: 'PSIA', value: 'PSIA' },
  { label: 'InHg', value: 'InHg' }
];

export const Actual_Condenser_Water_Pressure_Drop_SI_Metric = [
  { label: 'KPA', value: 'KPA' },
  { label: 'Bar', value: 'Bar' }
];

export const VOLTAGE_CHOICE = [
  { label: '3-Phase', value: '3-Phase' },
  { label: '1-Phase', value: '1-Phase' },
  { label: 'Do Not Log Voltage', value: 'Do Not Log Voltage' }
];
export const AMPERAGE_CHOICE = [
  { label: '3-Phase', value: '3-Phase' },
  { label: '1-Phase', value: '1-Phase' },
  { label: 'Enter % Load', value: 'Enter % Load' }
];

export const OIL_PRESSURE_DIFF = [
  { label: 'Enter High and Low Pressures', value: 'Enter High and Low Pressures' },
  { label: 'Enter High Pressure Only', value: 'Enter High Pressure Only' },
  { label: 'Enter Differential Directly', value: 'Enter Differential Directly' },
  { label: 'Do Not Log Lube System', value: 'Do Not Log Lube System' }
];

export const AVERAGE_EFFICIENCY_LOSS = [
  {
    label: 'Run Hours (Log reading must include Run Hours)',
    value: 'Run Hours (Log reading must include Run Hours)'
  },
  { label: 'Days', value: 'Days' }
];

export const NUMBER_OF_COMPRESSOR = [
  {
    label: '1',
    value: '1'
  },
  { label: '2', value: '2' }
];

export const PURGE_READING_UNIT = [
  { label: 'Mins. Only', value: 'Mins. Only' },
  { label: 'Hrs. & Min.', value: 'Hrs. & Min.' }
];

const currentYear = new Date().getFullYear();

export const yearOptions = Array.from({ length: currentYear - 1965 + 1 }, (_, i) => {
  const year = 1965 + i;
  return { label: year, value: year };
});

export const refrigerantOptions = [
  { label: 'R-11', value: 'R-11' },
  { label: 'R-113', value: 'R-113' },
  { label: 'R-12', value: 'R-12' },
  { label: 'R-123', value: 'R-123' },
  { label: 'R-134a', value: 'R-134a' },
  { label: 'R-22', value: 'R-22' },
  { label: 'R-500', value: 'R-500' },
  { label: 'R-114', value: 'R-114' },
  { label: 'R-514A', value: 'R-514A' }
];

export const Role = [
  { label: 'Admin', value: 'admin' },
  { label: 'Sub Admin', value: 'subAdmin' },
  { label: 'Company Manager', value: 'corporateManager' },
  { label: 'Facility Manager', value: 'facilityManager' },
  { label: 'Operator', value: 'operator' }
];

export const USER_ADD_ROLE = [
  { label: 'Sub Admin', value: 'subAdmin' },
  { label: 'Company Manager', value: 'corporateManager' },
  { label: 'Facility Manager', value: 'facilityManager' },
  { label: 'Operator', value: 'operator' }
];

interface Module {
  key: string;
  label: string;
  actions: string[];
}

export const MODULES_BY_ROLE: Record<string, Module[]> = {
  subAdmin: [
    {
      key: 'company',
      label: 'Company Management',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    {
      key: 'facility',
      label: 'Facility Management',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    {
      key: 'chiller',
      label: 'Chiller Management',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    { key: 'chillerBulkCost', label: 'Chiller Bulk Cost', actions: ['view', 'edit'] },
    { key: 'users', label: 'User Management', actions: ['view', 'add', 'edit', 'toggleStatus'] },
    {
      key: 'log',
      label: 'Log Entries Management',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    {
      key: 'maintenance',
      label: 'Maintenance Entries',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    { key: 'report', label: 'Reports', actions: ['view', 'add', 'edit'] },
    { key: 'setting', label: 'Setting', actions: ['view', 'edit'] }
  ],
  corporateManager: [
    {
      key: 'facility',
      label: 'Facility Management',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    {
      key: 'chiller',
      label: 'Chiller Management',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    { key: 'users', label: 'User Management', actions: ['view', 'add', 'edit', 'toggleStatus'] },
    {
      key: 'log',
      label: 'Log Entries Management',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    {
      key: 'maintenance',
      label: 'Maintenance Entries',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    { key: 'report', label: 'Reports', actions: ['view', 'add', 'edit'] }
  ],
  facilityManager: [
    {
      key: 'chiller',
      label: 'Chiller Management',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    { key: 'users', label: 'User Management', actions: ['view', 'add', 'edit', 'toggleStatus'] },
    {
      key: 'log',
      label: 'Log Entries Management',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    {
      key: 'maintenance',
      label: 'Maintenance Entries',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    { key: 'report', label: 'Reports', actions: ['view', 'add', 'edit'] }
  ],
  operator: [
    {
      key: 'log',
      label: 'Log Entries Management',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    {
      key: 'maintenance',
      label: 'Maintenance Entries',
      actions: ['view', 'add', 'edit', 'toggleStatus']
    },
    { key: 'report', label: 'Reports', actions: ['view', 'add', 'edit'] }
  ]
};

export const ALert = [
  { label: '>', value: '>' },
  { label: '<', value: '<' },
  { label: '>=', value: '>=' },
  { label: '<=', value: '<=' },
  { label: '=', value: '=' }
];

interface LogConfig {
  type: string;
  label: string;
  index: number;
}

export const logConfigs: LogConfig[] = [
  {
    type: 'manual',
    label: 'Days since last manual log entry for all chillers under the user.',
    index: 0
  },
  {
    type: 'maintenance',
    label: 'Days since last maintenance entry for all chillers under the user.',
    index: 1
  },
  {
    type: 'csv',
    label: 'Days since last CSV/Auto log entry for all chillers under the user.',
    index: 2
  },
  {
    type: 'program',
    label: 'Days since last program access',
    index: 3
  }
];

export const getDefaultLogs = () =>
  logConfigs.map(({ type }) => ({
    type,
    daysSince: undefined,
    notifyBy: []
  }));
