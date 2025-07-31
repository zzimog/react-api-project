import { type Theme, useTheme } from '@/ui';

export const ThemeSwitcher = () => {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <div>
      Theme:
      <select
        onChange={(e) => setTheme(e.target.value as Theme)}
        value={currentTheme}
        style={{ marginLeft: '8px' }}
      >
        {['light', 'dark', 'system'].map((theme, i) => (
          <option key={i} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
};
