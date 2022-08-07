<<<<<<< HEAD
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
=======
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
>>>>>>> 249582ef5a13b044e56f660c443709db1332e122

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
<<<<<<< HEAD
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
=======
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
>>>>>>> 249582ef5a13b044e56f660c443709db1332e122
});

const theme = extendTheme({
  colors: {
<<<<<<< HEAD
    black: "#191414",
    green: "#1DB954",
=======
    green: {
      600: '#116e32',
      500: '#1db954',
      400: '#1ed760',
    },
    black: {
      500: '#121212',
      400: '#222326',
    },
>>>>>>> 249582ef5a13b044e56f660c443709db1332e122
  },
  fonts,
  breakpoints,
});

export default theme;
