import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/500.css';
import '@fontsource/alegreya/700.css';
import '@fontsource/alegreya/800.css';

import App from './App';
import Views from './views/Views';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';

const Router = process.env.NODE_ENV === 'development' ? BrowserRouter : HashRouter;
console.log(Router);

const container = document.getElementById('root');
const root = createRoot(container);
console.log(window.location.pathname);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/*" element={<App />} />
                    <Route path="/views/*" element={<Views />} />
                </Routes>
            </Router>
        </ThemeProvider>
    </React.StrictMode>
);
