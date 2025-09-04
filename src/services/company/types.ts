import { LatestLog } from '../chiller/types';

export interface IGetCompanyListRes {
  companyList: ICompanyListData[];
  totalRecords: number;
}

export interface ICompanyListData {
  _id: string;
  address: string;
  companyCode: number;
  website: string;
  isDeleted: boolean;
  name: string;
  createdAt: string;
  totalFacilities: number;
  totalChiller: number;
  isAssign: boolean;
  status: string;
}

export interface IGetCompanyView {
  _id: string;
  companyCode: number;
  name: string;
  website: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  totalFacilities: number;
  totalChiller: number;
  isAssign: boolean;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  facilities: Facility[];
  chillers: Chiller[];
  address: string;
  totalOperators: number;
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
  make: string;
  model: string;
  status: string;
  isDeleted: boolean;
  serialNumber: string;
  manufacturedYear: number;
  tons: number;
  energyCost: number;
  refrigType: string;
  highPressureRefrig: boolean;
  useEvapRefrigTemp: boolean;
  createdAt: string;
  updatedAt: string;
  facility: Facility;
  latestLog?: LatestLog;
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
  altitudeUnit: string;
  altitude: number;
  isDeleted: boolean;
  totalChiller: number;
  totalOperators: number;
  chillers: any[];
  createdAt: string;
  updatedAt: string;
}

export interface IAddCompanyReq {
  _id?: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  website: string;
  facilities: CompanyFacility[] | [];
}

export interface CompanyFacility {
  companyId?: string;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  timezone: string;
  altitude: number;
  altitudeUnit: string;
}

export interface IGetAllCompanyList {
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
  createdAt: string;
  updatedAt: string;
}

export interface IGetCompanyUnAssignedList {
  companyList: CompanyListUnAssigned[];
  totalRecords: number;
}

export interface CompanyListUnAssigned {
  _id: string;
  companyCode: number;
  name: string;
  website: string;
  totalFacilities: number;
  totalChiller: number;
  isAssign: boolean;
  status: string;
  createdAt: string;
  totalOperators: number;
}

export interface ICompanyActiveList {
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
  freeTrialStartDate: string;
}
