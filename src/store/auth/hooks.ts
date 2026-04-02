import { useAppSelector } from '@/store/hooks';
import { selectAuthStatus } from './selectors';
import { AuthStatus } from './types';

export const useAuthStatus = () => useAppSelector(selectAuthStatus);
export const useIsAuthInitial = () =>
  useAppSelector(selectAuthStatus) === AuthStatus.Initial;

export const useIsAuthenticated = () =>
  useAppSelector(selectAuthStatus) === AuthStatus.Authenticated;

export const useIsOnboarding = () =>
  useAppSelector(selectAuthStatus) === AuthStatus.Onboarding;

export const useIsUnauthenticated = () =>
  useAppSelector(selectAuthStatus) === AuthStatus.Unauthenticated;
