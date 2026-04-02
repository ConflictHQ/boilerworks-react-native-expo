import React, { useRef, useEffect, useCallback } from 'react';
import { Dimensions, ScrollViewProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { CarouselItemType, CarouselProps } from './types';
import CarouselItem from './CarouselItem';
import CarouselPagination from './CarouselPagination';
import {
  GestureFlatList,
  ItemsLayer,
  Root,
  ScrollSpacer,
  Viewport,
} from './styled';

const SCREEN_WIDTH = Dimensions.get('window').width;

const keyExtractor = (item: CarouselItemType) => `carousel-item-${item.id}`;
const Carousel = ({
  items = [],
  onActiveIndexChange,
  height = 300,
  width = SCREEN_WIDTH,
  spacing = 8,
  autoPlay = true,
  autoPlayInterval = 3000,
  paginationActiveColor,
  paginationInactiveColor,
  paginationDotSize = 8,
  withPagination = true,
  paginationDotRadius = 2,
}: CarouselProps) => {
  const itemsLength = items.length - 1;
  const activeItemWidth = width / 2.8;
  const totalSpacing = itemsLength * spacing;
  const availableItemWidth = width - activeItemWidth - totalSpacing;
  const inactiveItemWidth = availableItemWidth / itemsLength;
  const flatListRef = useRef<Animated.FlatList<CarouselItemType>>(null);
  const scrollX = useSharedValue(0);
  const contentWidth = useSharedValue(width);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const startAutoScroll = useCallback(() => {
    if (!autoPlay || items.length === 0) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % items.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      currentIndexRef.current = nextIndex;
    }, autoPlayInterval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const handleMomentumScrollEnd = useCallback<
    NonNullable<ScrollViewProps['onMomentumScrollEnd']>
  >(
    event => {
      const index = Math.round(event.nativeEvent.contentOffset.x / width);
      currentIndexRef.current = index;
      onActiveIndexChange?.(index);
      startAutoScroll();
    },
    [onActiveIndexChange, startAutoScroll, width]
  );

  const handleScrollBeginDrag = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoScroll]);

  const renderItem = useCallback(
    () => <ScrollSpacer $width={width} $height={height} />,
    [width, height]
  );

  return (
    <Root $width={width}>
      <Viewport $width={width} $height={height}>
        <GestureFlatList
          $width={width}
          $height={height}
          ref={flatListRef}
          data={items}
          renderItem={renderItem}
          horizontal
          keyExtractor={keyExtractor}
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          onScroll={scrollHandler}
          onScrollBeginDrag={handleScrollBeginDrag}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
        />
        <ItemsLayer $height={height}>
          {items.map((item, index) => (
            <CarouselItem
              key={`carousel-item-${item.id}`}
              item={item}
              index={index}
              scrollX={scrollX}
              inactiveItemWidth={inactiveItemWidth}
              activeItemWidth={activeItemWidth}
              spacing={spacing}
              height={height}
              contentWidth={contentWidth}
            />
          ))}
        </ItemsLayer>
      </Viewport>
      <CarouselPagination
        items={items}
        withPagination={withPagination}
        scrollX={scrollX}
        contentWidth={contentWidth}
        paginationActiveColor={paginationActiveColor}
        paginationInactiveColor={paginationInactiveColor}
        paginationDotSize={paginationDotSize}
        paginationDotRadius={paginationDotRadius}
      />
    </Root>
  );
};

export default Carousel;
