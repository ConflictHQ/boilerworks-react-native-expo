import { createSlice } from '@reduxjs/toolkit';

type OnboardingState = { isComplete: boolean };

const initialState: OnboardingState = { isComplete: false };

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    completeOnboarding: () => initialState,
  },
});

export const { completeOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;