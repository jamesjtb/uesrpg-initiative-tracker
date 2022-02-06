import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#7E0000',
    },
    secondary: {
      main: '#000000',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#DCD5C5',
      paper: '#F4F1E8',
    },
    divider: 'rgba(0,0,0,0.3)',
  },
  typography: {
    fontFamily: 'Alegreya',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 700,
    fontWeightBold: 800
  }
});

export default theme;