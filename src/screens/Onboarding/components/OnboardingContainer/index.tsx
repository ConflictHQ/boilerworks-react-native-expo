import React, { forwardRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import {
  LogoContainer,
  ContentContainer,
  StyledContainer,
  LogoImage,
} from './styled';
import { DEFAULT_FADE_IN, DEFAULT_FADE_OUT } from '@/constants/animation';
import type { ScrollView } from 'react-native';

const logoImage = require('@/assets/images/logo-main.png');

type Props = {
  children: React.ReactNode;
  hideLogo?: boolean;
  bounces?: boolean;
  noSafeArea?: boolean;
  Header?: React.ComponentType;
  Footer?: React.ComponentType;
  bottomOffset?: number;
};

const OnboardingContainer = forwardRef<ScrollView, Props>(
  (
    {
      children,
      hideLogo = false,
      bounces = false,
      Header,
      Footer,
      noSafeArea,
      bottomOffset = 0,
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const paddingTop = noSafeArea ? 0 : Header ? 0 : insets.top;
    const paddingBottom = noSafeArea ? 0 : insets.bottom;
    const { height: keyboardHeight } = useReanimatedKeyboardAnimation();

    const footerStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: keyboardHeight.value }],
    }));

    return (
      <>
        {Header ? <Header /> : null}
        <StyledContainer
          ref={ref}
          keyboardAvoiding
          bounces={bounces}
          noInsets={noSafeArea}
          bottomInset={bottomOffset}
          $paddingTop={paddingTop}
          $paddingBottom={paddingBottom}
        >
          {!hideLogo && (
            <LogoContainer
              entering={DEFAULT_FADE_IN}
              exiting={DEFAULT_FADE_OUT}
            >
              <LogoImage source={logoImage} resizeMode="contain" />
            </LogoContainer>
          )}

          <ContentContainer>{children}</ContentContainer>
        </StyledContainer>
        {Footer ? (
          <Animated.View style={footerStyle}>
            <Footer />
          </Animated.View>
        ) : null}
      </>
    );
  }
);

OnboardingContainer.displayName = 'OnboardingContainer';

export default OnboardingContainer;
