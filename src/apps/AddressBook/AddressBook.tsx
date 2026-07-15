import { Suspense } from 'react';
import { Content as LayoutContent } from '@pulse/ui/components/Layout';
import { App } from './App';

export const AddressBook = (): JSX.Element => (
  <Suspense fallback={null}>
    <LayoutContent>
      <App />
    </LayoutContent>
  </Suspense>
);

