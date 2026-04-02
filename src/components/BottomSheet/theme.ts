import type { BottomSheetTheme } from './types';
import { Colors } from '@/constants/colors';

export const lightBottomSheetTheme: BottomSheetTheme = {
  colors: {
    background: Colors.light.background,
    backdropTint: Colors.black20,
    closeButtonBackground: Colors.white,
    closeIcon: Colors.mainBlack,
  },
};

export const darkBottomSheetTheme: BottomSheetTheme = {
  colors: {
    background: Colors.dark.background,
    backdropTint: Colors.black20,
    closeButtonBackground: Colors.dark.background,
    closeIcon: Colors.white,
  },
};
