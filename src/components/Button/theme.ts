import type { ButtonTheme } from './types';
import { Colors } from '@/constants/colors';

export const lightButtonTheme: ButtonTheme = {
  colors: {
    primary: {
      background: Colors.mainBlack,
      text: Colors.white,
    },
    secondary: {
      background: Colors.white,
      text: Colors.mainBlack,
    },
    outline: {
      border: Colors.mainBlack,
      text: Colors.mainBlack,
    },
    ghost: {
      text: Colors.mainBlack,
    },
    disabled: {
      background: Colors.mainGray,
      text: Colors.secondaryGray,
    },
  },
  spacing: {
    'extra-small': {
      vertical: 3,
      horizontal: 12,
      radius: 24,
    },
    small: {
      vertical: 8,
      horizontal: 14,
      radius: 24,
    },
    medium: {
      vertical: 11,
      horizontal: 14,
      radius: 24,
    },
    large: {
      vertical: 14,
      horizontal: 16,
      radius: 24,
    },
    icon: 8,
  },
  typography: {
    'extra-small': 12,
    small: 14,
    medium: 14,
    large: 16,
    weight: '600',
  },
  icon: {
    'extra-small': 16,
    small: 16,
    medium: 14,
    large: 16,
  },
};

export const darkButtonTheme: ButtonTheme = {
  ...lightButtonTheme,
  colors: {
    primary: {
      background: Colors.white,
      text: Colors.mainBlack,
    },
    secondary: {
      background: Colors.mainBlack,
      text: Colors.white,
    },
    outline: {
      border: Colors.white,
      text: Colors.white,
    },
    ghost: {
      text: Colors.white,
    },
    disabled: {
      background: Colors.dark.disabledBackground,
      text: Colors.dark.disabledText,
    },
  },
};
