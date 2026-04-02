import {
  Inter_300Light,
  Inter_400Regular,
  Inter_400Regular_Italic,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_800ExtraBold,
} from '@expo-google-fonts/playfair-display';

export const FontFamily = {
  Inter: 'Inter',
  PlayfairDisplay: 'PlayfairDisplay',
} as const;

export const BODY_FONT = FontFamily.Inter;
export const ACCENT_FONT = FontFamily.PlayfairDisplay;
export const DEFAULT_FONT = BODY_FONT;

export const customFonts = {
  'Inter-Light': Inter_300Light,
  'Inter-Regular': Inter_400Regular,
  'Inter-RegularItalic': Inter_400Regular_Italic,
  'Inter-Medium': Inter_500Medium,
  'Inter-SemiBold': Inter_600SemiBold,
  'Inter-Bold': Inter_700Bold,
  'Inter-ExtraBold': Inter_800ExtraBold,
  'PlayfairDisplay-Regular': PlayfairDisplay_400Regular,
  'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
  'PlayfairDisplay-ExtraBold': PlayfairDisplay_800ExtraBold,
  UntitledUI: require('../assets/fonts/untitledui.ttf'),
};