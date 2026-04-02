import type { AvatarTheme } from './types';
import { Colors } from '@/constants/colors';

const AVATAR_SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  xxl: 72,
};

const AVATAR_FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const lightAvatarTheme: AvatarTheme = {
  sizes: AVATAR_SIZES,
  colors: {
    primary: {
      background: Colors.light.primary,
      text: Colors.white,
    },
    secondary: {
      background: Colors.light.accent,
      text: Colors.mainBlack,
    },
    outline: {
      background: Colors.white,
      border: Colors.light.primary,
      text: Colors.light.primary,
    },
  },
  fontSize: AVATAR_FONT_SIZES,
  borderWidth: 2,
};

export const darkAvatarTheme: AvatarTheme = {
  sizes: AVATAR_SIZES,
  colors: {
    primary: {
      background: Colors.dark.primary,
      text: Colors.dark.inputText,
    },
    secondary: {
      background: Colors.dark.accent,
      text: Colors.dark.background,
    },
    outline: {
      background: Colors.dark.background,
      border: Colors.dark.primary,
      text: Colors.dark.primary,
    },
  },
  fontSize: AVATAR_FONT_SIZES,
  borderWidth: 2,
};
