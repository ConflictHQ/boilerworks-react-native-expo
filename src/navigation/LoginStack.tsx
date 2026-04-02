import AuthScreen from '@/screens/AuthScreen';

export const authScreens = {
  Auth: {
    screen: AuthScreen,
    options: {
      headerShown: false,
    },
    linking: 'auth',
  },
};