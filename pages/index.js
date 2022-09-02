import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SocialIcons from '../components/SocialIcons';
import ExtinctApi from '../components/apiTabs/ExtinctApi';
import ToggleColorMode from '../components/ToggleColorMode';
const drawerWidth = 250;

export default function ResponsiveDrawer({ toggleTheme }) {
   const apis = ['Extinct', 'Test'];
   const [mobileOpen, setMobileOpen] = useState(false);
   const [currentTab, setCurrentTab] = useState(apis[0]);

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const drawer = (
      <>
         <Typography
            sx={{ textAlign: 'center', padding: '1em 0' }}
            variant="h6"
            component="h2"
            width={drawerWidth - 1}
         >
            chebaAPIs
         </Typography>
         <Divider />
         <List>
            {apis.map((text) => (
               <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => setCurrentTab(text)}>
                     <ListItemText
                        primary={text}
                        sx={{ textAlign: 'center' }}
                     />
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
         <Divider />
         <SocialIcons customStyles={{ margin: '1em 0' }} />
      </>
   );

   return (
      <Box sx={{ display: 'flex' }}>
         <AppBar
            position="fixed"
            sx={{
               width: { sm: `calc(100% - ${drawerWidth}px)` },
               ml: { sm: `${drawerWidth}px` },
            }}
         >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                     mr: 2,
                     display: { sm: 'none' },
                  }}
               >
                  <MenuIcon />
               </IconButton>
               <ToggleColorMode toggleTheme={toggleTheme} />
            </Toolbar>
         </AppBar>
         <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
         >
            <Drawer
               variant="temporary"
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{
                  keepMounted: true,
               }}
               sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': {
                     boxSizing: 'border-box',
                     width: drawerWidth,
                     overflow: 'hidden',
                  },
               }}
            >
               {drawer}
            </Drawer>
            <Drawer
               variant="permanent"
               sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': {
                     boxSizing: 'border-box',
                     width: drawerWidth,
                  },
               }}
               open
            >
               {drawer}
            </Drawer>
         </Box>
         {/* Main Section */}
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               p: 5,
               width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
         >
            <Toolbar />
            {/* Show correct API */}
            {currentTab === 'Extinct' && <ExtinctApi />}
            {currentTab === 'Test' && 'Test'}
         </Box>
      </Box>
   );
}
