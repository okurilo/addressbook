import { Suspense } from 'react';
import type { FC } from 'react';
import { Content as LayoutContent } from '@pulse/ui/components/Layout';
import type { RouteComponentProps } from '@reach/router';
import { App } from './App';

export const AddressBook: FC<RouteComponentProps> = () => (
  <Suspense fallback={null}>
    <LayoutContent>
      <App />
    </LayoutContent>
  </Suspense>
);
