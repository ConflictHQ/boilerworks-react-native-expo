import type { ContainerTheme } from './types';
import { Colors } from '@/constants/colors';

export const lightContainerTheme: ContainerTheme = {
  colors: {
    default: {
      background: Colors.light.background,
    },
  },
};

export const darkContainerTheme: ContainerTheme = {
  colors: {
    default: {
      background: Colors.dark.background,
    },
  },
};
