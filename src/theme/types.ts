import { ButtonTheme } from '@/components/Button/types';
import { ContainerTheme } from '@/components/Container/types';
import { ChipTheme } from '@/components/Chip/types';
import { CarouselTheme } from '@/components/Carousel/types';
import { InputTheme } from '@/components/Input/types';
import { BottomSheetTheme } from '@/components/BottomSheet/types';
import { MessageCardTheme } from '@/components/MessageCard/types';
import { PickerTheme } from '@/components/Picker/types';
import { CheckboxTheme } from '@/components/Checkbox/types';
import { TextareaTheme } from '@/components/Textarea/types';
import { CustomTabBarTheme } from '@/navigation/CustomTabBar/types';
import { AvatarTheme } from '@/components/Avatar/types';
import { DashboardHeaderTheme } from '@/components/DashboardHeader/types';
import { RoundedHeaderSectionTheme } from '@/components/RoundedHeaderSection/types';
import { CardTheme } from '@/components/Card/types';
import { ScreenHeaderTheme } from '@/components/ScreenHeader/types';
import { MarkdownRendererTheme } from '@/components/MarkdownRenderer/types';

export interface Colors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    inverse: string;
  };
  border: string;
  success: string;
  warning: string;
  error: string;
  skeleton: string;
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface Typography {
  sizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  weights: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

export interface Theme {
  type: ThemeMode;
  colors: Colors;
  spacing: Spacing;
  typography: Typography;
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  button: ButtonTheme;
  container: ContainerTheme;
  chip: ChipTheme;
  carousel: CarouselTheme;
  messageCard: MessageCardTheme;
  picker: PickerTheme;
  bottomSheet: BottomSheetTheme;
  input: InputTheme;
  checkbox: CheckboxTheme;
  textarea: TextareaTheme;
  customTabBar: CustomTabBarTheme;
  avatar: AvatarTheme;
  dashboardHeader: DashboardHeaderTheme;
  roundedHeaderSection: RoundedHeaderSectionTheme;
  card: CardTheme;
  screenHeader: ScreenHeaderTheme;
  markdownRenderer: MarkdownRendererTheme;
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

export interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeSetting: (setting: ThemeMode | undefined) => void;
}