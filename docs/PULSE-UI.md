# Контракты `@pulse/ui`

## Источник истины

Контракты сверены с полной выгрузкой типизации DS от 13 июля 2026 года: 2 raw-файла, 264 исходных файла, 9 260 строк. Обе исходные части хранятся без изменений в [`docs/pulse-ui-types/raw`](pulse-ui-types/raw), а инструкция для точечного чтения находится в [`docs/pulse-ui-types/README.md`](pulse-ui-types/README.md).

Этот документ — краткая вручную проверенная памятка по уже используемой поверхности. При расхождении приоритет имеет точная сгенерированная секция из [`INDEX.md`](pulse-ui-types/INDEX.md), полученная из raw-выгрузки.

Для нового или изменяемого компонента нельзя ограничиваться этой памяткой: нужно найти исходный `types.ts` через индекс и прочитать его вместе с реально необходимыми импортируемыми типами.

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
| `components/ModalNew` | DS contract | обязательные `title/onClose`, кастомный `header`, без `children` |
| `components/Input` | DS contract | native input props, suggestions API, `placeWhereUsed` |
| `components/Layout` | используемый экспорт | используется только `Content`; отдельного `Layout/types.ts` в выгрузке нет |
| `components/Empty` | DS contract | обязательные `type`, `description`; встроенные действия через button props |
| `components/Empty/Page` | локальный path-adapter | реэкспорт подтверждённого контракта `components/Empty` |

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

### ModalNew

`ModalProps` требует `title` и `onClose`. Произвольный React-контент передаётся через подтверждённый prop `header`; `children` в публичном контракте отсутствует и не добавляется в локальный stub.

## Empty

Выгрузка содержит `src/components/Empty/types.ts`. Для пустых состояний используется только импорт:

```tsx
import { Empty } from '@pulse/ui/components/Empty';
```

Переданный AddressBook также использует path `@pulse/ui/components/Empty/Page`. В локальной
песочнице этот path является тонким реэкспортом того же `Empty` и не расширяет его props.

Подтверждённые базовые props:

```ts
type EmptyType = 'start' | 'noResults' | 'wait' | 'create' | 'noData';
type Size = 'default' | 'small';

interface BaseProps {
  type: EmptyType;
  description: string;
  title?: string;
  buttonLabel?: string;
  onClick?: () => void;
  buttonSecondaryLabel?: string;
  onSecondaryBtnClick?: () => void;
}
```

- `type` и `description` обязательны;
- `start` используется для начального состояния;
- `noResults` — когда фильтр или поиск не дал результатов;
- `noData` — когда набор данных пуст сам по себе;
- `wait` — для состояния, которое предлагает повторить действие;
- `create` — когда пользователю предлагается создать сущность;
- `illustration` отсутствует: иллюстрация определяется самим DS по `type`;
- компонента `EmptyState` в DS нет, локальный alias для него запрещён.

Пример retry:

```tsx
<Empty
  type="wait"
  title="Не удалось загрузить данные"
  description="Попробуйте ещё раз"
  buttonLabel="Повторить"
  onClick={onRetry}
/>
```

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
- union `Empty.type`, обязательность `description` и отсутствие prop `illustration`.

Production build дополнительно подтверждает, что Vite разрешает те же import-path, что и TypeScript.
