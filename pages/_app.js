import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';

export default function MyApp({ Component, pageProps }) {
   const [mode, setMode] = useState('light');

   const toggleTheme = (mode) => setMode(mode);

   const theme = createTheme({
      palette: {
         mode,
      },
   });
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Component {...pageProps} toggleTheme={toggleTheme} />
      </ThemeProvider>
   );
}
