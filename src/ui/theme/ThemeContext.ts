import { createContext } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null;

export const ThemeContext = createContext<ThemeState>(null);
