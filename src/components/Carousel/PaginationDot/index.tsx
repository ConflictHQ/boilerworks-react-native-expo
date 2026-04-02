import React, { memo } from 'react';
import { useTheme } from 'styled-components/native';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import type { CarouselPaginationDotProps } from '../types';
import { Dot } from './styled';

const PaginationDot = ({
  index,
  scrollX,
  contentWidth,
  activeColor,
  inactiveColor,
  size = 8,
  radius = 4,
}: CarouselPaginationDotProps) => {
  const {
    carousel: {
      color: { paginationActive, paginationInactive },
    },
  } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const currentActiveIndex = scrollX.value / contentWidth.value;

    const distance = Math.abs(currentActiveIndex - index);

    const scale = interpolate(distance, [0, 0.5, 1], [1, 0.6, 1], 'clamp');

    const opacity = interpolate(distance, [0, 0.5, 1], [1, 0.5, 1], 'clamp');

    return {
      transform: [{ scale }],
      opacity,
      backgroundColor:
        distance < 0.5
          ? (activeColor ?? paginationActive)
          : (inactiveColor ?? paginationInactive),
    };
  });

  return <Dot $size={size} $radius={radius} style={animatedStyle} />;
};

export default memo(PaginationDot);
