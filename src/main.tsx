import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddressBook } from './apps/AddressBook';
import { installAddressBookMocks } from './host/installAddressBookMocks';
import { hostTheme } from './host/theme';

installAddressBookMocks();

const container = document.getElementById('root');

if (container === null) {
  throw new Error('Root container was not found');
}

createRoot(container).render(
  <ThemeProvider theme={hostTheme}>
    <AddressBook />
    <ToastContainer />
  </ThemeProvider>,
);
