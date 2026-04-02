import React, { memo } from 'react';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import type { CarouselItemComponentProps } from '../types';
import { ItemContainer, ItemImage, StringItemFill } from './styled';

const CarouselItem = ({
  item,
  index,
  scrollX,
  inactiveItemWidth,
  activeItemWidth,
  spacing,
  height,
  contentWidth,
}: CarouselItemComponentProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const currentActiveIndex = scrollX.value / contentWidth.value;

    const isActive = Math.round(currentActiveIndex) === index;
    const isAfterActiveIndex = index > currentActiveIndex;

    const widthInput = [index - 1, index, index + 1];
    const widthOutput = [inactiveItemWidth, activeItemWidth, inactiveItemWidth];
    const animatedWidth = interpolate(
      currentActiveIndex,
      widthInput,
      widthOutput,
      'clamp'
    );

    let translateX = (inactiveItemWidth + spacing) * index;

    if (isAfterActiveIndex) {
      const widthDifference = activeItemWidth - inactiveItemWidth;
      const activeIndexFloor = Math.floor(currentActiveIndex);
      const progress = currentActiveIndex - activeIndexFloor;

      if (index > activeIndexFloor) {
        translateX += widthDifference * (1 - progress);
      }
      if (index > activeIndexFloor + 1) {
        translateX += widthDifference * progress;
      }
    }

    return {
      transform: [{ translateX }],
      width: animatedWidth,
      zIndex: isActive ? 10 : 1,
    };
  });

  return (
    <ItemContainer
      $borderRadius={inactiveItemWidth / 2}
      $height={height}
      style={animatedStyle}
    >
      {typeof item === 'string' ? (
        <StringItemFill $backgroundColor={item} />
      ) : (
        <ItemImage
          source={item.image}
          $width={activeItemWidth}
          resizeMode="cover"
        />
      )}
    </ItemContainer>
  );
};

export default memo(CarouselItem);
