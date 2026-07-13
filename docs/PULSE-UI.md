# Контракты `@pulse/ui`

## Источник истины

Контракты сверены с полной выгрузкой типизации DS от 13 июля 2026 года (`types-context.part-1.md` и `types-context.part-2.md`, 264 исходных файла). При расхождении локального stub с выгрузкой приоритет имеет выгрузка.

Локальные stubs реализуют только поведение, необходимое песочнице, но их публичные props не должны расходиться с DS. Новый prop сначала проверяется в соответствующем `types.ts`, после чего добавляется в stub.

## Подключение

Один и тот же каталог используется обеими системами разрешения модулей:

- Vite: `@pulse/ui/components` → `src/stubs/pulse/ui`;
- TypeScript: `@pulse/ui/components/*` → `src/stubs/pulse/ui/*`.

Специфичный alias объявлен раньше общего `@pulse/*`, поэтому импорт компонента не перехватывается общим правилом. Корректность именованных экспортов и ключевых prop-union дополнительно проверяет `src/host/pulseUiContractAudit.ts`; файл включён в обычный `tsc --noEmit`.

## Результат повторного аудита

| Import | Статус | Подтверждённый контракт |
| --- | --- | --- |
| `components/Text` | DS contract | обязательный `variant`, `ColorProps`, `SpaceProps` |
| `components/Avatar` | DS contract | `$type`, `$text`, `$size`, `$shape` и остальные props из `AvatarProps` |
| `components/Button` | DS contract | `$type`, `$size`, `$state`, `$containsOnlyIcon`, `$fullWidth`, `$isLoading` |
| `components/Loader` | DS contract | `isOnColor`, `size`, `wrapped`, `children` |
| `components/Input` | DS contract | native input props, suggestions API, `placeWhereUsed` |
| `components/Layout` | используемый экспорт | используется только `Content`; отдельного `Layout/types.ts` в выгрузке нет |
| `components/EmptyState` | host-adapter | отсутствует в выгрузке, сохранён по отдельному продуктовому требованию |

## Используемые компоненты

### Text

Исходный контракт:

```ts
type Variant = keyof DefaultTheme['typography'];

interface TextProps extends ColorProps<DefaultTheme>, SpaceProps<DefaultTheme> {
  variant: Variant | ResponsiveValue<Variant, DefaultTheme>;
}
```

- `variant` обязателен;
- допустимы все ключи `theme.typography` и responsive-значения;
- цвет и фон передаются через styled-system color props;
- отступы передаются через styled-system space props;
- props `tone` и `weight` отсутствуют.

### Avatar

```ts
type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
type Shape = 'circle' | 'square';
```

Основные props: `$type`, `$icon`, `$size`, `$shape`, `$text`, `$label`, `$hasBadge`, `$status`, `$verificationStatus`, `$fallbackType`.

Для инициалов используется:

```tsx
<Avatar $type="initials" $text="ИО" $size="m" />
```

Prop `$initials` в DS отсутствует.

### Button

```ts
type Type = 'primary' | 'secondary' | 'tertiary' | 'mono' | 'monoSecondary';
type Size = 'l' | 'm' | 'm-alt' | 's' | 'xs';
type State = 'focus' | 'hover' | 'pressed';
```

Props: `$type`, `$size`, `$state`, `$containsOnlyIcon`, `$fullWidth`, `$isLoading`. Значения по умолчанию: `$type="primary"`, `$size="m"`.

Полиморфное использование как ссылки оформляется через styled-components `as`:

```tsx
<Button as="a" href="tel:+70000000000">+70000000000</Button>
```

### Loader

```ts
type Size = 'm' | 'l';

interface LoaderProps {
  isOnColor?: boolean;
  size?: Size;
  wrapped?: boolean;
  children?: ReactNode;
}
```

Значения по умолчанию: `isOnColor=false`, `size="m"`, `wrapped=false`.

### Input

`InputProps` расширяет `InputHTMLAttributes<HTMLInputElement>` и добавляет:

- `suggestions?: string[] | Suggestion[]`;
- `onSuggestionSelect?: (value: string | Suggestion) => void`;
- `placeWhereUsed?: 'body' | 'modal'`.

Текущий экран использует только стандартные input-атрибуты.

### Layout

В приложении используется только `Layout.Content` без дополнительных props. Явные типы выгрузки дополнительно описывают `Layout.Column.cols` и `Layout.Provider.offset`; не моделировать их локально до фактического использования.

## Empty и исключение EmptyState

В выгрузке присутствует `src/components/Empty/types.ts` с типами `start`, `noResults`, `wait`, `create`, `noData`. Компонента или типа `EmptyState` в выгрузке нет.

Импорт `@pulse/ui/components/EmptyState` сохранён по отдельному продуктовому требованию. В локальной среде это host-adapter, а не подтверждённая часть DS. Нельзя использовать его контракт как основание для других компонентов.

## Неактивные компоненты

Исторические неиспользуемые stubs `IconButton`, `Skeleton`, `Tabs`, `Spinner` и `LayoutGrid` удалены из локальной обвязки:

- старый `Tabs` имел API `items/activeKey/onChange`, которого нет в DS;
- плоский `IconButton` не соответствовал подтверждённому `components/Button/IconButton`;
- `Skeleton` не моделировал styled-system layout/space/color props;
- `Spinner` отсутствует в предоставленной выгрузке;
- экспорт `LayoutGrid.Main` не подтверждён типами `LayoutGrid`.

Перед использованием такого компонента создаётся новый минимальный stub по точному пути исходного DS и соответствующему `types.ts`. Неиспользуемые компоненты заранее не эмулируются.

## Автоматическая проверка

`src/host/pulseUiContractAudit.ts` compile-time проверяет:

- union типов и размеров `Avatar`;
- union типов, размеров и состояний `Button`;
- props `Loader` и `Input`;
- обязательность `Text.variant` и отсутствие `tone/weight`;
- наличие `Layout.Content`;
- отдельный контракт host-adapter `EmptyState`.

Production build дополнительно подтверждает, что Vite разрешает те же import-path, что и TypeScript.
