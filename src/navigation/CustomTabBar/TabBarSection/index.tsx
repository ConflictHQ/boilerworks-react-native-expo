import React, { memo, useCallback } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import TabBarItem from '../TabBarItem';
import { SectionWrapper } from './styled';
import type { TabBarSectionProps } from '../types';

const TabBarSection = ({
  routes,
  activeIndex,
  labels,
  iconNames,
  startIndex,
  sectionOffsetRef,
  onItemPress,
  onTabLayout,
}: TabBarSectionProps) => {
  const handleSectionLayout = useCallback(
    (e: LayoutChangeEvent) => {
      sectionOffsetRef.current = e.nativeEvent.layout.x;
    },
    [sectionOffsetRef]
  );

  const handleTabLayoutWrapper = useCallback(
    (routeKey: string, e: LayoutChangeEvent) => {
      onTabLayout(routeKey, e, sectionOffsetRef.current);
    },
    [onTabLayout, sectionOffsetRef]
  );

  return (
    <SectionWrapper onLayout={handleSectionLayout}>
      {routes.map((route, index) => (
        <TabBarItem
          key={route.key}
          route={route}
          sectionStartIndex={startIndex}
          itemIndex={index}
          activeIndex={activeIndex}
          label={labels[route.key]}
          iconName={iconNames[route.key]}
          onPress={onItemPress}
          onLayout={handleTabLayoutWrapper}
        />
      ))}
    </SectionWrapper>
  );
};

export default memo(TabBarSection, (prevProps, nextProps) => {
  return (
    prevProps.activeIndex === nextProps.activeIndex &&
    prevProps.startIndex === nextProps.startIndex &&
    prevProps.routes === nextProps.routes
  );
});
