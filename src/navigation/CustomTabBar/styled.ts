import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const INDICATOR_PADDING = 12;

export const TabBarWrapper = styled.View<{ $bottomInset: number }>`
  position: absolute;
  bottom: ${({ $bottomInset }) => $bottomInset}px;
  left: 12px;
  right: 12px;
`;

export const TabBarContainer = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.customTabBar.colors.background};
  border-top-color: ${({ theme }) => theme.customTabBar.colors.border};
  border-top-width: 1px;
  height: ${({ theme }) => theme.customTabBar.height}px;
  padding-bottom: 2px;
  padding-top: 2px;
  align-items: center;
  border-radius: 8px;
`;

export const IndicatorBar = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${({ theme }) => theme.customTabBar.indicatorHeight}px;
  border-radius: ${({ theme }) => theme.customTabBar.indicatorRadius}px;
  background-color: ${({ theme }) => theme.customTabBar.colors.indicator};
`;
