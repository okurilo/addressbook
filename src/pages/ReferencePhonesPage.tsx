import { useEffect, useState } from 'react';
import type { RouteComponentProps } from '@reach/router';
import { useLocation, useNavigate } from '@reach/router';
import { styled } from 'styled-components';
import { EmptyState } from '@pulse/ui/EmptyState';
import { Spinner } from '@pulse/ui/Spinner';
import { Text } from '@pulse/ui/Text';
import {
  fetchReferencePhoneCategories,
  fetchReferencePhones,
} from '../api/directory/referencePhonesClient';
import type {
  ReferencePhone,
  ReferencePhoneCategory,
} from '../api/directory/referencePhones';

const Page = styled('section')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '280px minmax(0, 1fr)',
  gap: theme.spacing.xl,
  alignItems: 'start',
}));

const Sidebar = styled('aside')(({ theme }) => ({
  background: theme.colors.surface,
  borderRadius: theme.radius.lg,
  padding: theme.spacing.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.md,
}));

const SidebarButton = styled('button')<{ $active: boolean }>(({ theme, $active }) => ({
  border: 'none',
  background: 'transparent',
  padding: 0,
  textAlign: 'left',
  cursor: 'pointer',
  color: $active ? theme.colors.textPrimary : theme.colors.textSecondary,
  fontWeight: $active ? 600 : 400,
  lineHeight: 1.45,
}));

const Content = styled('section')(({ theme }) => ({
  background: theme.colors.surface,
  borderRadius: theme.radius.lg,
  padding: theme.spacing.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.lg,
}));

const Table = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed',
});

const HeadCell = styled('th')(({ theme }) => ({
  padding: `${theme.spacing.sm}px 0 ${theme.spacing.md}px`,
  textAlign: 'left',
  color: theme.colors.textSecondary,
  fontWeight: 500,
  borderBottom: `1px solid ${theme.colors.border}`,
}));

const Row = styled('tr')(({ theme }) => ({
  borderBottom: `1px solid ${theme.colors.border}`,
}));

const Cell = styled('td')(({ theme }) => ({
  padding: `${theme.spacing.md}px 0`,
  verticalAlign: 'top',
}));

const ServiceCell = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '40px minmax(0, 1fr)',
  gap: theme.spacing.md,
  alignItems: 'start',
}));

const ServiceAvatar = styled('div')<{ $accentColor: string }>(({ theme, $accentColor }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.radius.pill,
  background: $accentColor,
  color: '#ffffff',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
}));

const ActionCell = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing.sm,
  flexWrap: 'wrap',
}));

const ActionLink = styled('a')(({ theme }) => ({
  minHeight: 32,
  padding: `0 ${theme.spacing.md}px`,
  borderRadius: theme.radius.pill,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.surface,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.textPrimary,
}));

const ActionButton = styled('button')(({ theme }) => ({
  minHeight: 32,
  padding: `0 ${theme.spacing.md}px`,
  borderRadius: theme.radius.pill,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.surface,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.textSecondary,
  cursor: 'pointer',
}));

const CenteredState = styled('div')(({ theme }) => ({
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.colors.surface,
  borderRadius: theme.radius.lg,
  padding: theme.spacing.xl,
}));

type CategoriesState = 'loading' | 'success' | 'empty' | 'error';
type PhonesState = 'loading' | 'success' | 'empty' | 'error';

const copyValue = async (value: string): Promise<void> => {
  if (navigator.clipboard !== undefined) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const element = document.createElement('textarea');
  element.value = value;
  element.setAttribute('readonly', 'true');
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
};

