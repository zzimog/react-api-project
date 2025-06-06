import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/ibm-plex-sans/wght.css';
import '@fontsource-variable/ibm-plex-sans/wght-italic.css';
import '@fontsource-variable/manrope/wght.css';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
