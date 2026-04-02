import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import type { ContainerVariant } from './types';

interface StyledContainerProps {
  variant: ContainerVariant;
}

export const StyledSafeAreaView = styled(SafeAreaView)<StyledContainerProps>`
  background-color: ${({ theme }) => theme.container.colors.default.background};
  flex: 1;
  ${({ variant }) => (variant === 'nopadding' ? 'padding: 0;' : '')}
`;

export const StyledKeyboardAwareScrollView = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.container.colors.default.background};
`;

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.container.colors.default.background};
  flex: 1;
`;
