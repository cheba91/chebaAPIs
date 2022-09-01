import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Grid, Link, useTheme } from '@mui/material';

const IconLink = ({ link, children }) => {
   const textClr = useTheme().palette.text.primary;
   return (
      <Link sx={{ color: textClr }} href={link} rel="noopener" target="_blank">
         {children}
      </Link>
   );
};

export default function SocialIcons({ customStyles }) {
   return (
      <Grid
         sx={{ ...customStyles }}
         container
         justifyContent="center"
         alignItems="center"
         gap={1}
      >
         <Grid item>
            <IconLink link={'https://github.com/cheba91'}>
               <GitHubIcon />
            </IconLink>
         </Grid>
         <Grid item>
            <IconLink link={'https://www.linkedin.com/in/blazcebasek/'}>
               <LinkedInIcon />
            </IconLink>
         </Grid>
      </Grid>
   );
}
