import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { AddressBook } from './apps/AddressBook';
import { hostTheme } from './host/theme';

const container = document.getElementById('root');

if (container === null) {
  throw new Error('Root container was not found');
}

createRoot(container).render(
  <ThemeProvider theme={hostTheme}>
    <AddressBook />
  </ThemeProvider>,
);
