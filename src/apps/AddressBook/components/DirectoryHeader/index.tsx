import { useEffect } from 'react';
import { useBreadcrumbs } from '@sber-hrp-core/api-breadcrumbs';
import { t } from 'i18next';
import { Header, Wrapper } from './styled';

export const DirectoryHeader = (): JSX.Element => {
  const title = t('справочник');

  const { addItems, clearItems } = useBreadcrumbs();

  useEffect(() => {
    clearItems?.();
    addItems?.({ title, href: '/platform/launchpad' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <Wrapper>
      {/* <AppMarkIcon /> */}
      {/* <Text variant="h1Bold">Справочник</Text> */}

      <Header>{title}</Header>
    </Wrapper>
  );
};

