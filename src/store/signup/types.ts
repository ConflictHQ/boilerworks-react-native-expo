import type { ApiError } from '@/api/models/ApiErrorResponse';

export enum SignupStatus {
  Idle = 'idle',
  Success = 'success',
  PartialSuccess = 'partial_success', // signup ok, auto-login failed
}

export interface SignupState {
  status: SignupStatus;
  isLoading: boolean;
  errors: ApiError[] | null;
}
