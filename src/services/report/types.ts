export interface IAddReportReq {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  dateType: string;
  notification: string;
  parameter: string;
  chartType: string;
  companyId: string;
  facilityIds: string[];
  description: string;
  header: string;
  footer: string;
  sharedTo: { userId: string; interval: string }[] | [];
  createdBy?: string;
  updatedBy?: string;
}

export interface IReportsList {
  reports: Report[];
  totalRecords: number;
}

export interface Report {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  notification: string;
  parameter: string;
  chartType: string;
  companyId: string;
  facilityIds: string[];
  description: string;
  header: string;
  footer: string;
  sharedTo: { userId: string; interval: string }[] | [];
  createdBy: string;
  updatedBy: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  facility: Facility[];
  updatedByUser: UpdatedByUser;
  facilityNames: string[];
  updatedByName: string;
}

export interface Facility {
  _id: string;
  companyId: string;
  facilityCode: number;
  name: string;
  address1: string;
  address2: string;
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
}

export interface UpdatedByUser {
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
  profileImage?: string;
}

export interface Alerts {
  general: General;
  logs: any[];
}

export interface General {
  conditions: any[];
}

export interface INotifyUserListRes {
  userList: UserList[];
  totalRecords: number;
}

export interface UserList {
  _id: string;
  email: string;
  phoneNumber: string;
  role: string;
  profileImage: string;
  isActive: boolean;
  companyId: string;
  facilityIds: string[];
  createdAt: string;
  company: Company;
  facilities: Facility[];
  name: string;
  lastName?: string;
  firstName?: string;
}

export interface Company {
  name: string;
}

export interface Facility {
  name: string;
}

export interface IViewReportRes {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  notification: string;
  parameter: string;
  chartType: string;
  companyId: string;
  facilityIds: string[];
  description: string;
  header: string;
  footer: string;
  dateType: string;
  sharedTo: { userId: string; interval: string }[] | [];
  createdBy: string;
  updatedBy: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  createdByUser?: ReportUpdatedByUser;
  company: ReportCompany;
  facility: ReportFacility[];
  sharedUser: ReportSharedUser[];
  updatedByUser: ReportUpdatedByUser;
  facilityNames: string[];
  companyName: string;
  updatedByName: string;
  startDateISO: string;
  endDateISO: string;
  logs: any[];
}

export interface ReportCompany {
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

export interface ReportFacility {
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

export interface ReportSharedUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  profileImage: string;
  isActive: boolean;
  isDeleted: boolean;
  isProfileUpdated: boolean;
  companyId: string;
  facilityIds: string[];
  chillerIds: string[];
  failedLoginAttempts: number;
  permissions: Permissions;
  alerts: ReportAlerts;
  createdAt: string;
  updatedAt: string;
  resetPasswordExpires: any;
  resetPasswordToken: any;
  password: string;
  lastLoginTime: string;
  lastFailedLoginAttempt: any;
}

export interface Permissions {
  log: Log;
  maintenance: Maintenance;
  report: Report;
}

export interface Log {
  view: boolean;
  add: boolean;
  edit: boolean;
  toggleStatus: boolean;
}

export interface Maintenance {
  view: boolean;
  add: boolean;
  edit: boolean;
  toggleStatus: boolean;
}

export interface Report {
  view: boolean;
  add: boolean;
  edit: boolean;
  toggleStatus: boolean;
}

export interface ReportAlerts {
  general: ReportGeneral;
  logs: Log2[];
}

export interface ReportGeneral {
  conditions: Condition[];
}

export interface Condition {
  metric: string;
  warning: Warning;
  alert: Alert;
}

export interface Warning {
  operator: string;
  threshold: number;
}

export interface Alert {
  operator: string;
  threshold: number;
}

export interface Log2 {
  type: string;
  daysSince: number;
  notifyBy: string;
}

export interface ReportUpdatedByUser {
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
  alerts: Alerts2;
  createdAt: string;
  updatedAt: string;
  lastLoginTime: string;
  lastFailedLoginAttempt: any;
  profileImage: string;
}

export interface Alerts2 {
  general: General2;
  logs: any[];
}

export interface General2 {
  conditions: any[];
}
