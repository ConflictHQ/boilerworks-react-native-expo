import { isAxiosError } from 'axios';

export const isNetworkError = (e: unknown): boolean =>
  isAxiosError(e) && !e.response && e.code !== 'ECONNABORTED';

export const isTimeoutError = (e: unknown): boolean =>
  isAxiosError(e) && e.code === 'ECONNABORTED';

export const isUnauthorizedError = (e: unknown): boolean =>
  isAxiosError(e) && e.response?.status === 401;

export const isValidationError = (e: unknown): boolean =>
  isAxiosError(e) && e.response?.status === 422;

export const isNotFoundError = (e: unknown): boolean =>
  isAxiosError(e) && e.response?.status === 404;

export const isServerError = (e: unknown): boolean =>
  isAxiosError(e) && !!e.response && e.response.status >= 500;

export enum ApiErrorType {
  Unauthorized = 'unauthorized',
  NotFound = 'notFound',
  Validation = 'validation',
  Timeout = 'timeout',
  NetworkError = 'networkError',
  ServerError = 'serverError',
  Unknown = 'unknown',
}

export const classifyApiError = (e: unknown): ApiErrorType => {
  if (isTimeoutError(e)) return ApiErrorType.Timeout;
  if (isNetworkError(e)) return ApiErrorType.NetworkError;
  if (isUnauthorizedError(e)) return ApiErrorType.Unauthorized;
  if (isNotFoundError(e)) return ApiErrorType.NotFound;
  if (isValidationError(e)) return ApiErrorType.Validation;
  if (isServerError(e)) return ApiErrorType.ServerError;
  return ApiErrorType.Unknown;
};
