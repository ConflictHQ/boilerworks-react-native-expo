import styled, { css } from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { IS_ANDROID, IS_IOS } from '@/constants/device';

export const StyledPicker = styled(Picker).attrs(({ theme }) => ({
  itemStyle: IS_IOS
    ? {
        fontSize: 16,
        color: theme.picker.colors.item.active,
      }
    : undefined,
  dropdownIconColor: IS_ANDROID
    ? theme.picker.colors.android.dropdownIcon
    : undefined,
}))`
  ${({ theme }) =>
    IS_ANDROID
      ? css`
          background-color: transparent;
          color: ${theme.input.colors.text};
          width: 100%;
        `
      : ''}
`;

export const PickerContainer = styled.View`
  width: 100%;
  min-height: 52px;
  justify-content: center;
  border-width: ${({ theme }) => theme.input.borderWidth}px;
  border-color: ${({ theme }) => theme.input.colors.border};
  border-radius: ${({ theme }) => theme.input.borderRadius}px;
  background-color: ${({ theme }) => theme.input.colors.background};
  overflow: hidden;
  padding-horizontal: 8px;
  padding-vertical: 2px;
`;
