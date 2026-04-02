import React, { useCallback, useEffect, useRef, useMemo, memo } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import type { IconName } from '@/components/Icons';
import type { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import TabBarSection from './TabBarSection';
import {
  TabBarWrapper,
  TabBarContainer,
  IndicatorBar,
  INDICATOR_PADDING,
} from './styled';
import type { TabWidthsMap, TabPositionsMap } from './types';

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  // Animated values for indicator measurements
  const indicatorWidth = useSharedValue(0);
  const indicatorLeft = useSharedValue(0);

  // Store tab measurements by route key
  const tabWidths = useRef<TabWidthsMap>({});
  const tabPositions = useRef<TabPositionsMap>({});

  const sectionOffsetRef = useRef(0);

  // Memoize labels and icon names
  const { labels, iconNames } = useMemo(() => {
    const labelsMap: Record<string, string> = {};
    const iconNamesMap: Record<string, IconName> = {};

    state.routes.forEach(route => {
      const { options } = descriptors[route.key];
      const translationKey = (options.title as string) || route.name;
      labelsMap[route.key] = t(translationKey);
      iconNamesMap[route.key] =
        // @ts-expect-error - iconName is a custom property added to MaterialTopTabNavigationOptions
        (options.iconName as IconName) || ('home-01' as IconName);
    });

    return { labels: labelsMap, iconNames: iconNamesMap };
  }, [state.routes, descriptors, t]);

  // Handle tab layout measurement
  const handleTabLayout = useCallback(
    (routeKey: string, event: LayoutChangeEvent, sectionOffset = 0) => {
      const { width, x } = event.nativeEvent.layout;
      const absoluteX = x + sectionOffset;
      tabWidths.current = { ...tabWidths.current, [routeKey]: width };
      tabPositions.current = { ...tabPositions.current, [routeKey]: absoluteX };

      const activeRouteKey = state.routes[state.index].key;
      if (routeKey === activeRouteKey) {
        indicatorWidth.value = width - INDICATOR_PADDING * 2;
        indicatorLeft.value = absoluteX + INDICATOR_PADDING;
      }
    },
    [state.routes, state.index, indicatorWidth, indicatorLeft]
  );

  // Update shared value and animate indicator when state.index changes
  useEffect(() => {
    const activeRoute = state.routes[state.index];
    const width = tabWidths.current[activeRoute.key];
    const left = tabPositions.current[activeRoute.key];

    if (width && left !== undefined) {
      const adjustedWidth = width - INDICATOR_PADDING * 2;
      const adjustedLeft = left + INDICATOR_PADDING;
      indicatorWidth.value = withTiming(adjustedWidth, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
      indicatorLeft.value = withTiming(adjustedLeft, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [state.index, state.routes, indicatorWidth, indicatorLeft]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    width: indicatorWidth.value,
    transform: [{ translateX: indicatorLeft.value }],
  }));

  const handleItemPress = useCallback(
    (routeName: string, routeParams?: Record<string, unknown>) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeName,
        canPreventDefault: true,
      });

      const isFocused =
        state.index === state.routes.findIndex(r => r.name === routeName);
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName, routeParams);
      }
    },
    [state.index, state.routes, navigation]
  );

  return (
    <TabBarWrapper $bottomInset={insets.bottom}>
      <TabBarContainer>
        <TabBarSection
          routes={state.routes}
          activeIndex={state.index}
          labels={labels}
          iconNames={iconNames}
          startIndex={0}
          sectionOffsetRef={sectionOffsetRef}
          onItemPress={handleItemPress}
          onTabLayout={handleTabLayout}
        />

        <IndicatorBar style={animatedIndicatorStyle} />
      </TabBarContainer>
    </TabBarWrapper>
  );
};

export default memo(CustomTabBar);
