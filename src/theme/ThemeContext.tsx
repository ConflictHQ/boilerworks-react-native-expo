import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { PersistStorage } from '@/services/persist-storage';
import { ThemeContextType, ThemeMode } from './types';
import { lightTheme, darkTheme } from './themes';

const THEME_KEY = 'app_theme_setting';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeSettingState] = useState<ThemeMode>(
    systemColorScheme === 'dark' ? ThemeMode.Dark : ThemeMode.Light
  );

  useEffect(() => {
    const loadStoredTheme = async () => {
      const storedTheme = await PersistStorage.getString(THEME_KEY);
      if (storedTheme) {
        setThemeSettingState(storedTheme as ThemeMode);
      }
    };
    loadStoredTheme();
  }, []);

  const setThemeSetting = useCallback(
    async (setting: ThemeMode | undefined) => {
      if (setting === undefined) {
        const systemTheme =
          systemColorScheme === 'dark' ? ThemeMode.Dark : ThemeMode.Light;
        setThemeSettingState(systemTheme);
        await PersistStorage.remove(THEME_KEY);
      } else {
        setThemeSettingState(setting);
        await PersistStorage.setString(THEME_KEY, setting);
      }
    },
    [systemColorScheme]
  );

  const theme = themeMode === ThemeMode.Dark ? darkTheme : lightTheme;

  const contextValue = useMemo(
    () => ({
      themeMode,
      setThemeSetting,
    }),
    [themeMode, setThemeSetting]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <StatusBar
        barStyle={
          themeMode === ThemeMode.Dark ? 'light-content' : 'dark-content'
        }
      />
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
