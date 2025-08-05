import { colors } from './colors';

export const theme = {
  /* Default values */
  fontFamily: `'Manrope Variable', system-ui, Helvetica, Arial, sans-serif`,
  fontWeight: 400,
  lineHeight: 1.5,

  /* Utilities */
  colors,
  spacer: 4,
  spacing(factor: number) {
    return `${theme.spacer * factor}px`;
  },
};
