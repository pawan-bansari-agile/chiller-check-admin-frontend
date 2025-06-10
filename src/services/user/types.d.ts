export interface IUserObj {
  name: string;
  age: number;
  firstName: string;
  lastName: string;
}

export interface IUser {
  _id: string;
  depot: string;
  userName: string;
  mobileNo: string;
  point: number;
  createdDate: string;
  updatedDate: string;
}

export interface IUserListReq {
  page: number;
  limit: number;
  search?: string;
  column?: string;
  order?: string;
}

export interface IUserListRes {
  adminUserList: IUser[];
  total_records: number;
}
