import { LayoutChangeEvent } from 'react-native';
import type {
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import type { IconName } from '@/components/Icons';

export interface TabBarItemProps {
  route: TabNavigationState<ParamListBase>['routes'][0];
  sectionStartIndex: number;
  itemIndex: number;
  activeIndex: number;
  label: string;
  iconName: IconName;
  onPress: (routeName: string, routeParams?: Record<string, unknown>) => void;
  onLayout: (routeKey: string, e: LayoutChangeEvent) => void;
}

export interface TabBarSectionProps {
  routes: TabNavigationState<ParamListBase>['routes'];
  activeIndex: number;
  labels: Record<string, string>;
  iconNames: Record<string, IconName>;
  startIndex: number;
  sectionOffsetRef: React.MutableRefObject<number>;
  onItemPress: (
    routeName: string,
    routeParams?: Record<string, unknown>
  ) => void;
  onTabLayout: (
    routeKey: string,
    e: LayoutChangeEvent,
    sectionOffset: number
  ) => void;
}

export interface TabWidthsMap {
  [key: string]: number;
}

export interface TabPositionsMap {
  [key: string]: number;
}

export interface CustomTabBarThemeColors {
  background: string;
  border: string;
  indicator: string;
  tabLabelActive: string;
  tabLabelInactive: string;
}

export interface CustomTabBarTheme {
  colors: CustomTabBarThemeColors;
  height: number;
  indicatorHeight: number;
  indicatorRadius: number;
  labelFontSize: number;
  labelFontWeight: string;
}
