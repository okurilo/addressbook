import { installFetchMock } from '../apps/AddressBook/mocks/installFetchMock';

export const installAddressBookMocks = (): void => {
  if (import.meta.env.VITE_ADDRESSBOOK_USE_MOCKS === 'true') {
    installFetchMock();
  }
};
