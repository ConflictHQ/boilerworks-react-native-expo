import styled from 'styled-components/native';
import Text from '@/components/Text';
import { buildFontName } from '@/components/Text/styled';
import Animated from 'react-native-reanimated';
import { DEFAULT_FADE_IN, DEFAULT_FADE_OUT } from '@/constants/animation';

export const Field = styled.View<{ $fullWidth?: boolean }>`
  gap: ${({ theme }) => theme.spacing.xs}px;
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
`;

export const TextareaWrap = styled.View`
  position: relative;
`;

export const FocusOverlay = styled(Animated.View).attrs({
  entering: DEFAULT_FADE_IN,
  exiting: DEFAULT_FADE_OUT,
})<{ $hasError?: boolean }>`
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 20px;
  background-color: ${({ theme, $hasError }) =>
    $hasError
      ? theme.textarea.colors.errorFocusOverlay
      : theme.textarea.colors.focusOverlay};
  z-index: 1;
`;

export const Title = styled(Text).attrs<{ $hasError?: boolean }>(
  ({ theme, $hasError }) => ({
    size: 14,
    color: $hasError
      ? theme.textarea.colors.error
      : theme.textarea.colors.title,
  })
)``;

export const StyledTextarea = styled.TextInput<{
  $hasError?: boolean;
  $minHeight?: number;
}>`
  font-family: ${({ theme }) =>
    buildFontName(
      theme.textarea.typography.family,
      theme.textarea.typography.weight,
      theme.textarea.typography.variant
    )};
  font-size: ${({ theme }) => theme.textarea.typography.size}px;
  color: ${({ theme }) => theme.textarea.colors.text};
  background-color: ${({ theme }) => theme.textarea.colors.background};
  border-width: ${({ theme }) => theme.textarea.borderWidth}px;
  border-color: ${({ theme, $hasError }) =>
    $hasError
      ? theme.textarea.colors.borderError
      : theme.textarea.colors.border};
  border-radius: ${({ theme }) => theme.textarea.borderRadius}px;
  padding-vertical: ${({ theme }) => theme.textarea.paddingVertical}px;
  padding-horizontal: ${({ theme }) => theme.textarea.paddingHorizontal}px;
  min-height: ${({ theme, $minHeight }) =>
    $minHeight ?? theme.textarea.minHeight}px;
  text-align-vertical: top;
  z-index: 2;
`;

export const ErrorMessageWrapper = styled(Animated.View).attrs({
  entering: DEFAULT_FADE_IN,
  exiting: DEFAULT_FADE_OUT,
})``;

export const ErrorText = styled(Text).attrs(({ theme }) => ({
  size: 12,
  color: theme.textarea.colors.error,
}))``;
