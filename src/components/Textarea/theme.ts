import type { TextareaTheme } from './types';
import { Colors } from '@/constants/colors';
import { BODY_FONT } from '@/constants/fonts';

export const lightTextareaTheme: TextareaTheme = {
  colors: {
    background: Colors.white,
    text: Colors.mainBlack,
    placeholder: Colors.secondaryGray,
    border: Colors.light.primary,
    borderError: Colors.light.error,
    title: Colors.mainBlack,
    error: Colors.light.error,
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
  borderRadius: 16,
  minHeight: 120,
  paddingVertical: 14,
  paddingHorizontal: 12,
};

export const darkTextareaTheme: TextareaTheme = {
  colors: {
    background: '#1C1C1E',
    text: '#FFFFFF',
    placeholder: '#EBEBF5',
    border: '#38383A',
    borderError: Colors.dark.error,
    title: '#FFFFFF',
    error: Colors.dark.error,
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
  borderRadius: 8,
  minHeight: 120,
  paddingVertical: 14,
  paddingHorizontal: 12,
};
