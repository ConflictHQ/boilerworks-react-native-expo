import { SafeAreaViewProps } from 'react-native-safe-area-context';

export type ContainerVariant = 'default' | 'nopadding';

export interface ContainerColorConfig {
  background: string;
}

export interface ContainerThemeColors {
  default: ContainerColorConfig;
}

export interface ContainerTheme {
  colors: ContainerThemeColors;
}

export interface ContainerProps extends SafeAreaViewProps {
  variant?: ContainerVariant;
  keyboardAvoiding?: boolean;
  bounces?: boolean;
  noInsets?: boolean;
  bottomInset?: number;
  noInsetsTop?: boolean;
  noInsetsBottom?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  bottomOffset?: number;
}
