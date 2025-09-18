export interface IProfileRes {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  isDeleted: boolean;
  facilityIds: any[];
  createdAt: string;
  updatedAt: string;
  lastLoginTime: string;
  profileImage: string;
  __v: number;
  phoneNumber: string;
  resetPasswordExpires: string;
  resetPasswordToken: string;
  failedLoginAttempts: number;
  lastFailedLoginAttempt: any;
  permissions?: any;
  chillers?: any;
  chillerIds?: any[];
  facilities?: any;
  alerts?: any;
  company?: any;
  alertFacilities?: any[];
  alertOperators?: any[];
}

export interface IUpdateProfile {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: string;
  profileImage: string;
}

export interface IUpdateProfileReq {
  id: string;
  updatePayload: IUpdateProfile;
}

export interface IUpdateProfileRes {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  resetPasswordExpires: any;
  resetPasswordToken: any;
  facilityIds: any[];
  failedLoginAttempts: number;
  lastFailedLoginAttempt: any;
  lastLoginTime: string;
  profileImage: string;
  message?: string;
}
