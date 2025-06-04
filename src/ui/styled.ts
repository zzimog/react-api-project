import type { CreateStyled } from '@emotion/styled';
import newStyled from '@emotion/styled';

const theme = {
  palette: {
    primary: 'blue',
    secondary: 'red',
    accent: 'green',
  },
  defaults: {
    radius: 8,
  },
};

const styled: CreateStyled = newStyled;

export default styled;
