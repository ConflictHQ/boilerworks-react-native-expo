import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import {
  getStoredLanguage,
  setStoredLanguage,
} from '@/storage/languageStorage';
import en from './locales/en.json';
import es from './locales/es.json';

export enum SupportedLanguages {
  ENGLISH = 'en',
  SPANISH = 'es',
}

const supportedLanguages = Object.values(SupportedLanguages);

const getInitialLanguage = async (): Promise<string> => {
  const storedLanguage = await getStoredLanguage();

  if (
    storedLanguage &&
    supportedLanguages.includes(storedLanguage as SupportedLanguages)
  ) {
    return storedLanguage;
  }

  const deviceLanguages = Localization.getLocales();
  const deviceLanguage = deviceLanguages[0]?.languageCode;

  if (
    deviceLanguage &&
    supportedLanguages.includes(deviceLanguage as SupportedLanguages)
  ) {
    return deviceLanguage;
  }

  return SupportedLanguages.ENGLISH;
};

const resources = {
  [SupportedLanguages.ENGLISH]: {
    translation: en,
  },
  [SupportedLanguages.SPANISH]: {
    translation: es,
  },
};

//eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: SupportedLanguages.ENGLISH,
  fallbackLng: SupportedLanguages.ENGLISH,

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
});

getInitialLanguage().then(language => {
  if (language !== i18n.language) {
    //eslint-disable-next-line import/no-named-as-default-member
    i18n.changeLanguage(language);
  }
});

export const changeLanguage = async (
  language: SupportedLanguages
): Promise<void> => {
  //eslint-disable-next-line import/no-named-as-default-member
  await i18n.changeLanguage(language);
  await setStoredLanguage(language);
};

export default i18n;
