import 'react-native-reanimated';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  createStaticNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { authScreens } from './LoginStack';
import { appScreens } from './AppStack';
import { onboardingScreens } from './OnboardingStack';
import {
  useIsAuthenticated,
  useIsAuthInitial,
  useIsOnboarding,
  useIsUnauthenticated,
} from '@/store/auth/hooks';
import { useAppDispatch } from '@/store/hooks';
import { restoreSession } from '@/store/auth';
import { Colors } from '@/constants/colors';
import { env } from '@/constants/env';
import { logger } from '@/utils/logger';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export const RootStack = createNativeStackNavigator({
  groups: {
    Auth: {
      if: useIsUnauthenticated,
      screens: authScreens,
    },
    Onboarding: {
      if: useIsOnboarding,
      screens: onboardingScreens,
    },
    App: {
      if: useIsAuthenticated,
      screens: appScreens,
      initialRouteName: 'Main',
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

const linking = {
  enabled: 'auto' as const,
  prefixes: [`${env.SCHEME}://`],
};

export const AppNavigator = React.memo(() => {
  const dispatch = useAppDispatch();
  const isInitial = useIsAuthInitial();
  const colorScheme = useColorScheme();

  useEffect(() => {
    logger.log('[AppNavigator] restoring session...');
    dispatch(restoreSession()).then(result => {
      if (restoreSession.fulfilled.match(result)) {
        logger.log(
          '[AppNavigator] session restored:',
          result.payload ? 'authenticated' : 'unauthenticated'
        );
      } else {
        logger.warn('[AppNavigator] session restore failed:', result.error);
      }
    });
  }, [dispatch]);

  const handleNavigationReady = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  const theme = useMemo(
    () =>
      colorScheme === 'dark'
        ? {
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              primary: Colors[colorScheme ?? 'light'].tint,
            },
          }
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: Colors[colorScheme ?? 'light'].tint,
            },
          },
    [colorScheme]
  );

  if (isInitial) return null;

  return (
    <Navigation
      theme={theme}
      linking={linking}
      onReady={handleNavigationReady}
    />
  );
});

AppNavigator.displayName = 'AppNavigator';
