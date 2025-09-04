export interface INotificationListRes {
  list: List[];
  totalRecords: number;
}

export interface List {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  data: Data;
  type: string;
  createdAt: string;
}

export interface Data {
  reportId?: string;
  facilityId?: string;
  companyId?: string;
  userId?: string;
  chillerId?: string;
  type: string;
}
