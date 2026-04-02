import React, { memo, useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';
import * as Haptics from 'expo-haptics';
import UntitledUI from '@/components/Icons';
import { useThemeValues } from '@/theme/hooks';
import { StyledTabItem, TabBarLabel } from './styled';
import type { TabBarItemProps } from '../types';

const TabBarItem = memo<TabBarItemProps>(
  ({
    route,
    sectionStartIndex,
    itemIndex,
    activeIndex,
    label,
    iconName,
    onPress,
    onLayout,
  }) => {
    const theme = useThemeValues();
    const absoluteIndex = sectionStartIndex + itemIndex;
    const isFocused = activeIndex === absoluteIndex;

    const handlePress = useCallback(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress(route.name, route.params as Record<string, unknown>);
    }, [onPress, route.name, route.params]);

    const handleLayout = useCallback(
      (e: LayoutChangeEvent) => {
        onLayout(route.key, e);
      },
      [onLayout, route.key]
    );

    return (
      <StyledTabItem
        isFocused={isFocused}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        onPress={handlePress}
        onLayout={handleLayout}
      >
        <UntitledUI
          name={iconName}
          size={24}
          color={
            isFocused
              ? theme.customTabBar.colors.tabLabelActive
              : theme.customTabBar.colors.tabLabelInactive
          }
        />
        <TabBarLabel focused={isFocused}>{label}</TabBarLabel>
      </StyledTabItem>
    );
  },
  (prevProps, nextProps) => {
    const prevAbsoluteIndex = prevProps.sectionStartIndex + prevProps.itemIndex;
    const nextAbsoluteIndex = nextProps.sectionStartIndex + nextProps.itemIndex;
    const prevIsFocused = prevProps.activeIndex === prevAbsoluteIndex;
    const nextIsFocused = nextProps.activeIndex === nextAbsoluteIndex;

    return (
      prevIsFocused === nextIsFocused &&
      prevProps.label === nextProps.label &&
      prevProps.iconName === nextProps.iconName &&
      prevProps.route.key === nextProps.route.key
    );
  }
);

export default TabBarItem;

TabBarItem.displayName = 'TabBarItem';
