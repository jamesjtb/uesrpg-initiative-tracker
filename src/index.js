import React from 'react';
import ReactDOM from 'react-dom';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/500.css';
import '@fontsource/alegreya/700.css';
import '@fontsource/alegreya/800.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
