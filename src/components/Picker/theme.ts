import type { PickerTheme } from './types';
import { Colors } from '@/constants/colors';

export const lightPickerTheme: PickerTheme = {
  colors: {
    item: {
      active: Colors.mainBlack,
      inactive: Colors.mainGray,
    },
    android: {
      dropdownIcon: Colors.light.primary,
      background: Colors.light.background,
    },
  },
};

export const darkPickerTheme: PickerTheme = {
  colors: {
    item: {
      active: Colors.white,
      inactive: Colors.dark.disabledText,
    },
    android: {
      dropdownIcon: Colors.light.primary,
      background: Colors.dark.background,
    },
  },
};
