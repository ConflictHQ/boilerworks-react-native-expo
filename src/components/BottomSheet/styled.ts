import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import { WRAPPER_SPACING } from '@/constants/ui';

export const Sheet = styled(BottomSheet).attrs(({ theme }) => ({
  style: { marginHorizontal: WRAPPER_SPACING },
  backgroundStyle: {
    backgroundColor: theme.bottomSheet.colors.background,
  },
}))``;

export const ContentScrollView = styled(BottomSheetScrollView)`
  flex: 1;
  padding-horizontal: ${WRAPPER_SPACING}px;
  background-color: ${({ theme }) => theme.bottomSheet.colors.background};
`;
