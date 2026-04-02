import styled from 'styled-components/native';
import Text from '@/components/Text';
import { buildFontName } from '@/components/Text/styled';
import Animated from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { DEFAULT_FADE_IN, DEFAULT_FADE_OUT } from '@/constants/animation';
import { BODY_FONT } from '@/constants/fonts';

export const Field = styled.View<{ $fullWidth?: boolean }>`
  gap: ${({ theme }) => theme.spacing.xs}px;
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
`;

export const InputWrap = styled.View`
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
      ? theme.input.colors.errorFocusOverlay
      : theme.input.colors.focusOverlay};
  z-index: 1;
`;

export const RightAccessory = styled(Pressable).attrs({
  hitSlop: 8,
})`
  position: absolute;
  right: 12px;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

export const RightAccessoryIcon = styled(Animated.View).attrs({
  entering: DEFAULT_FADE_IN,
  exiting: DEFAULT_FADE_OUT,
})``;

export const Title = styled(Text).attrs<{ $hasError?: boolean }>(
  ({ theme, $hasError }) => ({
    size: 14,
    weight: '600',
    family: BODY_FONT,
    color: $hasError ? theme.input.colors.error : undefined,
  })
)`
  margin-bottom: 6px;
`;

export const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.input.colors.placeholder,
}))<{
  $hasError?: boolean;
  $hasRightAccessory?: boolean;
  $fullWidth?: boolean;
}>`
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
  z-index: 2;
  border-width: ${({ theme }) => theme.input.borderWidth}px;
  border-color: ${({ theme, $hasError }) =>
    $hasError ? theme.input.colors.borderError : theme.input.colors.border};
  border-radius: ${({ theme }) => theme.input.borderRadius}px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 14px;
  padding-right: ${({ $hasRightAccessory }) =>
    $hasRightAccessory ? 56 : 14}px;
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.input.colors.error : theme.input.colors.text};
  font-size: ${({ theme }) => theme.input.typography.size}px;
  font-family: ${({ theme }) =>
    buildFontName(
      theme.input.typography.family,
      theme.input.typography.weight,
      theme.input.typography.variant
    )};
  background-color: ${({ theme }) => theme.input.colors.background};
`;

export const ErrorText = styled(Text).attrs(({ theme }) => ({
  size: 12,
  family: 'AreaNormal',
  weight: '400',
  color: theme.input.colors.error,
}))`
  margin-top: 6px;
`;

export const ErrorMessageWrapper = styled(Animated.View)``;
