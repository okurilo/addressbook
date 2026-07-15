import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import type { RouteComponentProps } from '@reach/router';
import { Loader } from '@pulse/ui/components/Loader';
import { Text } from '@pulse/ui/components/Text';
import { Empty } from '@pulse/ui/components/Empty';
import {
  fetchReferencePhoneCategories,
  fetchReferencePhones,
} from '../../api/directory/referencePhonesClient';
import type { ReferencePhone, ReferencePhoneCategory } from '../../api/directory/referencePhones';
import { RetryState } from '../../components/RetryState';
import { useLocation, useNavigate } from '@reach/router';
import { routePaths } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';
import {
  Page,
  Sidebar,
  SidebarButton,
  Content,
  Table,
  HeadCell,
  Row,
  Cell,
  ServiceCell,
  ServiceAvatar,
  ActionCell,
  ActionLink,
  ActionButton,
  CenteredState,
} from './styled';

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

type CategoriesState = 'loading' | 'success' | 'empty' | 'error';
type PhonesState = 'loading' | 'success' | 'empty' | 'error';

export const ReferencePhonesPage = (_props: RouteComponentProps): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<ReferencePhoneCategory[]>([]);
  const [phones, setPhones] = useState<ReferencePhone[]>([]);
  const [categoriesState, setCategoriesState] = useState<CategoriesState>('loading');
  const [phonesState, setPhonesState] = useState<PhonesState>('loading');
  const [categoriesRetryToken, setCategoriesRetryToken] = useState(0);
  const [phonesRetryToken, setPhonesRetryToken] = useState(0);
  const categoryButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const searchParams = new URLSearchParams(location.search);
  const categoryFromUrl = searchParams.get('categoryId') ?? '';
  const query = searchParams.get('q') ?? '';
  const activeCategoryId = categoryFromUrl === '' ? categories[0]?.id ?? '' : categoryFromUrl;
  const activeCategory = categories.find((item) => item.id === activeCategoryId) ?? null;
  const normalizedQuery = query.trim().toLocaleLowerCase('ru');
  const filteredPhones = phones.filter((phone) =>
    [phone.title, phone.responsibility, phone.phone ?? ''].some((value) =>
      value.toLocaleLowerCase('ru').includes(normalizedQuery)
    )
  );

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
          const nextParams = new URLSearchParams(location.search);
          nextParams.set('categoryId', nextCategories[0].id);
          ignorePromise(
            navigate(`${routePaths.referencePhones}?${nextParams.toString()}`, {
              replace: true,
            })
          );
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
  }, [categoriesRetryToken, navigate]);

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
  }, [activeCategoryId, categoriesState, phonesRetryToken]);

  const openCategory = (categoryId: string): void => {
    const nextParams = new URLSearchParams(location.search);
    nextParams.set('categoryId', categoryId);
    ignorePromise(
      navigate(`${routePaths.referencePhones}?${nextParams.toString()}`, { replace: true })
    );
  };

  const focusCategory = (categoryIndex: number): void => {
    const category = categories[categoryIndex];

    if (category === undefined) {
      return;
    }

    categoryButtonRefs.current[categoryIndex]?.focus();
    openCategory(category.id);
  };

  if (categoriesState === 'loading') {
    return (
      <CenteredState>
        <Loader />
      </CenteredState>
    );
  }

  if (categoriesState === 'error') {
    return (
      <RetryState
        title="Не удалось загрузить категории"
        description="Попробуйте повторить запрос или открыть экран позже."
        onRetry={() => {
          setCategoriesRetryToken((currentValue) => currentValue + 1);
        }}
      />
    );
  }

  if (categoriesState === 'empty') {
    return (
      <Empty
        type="noData"
        title="Категории не найдены"
        description="Справочные телефоны пока отсутствуют."
      />
    );
  }

  return (
    <Page>
      <Sidebar
        role="tablist"
        aria-label="Категории справочных телефонов"
        aria-orientation="vertical"
      >
        {categories.map((category, categoryIndex) => (
          <SidebarButton
            key={category.id}
            ref={(element) => {
              categoryButtonRefs.current[categoryIndex] = element;
            }}
            type="button"
            role="tab"
            id={`reference-phone-tab-${category.id}`}
            aria-controls={`reference-phone-panel-${category.id}`}
            aria-selected={category.id === activeCategoryId}
            tabIndex={category.id === activeCategoryId ? 0 : -1}
            $active={category.id === activeCategoryId}
            onClick={() => {
              openCategory(category.id);
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                focusCategory((categoryIndex + 1) % categories.length);
              }

              if (event.key === 'ArrowUp') {
                event.preventDefault();
                focusCategory((categoryIndex - 1 + categories.length) % categories.length);
              }
            }}
          >
            {category.title}
          </SidebarButton>
        ))}
      </Sidebar>

      <Content
        role="tabpanel"
        id={`reference-phone-panel-${activeCategoryId}`}
        aria-labelledby={`reference-phone-tab-${activeCategoryId}`}
      >
        <Text variant="h2Semibold">{activeCategory?.title ?? 'Справочные телефоны'}</Text>

        {phonesState === 'loading' ? (
          <CenteredState>
            <Loader />
          </CenteredState>
        ) : null}

        {phonesState === 'error' ? (
          <RetryState
            title="Не удалось загрузить службы"
            description="Попробуйте повторить запрос или открыть категорию позже."
            onRetry={() => {
              setPhonesRetryToken((currentValue) => currentValue + 1);
            }}
          />
        ) : null}

        {phonesState === 'empty' ? (
          <Empty
            type="noResults"
            title="Список служб пуст"
            description="Для выбранной категории службы отсутствуют."
          />
        ) : null}

        {phonesState === 'success' && filteredPhones.length === 0 ? (
          <Empty
            type="noResults"
            title="Ничего не найдено"
            description="В выбранной категории нет телефонов, подходящих под глобальный фильтр."
          />
        ) : null}

        {phonesState === 'success' && filteredPhones.length > 0 ? (
          <Table>
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '46%' }} />
              <col style={{ width: '24%' }} />
            </colgroup>
            <thead>
              <tr>
                <HeadCell>
                  {activeCategoryId === 'support-services' ? 'Дежурная смена' : 'Служба'}
                </HeadCell>
                <HeadCell>Зона ответственности</HeadCell>
                <HeadCell>Связаться</HeadCell>
              </tr>
            </thead>
            <tbody>
              {filteredPhones.map((phone) => {
                const directPhone = phone.phone;

                return (
                  <Row key={phone.id}>
                    <Cell>
                      <ServiceCell>
                        <ServiceAvatar $accentColor={phone.accentColor}>
                          {phone.initials}
                        </ServiceAvatar>
                        <Text variant="body1Semibold">{phone.title}</Text>
                      </ServiceCell>
                    </Cell>
                    <Cell>
                      <Text
                        variant="body2ParagraphRegular"
                        color={theme.tokens.current.core.text.secondary}
                      >
                        {phone.responsibility}
                      </Text>
                    </Cell>
                    <Cell>
                      <ActionCell>
                        {directPhone === null ? (
                          <Text
                            variant="body2Regular"
                            color={theme.tokens.current.core.text.tertiary}
                          >
                            не указан
                          </Text>
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
