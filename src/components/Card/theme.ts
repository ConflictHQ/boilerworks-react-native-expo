import type { CardTheme } from './types';
import { Colors } from '@/constants/colors';

export const lightCardTheme: CardTheme = {
  colors: {
    default: {
      background: Colors.white,
    },
    outline: {
      background: 'transparent',
      borderColor: Colors.mainGray,
    },
  },
  spacing: {
    gap: 2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
};

export const darkCardTheme: CardTheme = {
  colors: {
    default: {
      background: Colors.tableBlack,
    },
    outline: {
      background: 'transparent',
      borderColor: Colors.dark.inputBorder,
    },
  },
  spacing: {
    gap: 2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
};
