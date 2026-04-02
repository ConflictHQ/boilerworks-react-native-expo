import React, { useCallback } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { PressableOpacityProps } from './types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PressableOpacity = ({
  activeOpacity = 0.7,
  onPressIn,
  onPressOut,
  style,
  children,
  ...pressableProps
}: PressableOpacityProps) => {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      opacity.value = withTiming(activeOpacity, { duration: 100 });
      onPressIn?.(event);
    },
    [onPressIn, opacity, activeOpacity]
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      opacity.value = withTiming(1, { duration: 150 });
      onPressOut?.(event);
    },
    [onPressOut, opacity]
  );

  return (
    <AnimatedPressable
      {...pressableProps}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, style]}
    >
      {children}
    </AnimatedPressable>
  );
};

export default PressableOpacity;
export type { PressableOpacityProps } from './types';
