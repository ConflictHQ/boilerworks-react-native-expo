import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { CarouselItemType } from '@/components/Carousel/types';

export const Root = styled.View<{ $width: number }>`
  width: ${({ $width }) => $width}px;
`;

export const Viewport = styled.View<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
`;

export const GestureFlatList = styled(Animated.FlatList<CarouselItemType>)<{
  $width: number;
  $height: number;
}>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  position: absolute;
  z-index: 100;
`;

export const ScrollSpacer = styled.View<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
`;

export const ItemsLayer = styled.View<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  position: relative;
`;
