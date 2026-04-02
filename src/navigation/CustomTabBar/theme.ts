import type { CustomTabBarTheme } from './types';
import { Colors } from '@/constants/colors';

export const lightCustomTabBarTheme: CustomTabBarTheme = {
  colors: {
    background: Colors.light.tabBar,
    border: Colors.light.inputBorder,
    indicator: Colors.light.primary,
    tabLabelActive: Colors.light.primary,
    tabLabelInactive: Colors.secondaryGray,
  },
  height: 62,
  indicatorHeight: 3,
  indicatorRadius: 4,
  labelFontSize: 11,
  labelFontWeight: '500',
};

export const darkCustomTabBarTheme: CustomTabBarTheme = {
  colors: {
    background: Colors.dark.tabBar,
    border: Colors.dark.inputBorder,
    indicator: Colors.dark.primary,
    tabLabelActive: Colors.dark.primary,
    tabLabelInactive: Colors.dark.inputPlaceholder,
  },
  height: 62,
  indicatorHeight: 3,
  indicatorRadius: 4,
  labelFontSize: 11,
  labelFontWeight: '500',
};
