import { Theme, ThemeMode } from './types';
import { darkButtonTheme, lightButtonTheme } from '@/components/Button/theme';
import {
  darkContainerTheme,
  lightContainerTheme,
} from '@/components/Container/theme';
import { darkChipTheme, lightChipTheme } from '@/components/Chip/theme';
import { Colors } from '@/constants/colors';
import {
  darkCarouselTheme,
  lightCarouselTheme,
} from '@/components/Carousel/theme';
import {
  darkBottomSheetTheme,
  lightBottomSheetTheme,
} from '@/components/BottomSheet/theme';
import { darkInputTheme, lightInputTheme } from '@/components/Input/theme';
import {
  darkMessageCardTheme,
  lightMessageCardTheme,
} from '@/components/MessageCard/theme';
import { darkPickerTheme, lightPickerTheme } from '@/components/Picker/theme';
import {
  darkCheckboxTheme,
  lightCheckboxTheme,
} from '@/components/Checkbox/theme';
import {
  darkTextareaTheme,
  lightTextareaTheme,
} from '@/components/Textarea/theme';
import {
  darkScreenHeaderTheme,
  lightScreenHeaderTheme,
} from '@/components/ScreenHeader/theme';
import {
  darkCustomTabBarTheme,
  lightCustomTabBarTheme,
} from '@/navigation/CustomTabBar/theme';
import { darkAvatarTheme, lightAvatarTheme } from '@/components/Avatar/theme';
import {
  darkDashboardHeaderTheme,
  lightDashboardHeaderTheme,
} from '@/components/DashboardHeader/theme';
import {
  darkRoundedHeaderSectionTheme,
  lightRoundedHeaderSectionTheme,
} from '@/components/RoundedHeaderSection/theme';
import { darkCardTheme, lightCardTheme } from '@/components/Card/theme';
import {
  darkMarkdownRendererTheme,
  lightMarkdownRendererTheme,
} from '@/components/MarkdownRenderer/theme';

const baseSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const baseTypography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

const baseBorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

export const lightTheme: Theme = {
  type: ThemeMode.Light,
  colors: {
    primary: Colors.light.primary,
    secondary: Colors.light.secondary,
    background: Colors.light.background,
    surface: '#F2F2F7',
    text: {
      primary: Colors.mainBlack,
      secondary: '#3C3C43',
      inverse: '#FFFFFF',
    },
    border: '#C6C6C8',
    success: '#34C759',
    warning: Colors.light.accent,
    error: Colors.light.error,
    skeleton: Colors.light.skeleton,
  },
  spacing: baseSpacing,
  typography: baseTypography,
  borderRadius: baseBorderRadius,
  button: lightButtonTheme,
  container: lightContainerTheme,
  chip: lightChipTheme,
  carousel: lightCarouselTheme,
  messageCard: lightMessageCardTheme,
  picker: lightPickerTheme,
  bottomSheet: lightBottomSheetTheme,
  input: lightInputTheme,
  checkbox: lightCheckboxTheme,
  textarea: lightTextareaTheme,
  customTabBar: lightCustomTabBarTheme,
  avatar: lightAvatarTheme,
  dashboardHeader: lightDashboardHeaderTheme,
  roundedHeaderSection: lightRoundedHeaderSectionTheme,
  card: lightCardTheme,
  screenHeader: lightScreenHeaderTheme,
  markdownRenderer: lightMarkdownRendererTheme,
};

export const darkTheme: Theme = {
  type: ThemeMode.Dark,
  colors: {
    primary: Colors.dark.primary,
    secondary: Colors.dark.secondary,
    background: Colors.dark.background,
    surface: '#1C1C1E',
    text: {
      primary: '#FFFFFF',
      secondary: '#EBEBF5',
      inverse: '#000000',
    },
    border: '#38383A',
    success: '#30D158',
    warning: Colors.dark.accent,
    error: Colors.dark.error,
    skeleton: Colors.dark.skeleton,
  },
  spacing: baseSpacing,
  typography: baseTypography,
  borderRadius: baseBorderRadius,
  button: darkButtonTheme,
  container: darkContainerTheme,
  chip: darkChipTheme,
  carousel: darkCarouselTheme,
  messageCard: darkMessageCardTheme,
  picker: darkPickerTheme,
  bottomSheet: darkBottomSheetTheme,
  input: darkInputTheme,
  checkbox: darkCheckboxTheme,
  textarea: darkTextareaTheme,
  customTabBar: darkCustomTabBarTheme,
  avatar: darkAvatarTheme,
  dashboardHeader: darkDashboardHeaderTheme,
  roundedHeaderSection: darkRoundedHeaderSectionTheme,
  card: darkCardTheme,
  screenHeader: darkScreenHeaderTheme,
  markdownRenderer: darkMarkdownRendererTheme,
};