import type { ReactNode } from 'react';

export type CheckboxVariant = 'default';
export type CheckboxIconShape = 'rounded' | 'square';

export interface CheckboxColorConfig {
  background: string;
  backgroundChecked: string;
  border: string;
  borderChecked: string;
  text: string;
  textChecked: string;
  description: string;
  descriptionChecked: string;
  checkmark: string;
  highlight: string;
}

export interface CheckboxThemeColors {
  default: CheckboxColorConfig;
  disabled: CheckboxColorConfig;
}

export interface CheckboxThemeSpacing {
  paddingVertical: number;
  paddingHorizontal: number;
  borderRadius: number;
  checkboxSize: number;
  checkboxBorderRadiusRounded: number;
  checkboxBorderRadiusSquare: number;
  checkboxBorderWidth: number;
  highlightOffset: number;
  highlightRadius: number;
}

export interface CheckboxThemeTypography {
  labelSize: number;
  descriptionSize: number;
  descriptionMarginTop: number;
}

export interface CheckboxTheme {
  colors: CheckboxThemeColors;
  spacing: CheckboxThemeSpacing;
  typography: CheckboxThemeTypography;
}

export interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label?: string | ReactNode;
  description?: string | ReactNode;
  disabled?: boolean;
  variant?: CheckboxVariant;
  iconShape?: CheckboxIconShape;
  testID?: string;
}
