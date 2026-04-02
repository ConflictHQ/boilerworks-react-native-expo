export interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  userInitials: string;
  userImage?: string;
  onBellPress?: () => void;
  onCalendarPress?: () => void;
  testID?: string;
}

export interface DashboardHeaderTheme {
  userNameFontSize: number;
  userNameColor: string;
  subtitleFontSize: number;
  subtitleColor: string;
  iconSize: number;
  iconColor: string;
  iconButtonBackground: string;
  iconButtonRadius: number;
  spacing: number;
  padding: number;
}
