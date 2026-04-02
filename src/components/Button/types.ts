import type { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native-gesture-handler';
import { UntitledUIIconName } from '@/components/Icons';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'ghost-no-spacing';
export type ButtonSize = 'extra-small' | 'small' | 'medium' | 'large';

export interface ButtonFilledColorConfig {
  background: string;
  text: string;
}

export interface ButtonOutlineColorConfig {
  border: string;
  text: string;
}

export interface ButtonGhostColorConfig {
  text: string;
}

export interface ButtonThemeColors {
  primary: ButtonFilledColorConfig;
  secondary: ButtonFilledColorConfig;
  outline: ButtonOutlineColorConfig;
  ghost: ButtonGhostColorConfig;
  disabled: ButtonFilledColorConfig;
}

export interface ButtonSizeSpacing {
  vertical: number;
  horizontal: number;
  radius: number;
}

export interface ButtonThemeSpacing {
  'extra-small': ButtonSizeSpacing;
  small: ButtonSizeSpacing;
  medium: ButtonSizeSpacing;
  large: ButtonSizeSpacing;
  icon: number;
}

export interface ButtonThemeTypography {
  'extra-small': number;
  small: number;
  medium: number;
  large: number;
  weight: string;
}

export interface ButtonThemeIconSizes {
  'extra-small': number;
  small: number;
  medium: number;
  large: number;
}

export interface ButtonTheme {
  colors: ButtonThemeColors;
  spacing: ButtonThemeSpacing;
  typography: ButtonThemeTypography;
  icon: ButtonThemeIconSizes;
}

export interface ButtonProps extends TouchableOpacityProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: UntitledUIIconName;
  rightIcon?: UntitledUIIconName;
  iconSize?: number;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  hapticFeedback?: boolean;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}
