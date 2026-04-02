import * as SecureStore from 'expo-secure-store';

const KEYS = {
  JWT: 'auth_jwt',
  REFRESH_TOKEN: 'auth_refresh_token',
} as const;

export const authStorage = {
  getJwt: (): Promise<string | null> => SecureStore.getItemAsync(KEYS.JWT),

  setJwt: (token: string): Promise<void> =>
    SecureStore.setItemAsync(KEYS.JWT, token),

  getRefreshToken: (): Promise<string | null> =>
    SecureStore.getItemAsync(KEYS.REFRESH_TOKEN),

  setRefreshToken: (token: string): Promise<void> =>
    SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, token),

  clearAll: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(KEYS.JWT);
    await SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN);
  },
};
