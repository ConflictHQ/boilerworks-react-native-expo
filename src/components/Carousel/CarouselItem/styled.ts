import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const ItemContainer = styled(Animated.View)<{
  $borderRadius: number;
  $height: number;
}>`
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  position: absolute;
  align-items: center;
  justify-content: center;
  height: ${({ $height }) => $height}px;
  overflow: hidden;
`;

export const StringItemFill = styled.View<{ $backgroundColor: string }>`
  flex: 1;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export const ItemImage = styled.Image<{ $width: number }>`
  width: ${({ $width }) => $width}px;
  height: 100%;
`;
