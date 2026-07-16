import { installAddressBookMockTransport } from './addressBookMockTransport';

export const installAddressBookMocks = (): void => {
  if (import.meta.env.VITE_ADDRESSBOOK_USE_REAL_API !== 'true') {
    installAddressBookMockTransport();
  }
};