export const ReferencePhonesPage = (_props: RouteComponentProps): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<ReferencePhoneCategory[]>([]);
  const [phones, setPhones] = useState<ReferencePhone[]>([]);
  const [categoriesState, setCategoriesState] = useState<CategoriesState>('loading');
  const [phonesState, setPhonesState] = useState<PhonesState>('loading');
  const categoryFromUrl = new URLSearchParams(location.search).get('categoryId') ?? '';
  const activeCategoryId = categoryFromUrl === '' ? categories[0]?.id ?? '' : categoryFromUrl;
  const activeCategory = categories.find((item) => item.id === activeCategoryId) ?? null;

  useEffect(() => {
    let isActive = true;

    const loadCategories = async (): Promise<void> => {
      setCategoriesState('loading');

      try {
        const nextCategories = await fetchReferencePhoneCategories();

        if (!isActive) {
          return;
        }

        setCategories(nextCategories);
        setCategoriesState(nextCategories.length === 0 ? 'empty' : 'success');

        if (nextCategories.length > 0 && categoryFromUrl === '') {
          void navigate(`/reference-phones?categoryId=${nextCategories[0].id}`, {
            replace: true,
          });
        }
      } catch {
        if (!isActive) {
          return;
        }

        setCategories([]);
        setCategoriesState('error');
      }
    };

    void loadCategories();

    return () => {
      isActive = false;
    };
  }, [categoryFromUrl, navigate]);

  useEffect(() => {
    let isActive = true;

    if (activeCategoryId === '') {
      setPhones([]);
      setPhonesState(categoriesState === 'loading' ? 'loading' : 'empty');
      return undefined;
    }

    const loadPhones = async (): Promise<void> => {
      setPhonesState('loading');

      try {
        const nextPhones = await fetchReferencePhones(activeCategoryId);

        if (!isActive) {
          return;
        }

        setPhones(nextPhones);
        setPhonesState(nextPhones.length === 0 ? 'empty' : 'success');
      } catch {
        if (!isActive) {
          return;
        }

        setPhones([]);
        setPhonesState('error');
      }
    };

    void loadPhones();

    return () => {
      isActive = false;
    };
  }, [activeCategoryId, categoriesState]);

  const openCategory = (categoryId: string): void => {
    void navigate(`/reference-phones?categoryId=${categoryId}`, { replace: true });
  };

  if (categoriesState === 'loading') {
    return (
      <CenteredState>
        <Spinner />
      </CenteredState>
    );
  }

  if (categoriesState === 'error') {
    return (
      <EmptyState
        title="Не удалось загрузить категории"
        description="Попробуйте переключить mock-сценарий или открыть экран позже."
      />
    );
  }

  if (categoriesState === 'empty') {
    return (
      <EmptyState
        title="Категории не найдены"
        description="Для текущего mock-сценария справочные телефоны отсутствуют."
      />
    );
  }

  return (
    <Page>
      <Sidebar>
        {categories.map((category) => (
          <SidebarButton
            key={category.id}
            type="button"
            $active={category.id === activeCategoryId}
            onClick={() => {
              openCategory(category.id);
            }}
          >
            {category.title}
          </SidebarButton>
        ))}
      </Sidebar>

      <Content>
        <Text as="h2" size="lg" weight="semibold">
          {activeCategory?.title ?? 'Справочные телефоны'}
        </Text>

        {phonesState === 'loading' ? (
          <CenteredState>
            <Spinner />
          </CenteredState>
        ) : null}

        {phonesState === 'error' ? (
          <EmptyState
            title="Не удалось загрузить службы"
            description="Попробуйте переключить mock-сценарий или открыть категорию позже."
          />
        ) : null}

        {phonesState === 'empty' ? (
          <EmptyState
            title="Список служб пуст"
            description="Для выбранной категории службы в текущем mock-сценарии отсутствуют."
          />
        ) : null}

        {phonesState === 'success' ? (
          <Table>
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '46%' }} />
              <col style={{ width: '24%' }} />
            </colgroup>
            <thead>
              <tr>
                <HeadCell>Дежурная смена</HeadCell>
                <HeadCell>Зона ответственности</HeadCell>
                <HeadCell>Связаться</HeadCell>
              </tr>
            </thead>
            <tbody>
              {phones.map((phone) => {
                const directPhone = phone.phone;

                return (
                  <Row key={phone.id}>
                    <Cell>
                      <ServiceCell>
                        <ServiceAvatar $accentColor={phone.accentColor}>
                          {phone.initials}
                        </ServiceAvatar>
                        <Text weight="semibold">{phone.title}</Text>
                      </ServiceCell>
                    </Cell>
                    <Cell>
                      <Text>{phone.responsibility}</Text>
                    </Cell>
                    <Cell>
                      <ActionCell>
                        {directPhone === null ? (
                          <Text tone="secondary">не указан</Text>
                        ) : (
                          <>
                            <ActionLink href={`tel:${directPhone}`}>{directPhone}</ActionLink>
                            <ActionButton
                              type="button"
                              onClick={() => {
                                void copyValue(directPhone);
                              }}
                            >
                              Копировать
                            </ActionButton>
                          </>
                        )}
                      </ActionCell>
                    </Cell>
                  </Row>
                );
              })}
            </tbody>
          </Table>
        ) : null}
      </Content>
    </Page>
  );
};
