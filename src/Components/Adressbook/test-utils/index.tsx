import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { render as testingLibraryRender } from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { AdressbookProvider } from '../provider';
import type { AdressbookPerson } from '../types';
import { testTheme } from './testTheme';

export type AdressbookTestProviderProps = {
  enabled?: boolean;
  people?: AdressbookPerson[];
  isLoading?: boolean;
  onPersonOpen?: (personId: string) => void;
  renderActions?: (
    personId: string,
    isFavorite?: boolean,
    favoritePersons?: Set<string>,
    favoriteGroupId?: string,
    personalPhone?: string
  ) => ReactNode;
};

export type TestProviderOptions = {
  addressbook?: AdressbookTestProviderProps;
};

export type AllTheProvidersProps = PropsWithChildren<TestProviderOptions>;

export const AllTheProviders = ({
  children,
  addressbook,
}: AllTheProvidersProps): JSX.Element => {
  const content =
    addressbook === undefined ? (
      children
    ) : (
      <AdressbookProvider
        enabled={addressbook.enabled}
        people={addressbook.people ?? []}
        isLoading={addressbook.isLoading}
        onPersonOpen={addressbook.onPersonOpen}
        renderActions={addressbook.renderActions}
      >
        {children}
      </AdressbookProvider>
    );

  return <ThemeProvider theme={testTheme}>{content}</ThemeProvider>;
};

export const createTestWrapper =
  (providerOptions: TestProviderOptions = {}) =>
  ({ children }: PropsWithChildren): JSX.Element =>
    <AllTheProviders {...providerOptions}>{children}</AllTheProviders>;

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  providerOptions?: TestProviderOptions;
};

const customRender = (
  ui: ReactElement,
  { providerOptions, ...renderOptions }: CustomRenderOptions = {}
): RenderResult =>
  testingLibraryRender(ui, {
    wrapper: createTestWrapper(providerOptions),
    ...renderOptions,
  });

export * from '@testing-library/react';
export { customRender as render };
