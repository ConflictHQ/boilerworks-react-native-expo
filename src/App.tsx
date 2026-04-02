import { useFonts, getLoadedFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';

import './i18n';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { ApolloProvider } from '@apollo/client';

import { logger } from '@/utils/logger';
import { customFonts } from './constants/fonts';
import { ThemeProvider } from './theme/ThemeContext';
import { AppNavigator } from './navigation/AppNavigator';
import store, { persistor } from '@/store/store';
import { useAppBootstrap } from '@/hooks/useAppBootstrap';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/auth';
import { createApolloClient } from '@/api/apolloClient';

dayjs.extend(advancedFormat);

void SplashScreen.preventAutoHideAsync();

function ApolloClientProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [client] = React.useState(() =>
    createApolloClient({ onSessionExpired: () => void dispatch(logout()) })
  );
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

// Separate component so useAppBootstrap can access the Redux store via hooks
// (must be rendered inside <Provider>, not in App itself).
function AppWithStore({
  persistor: p,
}: {
  persistor: ReturnType<typeof import('redux-persist').persistStore>;
}) {
  useAppBootstrap();

  return (
    <ApolloClientProvider>
      <PersistGate persistor={p}>
        <GestureHandlerRootView>
          {/*<KeyboardProvider>*/}
            <ThemeProvider>
              <BottomSheetModalProvider>
                <AppNavigator />
              </BottomSheetModalProvider>
              <Toast />
            </ThemeProvider>
          {/*</KeyboardProvider>*/}
        </GestureHandlerRootView>
      </PersistGate>
    </ApolloClientProvider>
  );
}

export function App() {
  const [loaded, error] = useFonts(customFonts);

  React.useEffect(() => {
    if (error) {
      logger.error('Failed to load fonts', error);
    }
  }, [error]);

  React.useEffect(() => {
    if (loaded || error) {
      logger.debug(getLoadedFonts());
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppWithStore persistor={persistor} />
    </Provider>
  );
}
