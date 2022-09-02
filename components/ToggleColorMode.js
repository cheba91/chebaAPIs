import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ToggleColorMode({ toggleTheme, customStyles }) {
   const mode = useTheme().palette.mode;
   const handleTheme = () => {
      toggleTheme(mode === 'dark' ? 'light' : 'dark');
   };
   return (
      <Box
         sx={{
            marginLeft: 'auto',
            ...customStyles,
         }}
      >
         <IconButton onClick={handleTheme} color="inherit">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
         </IconButton>
      </Box>
   );
}
