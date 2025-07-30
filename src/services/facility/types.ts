export interface IGetFacilityListRes {
  facilityList: IFacilityListData[];
  totalRecords: number;
}

export interface IFacilityListData {
  _id: string;
  companyId?: string;
  name: string;
  address: string;
  timezone: string;
  altitude: number;
  altitudeUnit: string;
  totalChiller: number;
  totalOperators: number;
  isActive: boolean;
  createdAt: string;
  companyName?: string;
}

export interface IFacilityViewRes {
  _id: string;
  companyId: string;
  companyName: string;
  facilityCode: number;
  chillerNo?: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  timezone: string;
  isActive: boolean;
  isDeleted: boolean;
  totalChiller: number;
  totalOperators: number;
  altitude: number;
  altitudeUnit: string;
  createdAt: string;
  chillers: ChillerData[] | [];
  address: string;
}

export interface ChillerData {
  _id: string;
  companyId: string;
  facilityId: string;
  type: string;
  unit: string;
  name: string;
  weeklyHours: number;
  weeksPerYear: number;
  avgLoadProfile: number;
  make: number;
  ChillerNo?: string;
  model: string;
  isActive: boolean;
  isDeleted: boolean;
  serialNumber: string;
  manufacturedYear: number;
  tons?: number;
  kwr?: number;
  energyCost: number;
  refrigType: string;
  HighPressureRefrig: boolean;
  UseEvapRefrigTemp: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IAddChillerReq {
  _id?: string;
  companyId: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  timezone: string;
  altitude: number;
  altitudeUnit: string;
  chillers: Chiller[] | [];
}

export interface Chiller {
  companyId?: string;
  unit?: string;
  name: string;
  weeklyHours: number;
  weeksPerYear: number;
  avgLoadProfile: number;
  desInletWaterTemp?: string;
  make: string;
  model: string;
  serialNumber: string;
  manufacturedYear: number;
  refrigType: string;
  kwr?: number;
  tons?: number;
  efficiencyRating?: number;
  energyCost: number;
}

export interface IGetAllFacilityList {
  _id: string;
  companyId: string;
  name: string;
}
