import { useState } from 'react';
import { type Theme, ThemeContext } from './ThemeContext';

export type ThemeProviderProps = {
  defaultTheme?: Theme;
  storageKey?: string;
  children: React.ReactNode;
};

export function ThemeProvider({
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  children,
}: ThemeProviderProps) {
  const root = window.document.documentElement;
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
