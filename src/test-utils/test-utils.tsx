import type { PropsWithChildren, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { render as testingLibraryRender } from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { testTheme } from './testTheme';

const TestProviders = ({ children }: PropsWithChildren): JSX.Element => (
  <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
);

const customRender = (
  ui: ReactElement,
  renderOptions: Omit<RenderOptions, 'wrapper'> = {}
): RenderResult =>
  testingLibraryRender(ui, {
    wrapper: TestProviders,
    ...renderOptions,
  });

export * from '@testing-library/react';
export { customRender as render };
