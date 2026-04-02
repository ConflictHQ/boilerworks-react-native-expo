import type { RootState } from '@/store/types';
import { createAppSelector } from '../utils';

export const selectOnboarding = (state: RootState) => state.onboarding;

export const selectIsOnboardingComplete = createAppSelector(
  selectOnboarding,
  onboarding => onboarding.isComplete
);