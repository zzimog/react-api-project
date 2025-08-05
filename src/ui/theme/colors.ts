import { hsl } from './hsl';

// PALETTE
// https://coolors.co/06080e-007991-9cd3c6-f3f7f4-dfc853

export type ThemeColors = {
  black: hsl;
  white: hsl;
  primary: hsl;
  secondary: hsl;
  accent: hsl;
};

export const colors: ThemeColors = {
  black: hsl(225, 40, 4),
  white: hsl(135, 20, 96),
  primary: hsl(190, 100, 28),
  /*
    100: '#00181d',
    200: '#003039',
    300: '#004756',
    400: '#005f72',
    500: '#007991',
    600: '#00b4d8',
    700: '#23daff',
    800: '#6ce7ff',
    900: '#b6f3ff',
  */
  secondary: hsl(166, 39, 72),
  /*
    100: '#17332c',
    200: '#2e6558',
    300: '#449884',
    400: '#6abca9',
    500: '#9cd3c6',
    600: '#b0dcd1',
    700: '#c4e4dd',
    800: '#d8ede8',
    900: '#ebf6f4',
  */
  accent: hsl(50, 69, 60),
  /*
    100: '#342d09',
    200: '#675913',
    300: '#9b861c',
    400: '#cfb326',
    500: '#dfc853',
    600: '#e6d375',
    700: '#ecde98',
    800: '#f2e9ba',
    900: '#f9f4dd',
  */
};
