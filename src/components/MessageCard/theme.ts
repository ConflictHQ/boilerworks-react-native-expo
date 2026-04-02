import type { MessageCardTheme } from './types';
import { Colors } from '@/constants/colors';

export const lightMessageCardTheme: MessageCardTheme = {
  colors: {
    primary: {
      background: Colors.light.primary,
      title: Colors.white,
      body: Colors.white,
      closeIcon: Colors.white,
    },
    secondary: {
      background: Colors.light.secondary,
      title: Colors.white,
      body: Colors.white,
      closeIcon: Colors.white,
    },
    neutral: {
      background: Colors.mainBlack,
      title: Colors.white,
      body: Colors.white,
      closeIcon: Colors.white,
    },
    error: {
      background: Colors.light.error,
      title: Colors.white,
      body: Colors.white,
      closeIcon: Colors.white,
    },
  },
  spacing: {
    small: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      radius: 12,
      closeOffset: 10,
    },
    medium: {
      paddingHorizontal: 12,
      paddingVertical: 12,
      radius: 14,
      closeOffset: 12,
    },
    large: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      radius: 16,
      closeOffset: 16,
    },
    gap: 10,
  },
  typography: {
    title: {
      small: 12,
      medium: 16,
      large: 20,
    },
    body: {
      small: 10,
      medium: 12,
      large: 16,
    },
  },
  icon: {
    close: {
      small: 18,
      medium: 20,
      large: 22,
    },
  },
};

export const darkMessageCardTheme: MessageCardTheme = {
  ...lightMessageCardTheme,
  colors: {
    primary: {
      background: Colors.dark.primary,
      title: Colors.white,
      body: Colors.white,
      closeIcon: Colors.white,
    },
    secondary: {
      background: Colors.dark.secondary,
      title: Colors.white,
      body: Colors.white,
      closeIcon: Colors.white,
    },
    neutral: {
      background: Colors.white,
      title: Colors.mainBlack,
      body: Colors.mainBlack,
      closeIcon: Colors.mainBlack,
    },
    error: {
      background: Colors.dark.error,
      title: Colors.white,
      body: Colors.white,
      closeIcon: Colors.white,
    },
  },
};
