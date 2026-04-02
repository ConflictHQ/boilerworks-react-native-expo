import type { PressableProps, ViewStyle, StyleProp } from 'react-native';

export type PressableOpacityProps = Omit<PressableProps, 'style'> & {
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
};
