import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';

export default function MyApp({ Component, pageProps }) {
   const [mode, setMode] = useState('dark');
   const toggleTheme = (mode) => setMode(mode);
   const theme = createTheme({
      palette: {
         mode,
         primary: {
            main: 'rgb(80 155 137)',
         },
      },
   });
   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Component {...pageProps} toggleTheme={toggleTheme} />
      </ThemeProvider>
   );
}
