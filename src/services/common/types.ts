export interface ICommonPagination {
  page: number;
  limit: number;
  search?: string;
  sort_order: string;
  sort_by: string;
  companyId?: string;
  facilityId?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  chillerId?: string;
  facilityIds?: string[] | [];
  userId?: string;
  peakLoad?: boolean;
  parameter?: string;
}
