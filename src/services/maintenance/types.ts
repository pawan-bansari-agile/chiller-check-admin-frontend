export interface IAddMaintenanceReq {
  id?: string;
  companyId: string;
  facilityId: string;
  chillerId: string;
  maintenanceType: string;
  maintenanceCategory: string;
  updatedBy?: string;
  maintenanceDate?: string;
  maintenanceTime?: string;
  maintenanceTimeZone: string;
  maintDescription?: string;
  maintQuantity?: number;
  comments: string;
  fileName: string;
  purgeReading?: number;
  fileRealName: string;
  fileSize: number | null;
}

export interface IMaintenanceListRes {
  maintenanceList: MaintenanceList[];
  totalRecords: number;
}

export interface MaintenanceList {
  _id: string;
  companyId: string;
  facilityId: string;
  chillerId: string;
  maintenanceType: string;
  maintenanceCategory: string;
  maintenanceDate: string;
  comments: string;
  createdBy: string;
  updatedBy: string;
  fileName: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  chiller: Chiller;
  facility: Facility;
  company: Company;
  createdByUser: CreatedByUser;
  chillerLabel: string;
  chillerName: string;
  createdByName: string;
}

export interface Chiller {
  _id: string;
  companyId: string;
  facilityId: string;
  type: string;
  unit: string;
  ChillerNo: string;
  weeklyHours: number;
  weeksPerYear: number;
  avgLoadProfile: number;
  desInletWaterTemp: string;
  make: string;
  model: string;
  status: string;
  isDeleted: boolean;
  serialNumber: string;
  manufacturedYear: number;
  tons: number;
  kwr: any;
  efficiencyRating: number;
  energyCost: number;
  refrigType: string;
  highPressureRefrig: boolean;
  useEvapRefrigTemp: boolean;
  designVoltage: number;
  voltageChoice: string;
  fullLoadAmps: number;
  ampChoice: string;
  condDPDrop: number;
  condDPDropUnit?: string;
  condPressureUnit: string;
  condAPDropUnit: string;
  condApproach: number;
  evapDPDrop: number;
  evapDPDropUnit: string;
  evapPressureUnit: string;
  evapAPDropUnit: string;
  evapApproach: number;
  evapDOWTemp: number;
  compOPIndicator: string;
  userNote: string;
  havePurge: boolean;
  maxPurgeTime: number;
  purgeReadingUnit: string;
  haveBearingTemp: boolean;
  useRunHours: string;
  oilPresHighUnit: string;
  oilPresLowUnit: string;
  oilPresDifUnit: string;
  condDesignDeltaT: number;
  condDesignFlow: number;
  evapDesignDeltaT: number;
  evapDesignFlow: number;
  numberOfCompressors: number;
  useLoad: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Facility {
  _id: string;
  companyId: string;
  facilityCode: number;
  name: string;
  address1: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  timezone: string;
  isActive: boolean;
  isDeleted: boolean;
  totalChiller: number;
  totalOperators: number;
  altitude: number;
  altitudeUnit: string;
  chillers: string[];
  createdAt: string;
  updatedAt: string;
  address2: string;
}

export interface Company {
  _id: string;
  companyCode: number;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  website: string;
  totalFacilities: number;
  facilities: string[];
  totalChiller: number;
  isAssign: boolean;
  status: string;
  isDeleted: boolean;
  trialReminderSent: boolean;
  createdAt: string;
  updatedAt: string;
  freeTrialEndDate: string;
  freeTrialStartDate: string;
}

export interface CreatedByUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  isActive: boolean;
  isDeleted: boolean;
  isProfileUpdated: boolean;
  facilityIds: any[];
  chillerIds: any[];
  failedLoginAttempts: number;
  alerts: Alerts;
  createdAt: string;
  updatedAt: string;
  lastLoginTime: string;
  lastFailedLoginAttempt: any;
  profileImage: string;
}

export interface Alerts {
  general: General;
  logs: any[];
}

export interface General {
  conditions: any[];
}

export interface IViewMaintenance {
  _id: string;
  companyId: string;
  facilityId: string;
  chillerId: string;
  maintenanceType: string;
  maintenanceCategory: string;
  maintenanceDate: string;
  purgeReading?: number;
  comments: string;
  ChillerNo?: string;
  maintDescription?: string;
  maintQuantity?: number;
  createdBy: string;
  updatedBy: string;
  fileName: string;
  fileRealName: string;
  fileSize: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  chiller: Chiller;
  facility: Facility;
  company: Company;
  createdByUser: CreatedByUser;
  chillerLabel: string;
  chillerName: string;
  createdByName: string;
}
