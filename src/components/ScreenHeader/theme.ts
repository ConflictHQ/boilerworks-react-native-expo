import { Colors } from '@/constants/colors';
import { ScreenHeaderTheme } from './types';

export const lightScreenHeaderTheme: ScreenHeaderTheme = {
  backgroundColor: Colors.white,
  titleColor: Colors.mainBlack,
  iconColor: Colors.mainBlack,
  iconSize: 24,
  backButtonSize: 24,
  spacing: {
    horizontal: 20,
    vertical: 12,
    gap: 12,
  },
};

export const darkScreenHeaderTheme: ScreenHeaderTheme = {
  backgroundColor: Colors.dark.disabledBackground,
  titleColor: Colors.white,
  iconColor: Colors.white,
  iconSize: 24,
  backButtonSize: 24,
  spacing: {
    horizontal: 20,
    vertical: 12,
    gap: 12,
  },
};
