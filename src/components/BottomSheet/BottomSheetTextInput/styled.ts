import { BottomSheetTextInput as GorhomBottomSheetTextInput } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import { buildFontName } from '@/components/Text/styled';

export const Input = styled(GorhomBottomSheetTextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.input.colors.placeholder,
}))<{ $hasError?: boolean; $hasRightAccessory?: boolean }>`
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
