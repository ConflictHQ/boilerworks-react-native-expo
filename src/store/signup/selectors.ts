import type { RootState } from '@/store/types';
import { createAppSelector } from '../utils';

export const selectSignup = (state: RootState) => state.signup;

export const selectSignupIsLoading = createAppSelector(
  selectSignup,
  signup => signup.isLoading
);

export const selectSignupErrors = createAppSelector(
  selectSignup,
  signup => signup.errors
);

export const selectSignupStatus = createAppSelector(
  selectSignup,
  signup => signup.status
);
