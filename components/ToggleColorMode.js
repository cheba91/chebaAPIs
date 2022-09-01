import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function ToggleColorMode({ toggleTheme }) {
   const theme = useTheme();
   const handleTheme = () => {
      toggleTheme(theme.palette.mode === 'dark' ? 'light' : 'dark');
   };
   return (
      <Box
         sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            // bgcolor: 'background.default',
            // color: 'text.primary',
            // borderRadius: 1,
            // p: 3,
         }}
      >
         <IconButton
            // sx={{ ml: 1 }}
            onClick={handleTheme}
            color="inherit"
         >
            {theme.palette.mode === 'dark' ? (
               <Brightness7Icon />
            ) : (
               <Brightness4Icon />
            )}
         </IconButton>
      </Box>
   );
}
