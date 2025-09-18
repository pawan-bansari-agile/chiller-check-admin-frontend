export interface IUserObj {
  name: string;
  age: number;
  firstName: string;
  lastName: string;
}

export interface IUser {
  _id: string;
  email: string;
  phoneNumber: string;
  role: string;
  profileImage: string;
  isActive: boolean;
  companyId: string;
  facilityIds: any[];
  createdAt: string;
  facilities: any[];
  name: string;
}

export interface IUserListRes {
  userList: IUser[];
  totalRecords: number;
}

export interface IUserAddReq {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  profileImage?: string;
  permissions?: Permissions;
  companyId?: string;
  facilityIds?: string[];
  chillerIds?: string[];
  alerts?: Alerts;
}

export interface Permissions {
  facility?: Status;
  users?: Status;
  chiller?: Status;
  chillerBulkCost?: Status;
  company?: Status;
  log?: Status;
  report?: Status;
  setting?: Status;
  maintenance?: Status;
}

export interface Status {
  view?: boolean;
  add?: boolean;
  edit?: boolean;
  toggleStatus?: boolean;
}

export interface Alerts {
  general?: General[];
  logs?: Log[];
  notifyBy?: string;
}

export interface General {
  metric?: string;
  warning?: Warning;
  alert?: Alert;
}

export interface Warning {
  operator?: string;
  threshold?: number;
}

export interface Alert {
  operator?: string;
  threshold?: number;
}

export interface Log {
  type?: string;
  daysSince?: number;
  notifyBy?: string;
}
