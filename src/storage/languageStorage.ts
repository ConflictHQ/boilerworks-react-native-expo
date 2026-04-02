import { PersistStorage } from '../services/persist-storage';

const LANGUAGE_KEY = 'user_language';

export const getStoredLanguage = async (): Promise<string | null> => {
  const language = await PersistStorage.getString(LANGUAGE_KEY);
  return language ?? null;
};

export const setStoredLanguage = async (language: string): Promise<void> => {
  await PersistStorage.setString(LANGUAGE_KEY, language);
};
