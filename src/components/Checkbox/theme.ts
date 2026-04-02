import type { CheckboxTheme } from './types';
import { Colors } from '@/constants/colors';

export const lightCheckboxTheme: CheckboxTheme = {
  colors: {
    default: {
      background: Colors.white,
      backgroundChecked: Colors.mainBlack,
      border: Colors.mainGray,
      borderChecked: Colors.white,
      text: Colors.mainBlack,
      textChecked: Colors.white,
      description: Colors.mainBlack,
      descriptionChecked: Colors.white,
      checkmark: Colors.white,
      highlight: Colors.dark.primary10,
    },
    disabled: {
      background: Colors.mainGray,
      backgroundChecked: Colors.mainGray,
      border: Colors.mainGray,
      borderChecked: Colors.mainGray,
      text: Colors.secondaryGray,
      textChecked: Colors.secondaryGray,
      description: Colors.secondaryGray,
      descriptionChecked: Colors.secondaryGray,
      checkmark: Colors.white,
      highlight: 'transparent',
    },
  },
  spacing: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    checkboxSize: 24,
    checkboxBorderRadiusRounded: 12,
    checkboxBorderRadiusSquare: 4,
    checkboxBorderWidth: 2,
    highlightOffset: 4,
    highlightRadius: 16,
  },
  typography: {
    labelSize: 16,
    descriptionSize: 14,
    descriptionMarginTop: 4,
  },
};

export const darkCheckboxTheme: CheckboxTheme = {
  ...lightCheckboxTheme,
  colors: {
    default: {
      background: Colors.white,
      backgroundChecked: Colors.mainBlack,
      border: Colors.mainGray,
      borderChecked: Colors.mainBlack,
      text: Colors.secondaryGray,
      textChecked: Colors.white,
      description: '#737373',
      descriptionChecked: '#CCCCCC',
      checkmark: Colors.white,
      highlight: Colors.dark.primary10,
    },
    disabled: {
      background: Colors.dark.disabledBackground,
      backgroundChecked: Colors.dark.disabledBackground,
      border: Colors.dark.disabledBackground,
      borderChecked: Colors.dark.disabledBackground,
      text: Colors.dark.disabledText,
      textChecked: Colors.dark.disabledText,
      description: Colors.dark.disabledText,
      descriptionChecked: Colors.dark.disabledText,
      checkmark: Colors.white,
      highlight: 'transparent',
    },
  },
};
