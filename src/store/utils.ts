import { createSelector } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import type { ApiError, ApiErrorResponse } from '@/api/models/ApiErrorResponse';
import { RootState } from '@/store/types';

export const createAppSelector = createSelector.withTypes<RootState>();

export function extractApiErrors(error: unknown): ApiError[] | null {
  if (isAxiosError(error)) {
    const apiErrors = (error.response?.data as ApiErrorResponse)?.errors;
    if (apiErrors?.length) return apiErrors;
  }
  return null;
}
