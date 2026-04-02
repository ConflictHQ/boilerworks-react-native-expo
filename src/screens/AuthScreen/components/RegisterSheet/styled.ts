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
})`
  gap: 4px;
`;

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

export const PrivacyContainer = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  margin-top: 24px;
  align-items: center;
`;

export const PrivacyText = styled(Text)`
  text-align: center;
  line-height: 20px;
`;

export const TermsLink = styled(Text)`
  text-decoration-line: underline;
`;

export const SignInContainer = styled(Animated.View).attrs({
  layout: DEFAULT_LAYOUT_TRANSITION,
})`
  align-items: center;
  align-self: stretch;
  margin-top: 32px;
`;
