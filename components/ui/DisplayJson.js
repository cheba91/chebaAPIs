import { Box } from '@mui/material';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
   vs2015,
   lightfair,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useTheme } from '@mui/system';

export default function DisplayJson({ jsonData }) {
   const themeMode = useTheme().palette.mode;
   return (
      <Box sx={{ width: '100%', height: '300px' }}>
         <SyntaxHighlighter
            wrapLines={true}
            lineProps={{
               style: { wordBreak: 'break-all' },
            }}
            language="javascript"
            style={themeMode === 'dark' ? vs2015 : lightfair}
         >
            {jsonData}
         </SyntaxHighlighter>
      </Box>
   );
}
