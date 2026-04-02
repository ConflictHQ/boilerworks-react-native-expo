import styled from 'styled-components/native';
import PressableOpacity from '@/components/PressableOpacity';

export const StyledTabItem = styled(PressableOpacity)<{ isFocused: boolean }>`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

export const TabBarLabel = styled.Text<{ focused: boolean }>`
  font-size: ${({ theme }) => theme.customTabBar.labelFontSize}px;
  color: ${({ theme, focused }) =>
    focused
      ? theme.customTabBar.colors.tabLabelActive
      : theme.customTabBar.colors.tabLabelInactive};
  margin-top: 2px;
  font-weight: ${({ theme }) => theme.customTabBar.labelFontWeight};
`;
