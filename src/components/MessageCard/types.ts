import type { ViewProps } from 'react-native';
import type { UntitledUIIconName } from '@/components/Icons';

export type MessageCardColorVariant =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'error';
export type MessageCardSize = 'small' | 'medium' | 'large';

export interface MessageCardColorConfig {
  background: string;
  title: string;
  body: string;
  closeIcon: string;
}

export interface MessageCardThemeColors {
  primary: MessageCardColorConfig;
  secondary: MessageCardColorConfig;
  neutral: MessageCardColorConfig;
  error: MessageCardColorConfig;
}

export interface MessageCardSizeSpacing {
  paddingHorizontal: number;
  paddingVertical: number;
  radius: number;
  closeOffset: number;
}

export interface MessageCardThemeSpacing {
  small: MessageCardSizeSpacing;
  medium: MessageCardSizeSpacing;
  large: MessageCardSizeSpacing;
  gap: number;
}

export interface MessageCardThemeTypography {
  title: Record<MessageCardSize, number>;
  body: Record<MessageCardSize, number>;
}

export interface MessageCardThemeIconSizes {
  close: Record<MessageCardSize, number>;
}

export interface MessageCardTheme {
  colors: MessageCardThemeColors;
  spacing: MessageCardThemeSpacing;
  typography: MessageCardThemeTypography;
  icon: MessageCardThemeIconSizes;
}

export interface MessageCardProps extends ViewProps {
  title: string;
  message: string;
  colorVariant?: MessageCardColorVariant;
  size?: MessageCardSize;
  closeIcon?: UntitledUIIconName;
  onClose?: () => void;
  accessibilityLabelClose?: string;
  testID?: string;
}
