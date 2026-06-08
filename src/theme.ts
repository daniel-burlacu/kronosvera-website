import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#061826', secondary: '#506070' },
    primary: { main: '#18b84f', contrastText: '#ffffff' },
    warning: { main: '#f4b400' },
    error: { main: '#ff4136' },
  },
  typography: {
    fontFamily: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'].join(','),
    h1: { fontWeight: 900, letterSpacing: '-0.06em' },
    h2: { fontWeight: 900, letterSpacing: '-0.045em' },
    h3: { fontWeight: 850, letterSpacing: '-0.025em' },
    button: { fontWeight: 800, textTransform: 'none' },
  },
  shape: { borderRadius: 22 },
});
