import type { MarkdownRendererTheme } from './types';
import { Colors } from '@/constants/colors';

export const lightMarkdownRendererTheme: MarkdownRendererTheme = {
  colors: {
    heading: {
      primary: Colors.mainBlack,
      secondary: '#3C3C43',
    },
    text: '#3C3C43',
    code: {
      background: Colors.light.skeleton,
      border: '#C6C6C8',
      text: Colors.mainBlack,
    },
    blockquote: {
      background: '#F2F2F7',
      border: Colors.light.primary,
    },
    table: {
      headerBackground: Colors.light.skeleton,
      bodyBackground: '#F2F2F7',
      border: '#C6C6C8',
    },
    link: '#007AFF',
    hr: '#C6C6C8',
  },
};

export const darkMarkdownRendererTheme: MarkdownRendererTheme = {
  ...lightMarkdownRendererTheme,
  colors: {
    heading: {
      primary: '#FFFFFF',
      secondary: '#EBEBF5',
    },
    text: '#EBEBF5',
    code: {
      background: Colors.dark.skeleton,
      border: '#38383A',
      text: '#FFFFFF',
    },
    blockquote: {
      background: '#1C1C1E',
      border: Colors.dark.primary,
    },
    table: {
      headerBackground: Colors.dark.skeleton,
      bodyBackground: '#1C1C1E',
      border: '#38383A',
    },
    link: '#0A84FF',
    hr: '#38383A',
  },
};
