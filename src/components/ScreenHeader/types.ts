import { ViewStyle } from 'react-native';

export interface ScreenHeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  useSafeArea?: boolean;
  testID?: string;
  style?: ViewStyle;
}

export interface ScreenHeaderTheme {
  backgroundColor: string;
  titleColor: string;
  iconColor: string;
  iconSize: number;
  backButtonSize: number;
  spacing: {
    horizontal: number;
    vertical: number;
    gap: number;
  };
}
