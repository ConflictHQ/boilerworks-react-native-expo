import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Theme } from './types';

export const useThemeValues = (): Theme => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      'useThemeValues must be used within a styled-components ThemeProvider'
    );
  }

  return themeContext as Theme;
};
