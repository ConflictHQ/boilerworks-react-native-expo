import type { ReactNode } from 'react';
import type { AnimatedProps } from 'react-native-reanimated';
import type { ViewProps } from 'react-native';

export type CardVariant = 'default' | 'smallPadding' | 'outline';

export interface CardColorConfig {
  background: string;
}

export interface CardOutlineColorConfig {
  background: string;
  borderColor: string;
}

export interface CardThemeColors {
  default: CardColorConfig;
  outline: CardOutlineColorConfig;
}

export interface CardThemeSpacing {
  gap: number;
  paddingVertical: number;
  paddingHorizontal: number;
  borderRadius: number;
}

export interface CardTheme {
  colors: CardThemeColors;
  spacing: CardThemeSpacing;
}

export interface CardProps extends AnimatedProps<ViewProps> {
  children?: ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
}
