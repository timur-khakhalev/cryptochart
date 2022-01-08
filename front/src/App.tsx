import React, { ReactElement } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import './styles/App.css';
import Main from './pages/Main';

const theme = createTheme({
  typography: {
    fontFamily: 'Spline Sans'
  }
})

export default function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Main/>
    </ThemeProvider>
  );
}
