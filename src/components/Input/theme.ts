import type { InputTheme } from './types';
import { Colors } from '@/constants/colors';
import { BODY_FONT } from '@/constants/fonts';

export const lightInputTheme: InputTheme = {
  colors: {
    background: Colors.light.inputBackground,
    text: Colors.light.inputText,
    placeholder: Colors.light.inputPlaceholder,
    border: Colors.light.inputBorder,
    borderError: Colors.light.error,
    title: Colors.light.inputText,
    error: Colors.light.error,
    icon: Colors.light.inputText,
    iconError: Colors.light.error,
    focusOverlay: Colors.light.primary10,
    errorFocusOverlay: Colors.light.error + '1A',
  },
  typography: {
    family: BODY_FONT,
    weight: '400',
    variant: 'regular',
    size: 16,
  },
  borderWidth: 0.5,
  borderRadius: 12,
};

export const darkInputTheme: InputTheme = {
  colors: {
    background: Colors.dark.inputBackground,
    text: Colors.dark.inputText,
    placeholder: Colors.dark.inputPlaceholder,
    border: Colors.dark.inputBorder,
    borderError: Colors.dark.error,
    title: Colors.dark.inputText,
    error: Colors.dark.error,
    icon: Colors.dark.inputText,
    iconError: Colors.dark.error,
    focusOverlay: Colors.dark.primary10,
    errorFocusOverlay: Colors.dark.error + '1A',
  },
  typography: {
    family: BODY_FONT,
    weight: '400',
    variant: 'regular',
    size: 16,
  },
  borderWidth: 1,
  borderRadius: 12,
};
