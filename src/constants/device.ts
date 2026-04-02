import { Dimensions, Platform } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

const DIMENSIONS = Dimensions.get('window');

const shortestSide = Math.min(DIMENSIONS.width, DIMENSIONS.height);

export const IS_SMALL_DEVICE = shortestSide <= 375;
