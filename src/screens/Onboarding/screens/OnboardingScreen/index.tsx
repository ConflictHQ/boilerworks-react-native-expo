/**
 * OnboardingScreen — placeholder onboarding flow (AuthStatus === Onboarding).
 *
 * Shown after signup when the user has a JWT but no completed app-user profile.
 * Replace this with real onboarding steps (profile type selection, data entry, etc.).
 * Pressing "Get started" dispatches `completeOnboarding` which transitions
 * AuthStatus → Authenticated and unmounts this stack.
 *
 * Store: dispatches `completeOnboarding` from onboarding slice.
 * Nav params: none.
 */
import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { completeOnboarding } from '@/store/onboarding';
import Container from '@/components/Container';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import { BRAND_NAME } from '@/constants/branding';
import { ACCENT_FONT } from '@/constants/fonts';

const OnboardingScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Flex flex={1} justify="center" align="center" gap={24}>
        <Text size={28} family={ACCENT_FONT} weight="700" align="center">
          Welcome to {BRAND_NAME}
        </Text>
        <Text size="md" align="center" color="secondary">
          Your app is ready. Customize this screen to fit your onboarding flow.
        </Text>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => dispatch(completeOnboarding())}
        >
          Get started
        </Button>
      </Flex>
    </Container>
  );
};

export default OnboardingScreen;