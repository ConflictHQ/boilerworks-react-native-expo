import styled from 'styled-components/native';
import Text from '@/components/Text';
import PressableOpacity from '@/components/PressableOpacity';

export const Container = styled.View`
  width: 100%;
`;

export const LabelText = styled(Text).attrs(({ theme }) => ({
  size: 14,
  weight: '600',
  family: theme.input.typography.family,
  color: theme.input.colors.title,
}))`
  margin-bottom: 6px;
`;

export const InputButton = styled(PressableOpacity)`
  border-width: ${({ theme }) => theme.input.borderWidth}px;
  border-color: ${({ theme }) => theme.input.colors.border};
  border-radius: ${({ theme }) => theme.input.borderRadius}px;
  padding-vertical: 10px;
  padding-horizontal: 14px;
  justify-content: center;
  background-color: ${({ theme }) => theme.input.colors.background};
`;

export const InputText = styled(Text).attrs(({ theme }) => ({
  size: theme.input.typography.size,
  family: theme.input.typography.family,
  weight: theme.input.typography.weight,
  variant: theme.input.typography.variant,
}))``;

export const DoneButton = styled(PressableOpacity)`
  align-items: flex-end;
  padding-vertical: 12px;
`;

export const DoneText = styled(Text)`
  color: ${({ theme }) => theme.colors.primary};
`;
