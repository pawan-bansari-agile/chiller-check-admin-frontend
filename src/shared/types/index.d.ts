// Can vary depending on your BE response
export interface IApiSuccess<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface IApiError {
  message: string;
  statusCode: number;
  endpoint?: string;
  timestamp?: string;
}

export interface SetParamOptions {
  page?: number;
  limit?: number;
  companyId?: string;
  search?: string;
  sort_by?: string;
  sort_order?: string;
  facilityId?: string;
  role?: string;
  userId?: string;
  peakLoad?: boolean;
  chillerId?: string;
  parameter?: string;
}
