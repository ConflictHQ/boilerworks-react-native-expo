import OnboardingScreen from '@/screens/Onboarding/screens/OnboardingScreen';

export const onboardingScreens = {
  Onboarding: {
    screen: OnboardingScreen,
    options: {
      headerShown: false,
      gestureEnabled: false,
    },
    linking: 'onboarding',
  },
};