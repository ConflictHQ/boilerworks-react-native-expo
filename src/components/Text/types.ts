import { TextProps as RNTextProps, TextStyle } from 'react-native';

export type FontFamily = 'Inter' | 'PlayfairDisplay';

export type FontWeight = '100' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type FontVariant = 'regular' | 'italic';

export interface TextProps extends RNTextProps {
  size?: number;
  family?: FontFamily;
  weight?: FontWeight;
  variant?: FontVariant;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number;
  letterSpacing?: number;
  numberOfLines?: number;
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  decoration?: TextStyle['textDecorationLine'];
  children?: React.ReactNode;
  style?: TextStyle | TextStyle[];
  testID?: string;
  fontStyle?: 'normal' | 'italic';
}
