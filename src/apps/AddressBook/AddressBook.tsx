import { FC, Suspense } from 'react';
import { Content as LayoutContent } from '@pulse/ui/components/Layout';
import { RouteComponentProps } from '@reach/router';
import { App } from './App';

export const AddressBook: FC<RouteComponentProps> = () => (
  <Suspense fallback={null}>
    <LayoutContent>
      <App />
    </LayoutContent>
  </Suspense>
);

