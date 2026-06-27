import { useEffect, useMemo, useState } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouter } from '@/app/router';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('incidentsphere.theme');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.body.dataset.theme = themeMode;
    localStorage.setItem('incidentsphere.theme', themeMode);
  }, [themeMode]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode],
  );

  const handleToggleTheme = () => {
    setThemeMode((mode) => (mode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRouter themeMode={themeMode} onToggleTheme={handleToggleTheme} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
