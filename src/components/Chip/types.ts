import { TouchableOpacityProps } from 'react-native';
import { UntitledUIIconName } from '@/components/Icons';

export type ChipVariant = 'primary' | 'secondary';
export type ChipSize = 'large' | 'medium';

export interface ChipColorConfig {
  background: string;
  text: string;
}

export interface ChipThemeColors {
  primary: ChipColorConfig;
  secondary: ChipColorConfig;
  disabled: ChipColorConfig;
}

export interface ChipSizeSpacing {
  vertical: number;
  horizontal: number;
  radius: number;
}

export interface ChipThemeSpacing {
  large: ChipSizeSpacing;
  medium: ChipSizeSpacing;
  icon: number;
}

export interface ChipThemeTypography {
  large: number;
  medium: number;
}

export interface ChipThemeIconSizes {
  large: number;
  medium: number;
}

export interface ChipTheme {
  colors: ChipThemeColors;
  spacing: ChipThemeSpacing;
  typography: ChipThemeTypography;
  icon: ChipThemeIconSizes;
}

export interface ChipProps extends TouchableOpacityProps {
  children?: string;
  variant?: ChipVariant;
  size?: ChipSize;
  disabled?: boolean;
  selected?: boolean;
  leftIcon?: UntitledUIIconName;
  rightIcon?: UntitledUIIconName;
  onRightIconPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}
