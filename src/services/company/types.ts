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
  address: string;
  totalOperators: number;
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
