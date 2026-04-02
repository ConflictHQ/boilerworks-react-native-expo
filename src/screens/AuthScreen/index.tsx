/**
 * AuthScreen — unauthenticated entry point.
 *
 * Renders a marketing carousel + login/register/forgot-password actions.
 * Auth flows open as bottom sheets (no navigation); sheets coordinate via refs
 * so only one is open at a time. Terms sheet is also managed here.
 *
 * Store: reads nothing; login/signup dispatch happens inside LoginSheet/RegisterSheet.
 * Nav params: none.
 */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StaticScreenProps } from '@react-navigation/native';
import Container from '@/components/Container';
import { useWindowDimensions } from 'react-native';
import AuthActions from './components/AuthActions';
import LogoHeader from './components/LogoHeader';
import OnboardingCarousel from './components/OnboardingCarousel';
import { WRAPPER_SPACING } from '@/constants/ui';
import type { BottomSheetRef } from '@/components/BottomSheet';
import TermsSheet from '@/components/TermsSheet';
import LoginSheet from './components/LoginSheet';
import RegisterSheet from './components/RegisterSheet';
import ForgotPasswordSheet from './components/ForgotPasswordSheet';

type Props = StaticScreenProps<undefined>;

const AuthScreen = ({ route: _route }: Props) => {
  const { width } = useWindowDimensions();

  const loginSheetRef = useRef<BottomSheetRef>(null);
  const registerSheetRef = useRef<BottomSheetRef>(null);
  const forgotPasswordSheetRef = useRef<BottomSheetRef>(null);
  const termsSheetRef = useRef<BottomSheetRef>(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>('');

  const carouselWidth = useMemo(() => {
    return width - WRAPPER_SPACING * 2;
  }, [width]);
  const handleLogIn = useCallback(() => {
    loginSheetRef.current?.expand();
  }, []);

  const handleCreateAccount = useCallback(() => {
    registerSheetRef.current?.expand();
  }, []);

  const handleForgotPassword = useCallback((email: string) => {
    setForgotPasswordEmail(email);
    forgotPasswordSheetRef.current?.expand();
  }, []);

  const handleSwitchToRegister = useCallback(() => {
    loginSheetRef.current?.close();
    registerSheetRef.current?.expand();
  }, []);

  const handleSwitchToLogin = useCallback(() => {
    registerSheetRef.current?.close();
    loginSheetRef.current?.expand();
  }, []);

  const handleOpenTerms = useCallback(() => {
    termsSheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <>
      <Container>
        <LogoHeader />
        <OnboardingCarousel width={carouselWidth} />
        <AuthActions
          onLogIn={handleLogIn}
          onCreateAccount={handleCreateAccount}
        />
      </Container>
      <LoginSheet
        ref={loginSheetRef}
        onForgotPassword={handleForgotPassword}
        onRegister={handleSwitchToRegister}
      />
      <ForgotPasswordSheet
        ref={forgotPasswordSheetRef}
        initialEmail={forgotPasswordEmail}
      />
      <RegisterSheet
        ref={registerSheetRef}
        onSignIn={handleSwitchToLogin}
        onTermsPress={handleOpenTerms}
      />
      <TermsSheet ref={termsSheetRef} />
    </>
  );
};

export default AuthScreen;
