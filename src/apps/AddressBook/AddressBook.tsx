import { FC, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Content as LayoutContent } from '@pulse/ui/components/Layout';

import { SERVICE_NS } from '../../constants';
import { SettingsProvider } from '../../Settings';
import { App } from './App';
import { installFetchMock } from './mocks/installFetchMock';

export const AddressBook: FC = () => {
  const { t } = useTranslation(SERVICE_NS);

  return (
    <Suspense fallback={null}>
      <SettingsProvider>
        <LayoutContent>
          <App />
        </LayoutContent>
      </SettingsProvider>
    </Suspense>
  );
};

installFetchMock();

