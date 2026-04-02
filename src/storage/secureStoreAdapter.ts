import * as SecureStore from 'expo-secure-store';
import type { WebStorage } from 'redux-persist';

const sanitizeKey = (key: string) => key.replace(/[^a-zA-Z0-9._-]/g, '_');

export const secureStoreAdapter: WebStorage = {
  getItem: (key: string) => SecureStore.getItemAsync(sanitizeKey(key)),
  setItem: (key: string, value: string) =>
    SecureStore.setItemAsync(sanitizeKey(key), value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(sanitizeKey(key)),
};
