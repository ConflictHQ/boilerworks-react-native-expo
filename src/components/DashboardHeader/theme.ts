import type { DashboardHeaderTheme } from './types';
import { Colors } from '@/constants/colors';

export const lightDashboardHeaderTheme: DashboardHeaderTheme = {
  userNameFontSize: 18,
  userNameColor: Colors.mainBlack,
  subtitleFontSize: 13,
  subtitleColor: '#86868B',
  iconSize: 20,
  iconColor: Colors.mainBlack,
  iconButtonBackground: 'rgba(0,0,0,0.06)',
  iconButtonRadius: 12,
  spacing: 8,
  padding: 16,
};

export const darkDashboardHeaderTheme: DashboardHeaderTheme = {
  userNameFontSize: 18,
  userNameColor: Colors.white,
  subtitleFontSize: 13,
  subtitleColor: '#AEAEB2',
  iconSize: 20,
  iconColor: Colors.white,
  iconButtonBackground: 'rgba(255,255,255,0.10)',
  iconButtonRadius: 12,
  spacing: 8,
  padding: 16,
};
