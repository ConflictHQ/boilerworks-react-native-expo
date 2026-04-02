import { Colors } from '@/constants/colors';
import type { RoundedHeaderSectionTheme } from './types';

export const lightRoundedHeaderSectionTheme: RoundedHeaderSectionTheme = {
  backgroundColor: Colors.white,
  borderRadius: 16,
  paddingVertical: 16,
};

export const darkRoundedHeaderSectionTheme: RoundedHeaderSectionTheme = {
  backgroundColor: Colors.tableBlack,
  borderRadius: 16,
  paddingVertical: 16,
};
