import type { JwtPayload } from '@/api/models/auth/JwtPayload';
import type { UserAttributes } from '@/api/models/users/UserAttributes';
import type { ApiErrorType } from '@/api/errors';

export enum AuthStatus {
  Initial = 'initial',
  Unauthenticated = 'unauthenticated',
  Authenticated = 'authenticated',
  Onboarding = 'onboarding',
}

export interface UserProfile {
  id: string;
  attributes: UserAttributes;
}

export interface AuthState {
  jwt: string | null;
  decodedJwt: JwtPayload | null;
  profile: UserProfile | null;
  status: AuthStatus;
  isStale: boolean;
  isLoading: boolean;
  error: ApiErrorType | null;
}