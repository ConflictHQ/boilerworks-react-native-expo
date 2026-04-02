import type { ChipTheme } from './types';
import { Colors } from '@/constants/colors';

export const lightChipTheme: ChipTheme = {
  colors: {
    primary: {
      background: Colors.light.primary,
      text: Colors.white,
    },
    secondary: {
      background: Colors.light.secondary,
      text: Colors.white,
    },
    disabled: {
      background: Colors.mainGray,
      text: Colors.mainBlack,
    },
  },
  spacing: {
    large: {
      vertical: 8,
      horizontal: 8,
      radius: 20,
    },
    medium: {
      vertical: 4,
      horizontal: 8,
      radius: 16,
    },
    icon: 4,
  },
  typography: {
    large: 14,
    medium: 14,
  },
  icon: {
    large: 14,
    medium: 14,
  },
};

export const darkChipTheme: ChipTheme = {
  ...lightChipTheme,
  colors: {
    primary: {
      background: Colors.dark.primary,
      text: Colors.white,
    },
    secondary: {
      background: Colors.dark.secondary,
      text: Colors.white,
    },
    disabled: {
      background: Colors.dark.disabledBackground,
      text: Colors.dark.disabledText,
    },
  },
};
