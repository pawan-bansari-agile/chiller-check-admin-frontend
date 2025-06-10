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
