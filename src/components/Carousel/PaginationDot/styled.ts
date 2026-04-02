import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Dot = styled(Animated.View)<{ $size: number; $radius: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ $radius }) => $radius}px;
  margin-horizontal: 4px;
`;
