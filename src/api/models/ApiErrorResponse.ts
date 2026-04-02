export interface ApiError {
  status: string;
  code: string;
  title: string;
  detail?: string;
}

export interface ApiErrorResponse {
  errors: ApiError[];
  meta?: {
    requestId?: string;
  };
}
