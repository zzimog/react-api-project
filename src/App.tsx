import { UsersZoom } from './UsersZoom';

import '@fontsource-variable/manrope/wght.css';
import '@fontsource-variable/material-symbols-rounded/wght.css';
import './ui/index.css';
import styled from '@emotion/styled';

const theme = {
  primary: 'red',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function newStyled(tag: any) {
  return styled(tag);
}

styled('div')

const TestRoot = newStyled('div')((props) => ({
  color: props.color || 'red',
}));

const App = () => {
  return <TestRoot>Hello</TestRoot>;

  return <UsersZoom />;
};

export default App;
