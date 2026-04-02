import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import Text from '@/components/Text';
import { DEFAULT_LAYOUT_TRANSITION } from '@/constants/animation';

interface ContentProps {
  bottomPadding?: number;
}

export const Content = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})<ContentProps>`
  padding-top: 32px;
  padding-bottom: ${({ bottomPadding }) => bottomPadding || 0}px;
`;

export const Header = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})``;

export const SubmitButtonWrapper = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  margin-top: 24px;
`;

export const InputContainer = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  gap: 16px;
  margin-top: 24px;
`;

export const ForgotContainer = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  margin-top: 32px;
  align-items: flex-end;
`;

export const SignInContainer = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  align-items: center;
  align-self: stretch;
  margin-top: 32px;
`;
export const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.colors.error};
  margin-top: 12px;
`;
