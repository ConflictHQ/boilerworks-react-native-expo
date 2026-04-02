import type { ImageSourcePropType } from 'react-native';
import type { IconName } from '@/components/Icons';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'solid' | 'gradient' | 'outline';
export type AvatarSource = ImageSourcePropType | string;

export interface AvatarProps {
  size?: AvatarSize;
  variant?: AvatarVariant;
  source?: AvatarSource;
  sourceUri?: string;
  initials?: string;
  iconName?: IconName;
  backgroundColor?: string;
  testID?: string;
  accessibilityLabel?: string;
  onPress?: () => void;
}

export interface AvatarThemeSizing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface AvatarThemeColors {
  primary: {
    background: string;
    text: string;
  };
  secondary: {
    background: string;
    text: string;
  };
  outline: {
    background: string;
    border: string;
    text: string;
  };
}

export interface AvatarThemeFontSize {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface AvatarTheme {
  sizes: AvatarThemeSizing;
  colors: AvatarThemeColors;
  fontSize: AvatarThemeFontSize;
  borderWidth: number;
}

export interface GradientAvatarContainerProps {
  size: AvatarSize;
  style?: Record<string, unknown>;
  onPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}
