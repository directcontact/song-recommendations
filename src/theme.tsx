import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  colors: {
    green: {
      600: '#116e32',
      500: '#1db954',
      400: '#1ed760',
    },
    black: {
      500: '#121212',
      400: '#222326',
    },
  },
  fonts,
  breakpoints,
});

export default theme;
