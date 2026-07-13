# Pulse theme в локальной обвязке

## Источник контракта

Локальный `HostTheme` повторяет публичную структуру выгруженного Pulse theme. Значения цветов и размеров в песочнице являются локальной эмуляцией; имена полей и форма объектов должны соответствовать host-контракту.

Тема подключается один раз через `ThemeProvider` в `src/main.tsx`. Тип `styled-components/DefaultTheme` расширяется через `src/host/styled.d.ts`, а тип и mock-значение находятся в `src/host/theme.ts`.

Типовой импорт `Theme` из `@pulse/ui/theme`, используемый общим HTTP-запросником, в локальной среде разрешается отдельным host-adapter `src/host/pulseTheme.ts`. Он моделирует только необходимый запроснику union `screenSize`; контракт React theme по-прежнему определяется `HostTheme`.

## Design tokens

Токены находятся непосредственно в `theme.tokens.current.*`. Уровней `core` и `colors` нет.

- `background.default`, `background.field`
- `accent.primary`, `accent.secondary`, `accent.tertiary`, `accent.base`
- `text.primary`, `text.secondary`, `text.tertiary`, `text.onColor`, `text.placeholder`, `text.error`
- `icon.primary`, `icon.secondary`, `icon.tertiary`, `icon.onColor`
- `layer['01']`, `layer['02']`, `layer['03']`
- `border.gentle`, `border.strong`, `border.interactive`
- `danger['01']`, `danger['02']`
- `support.success`, `support.attention`, `support.warning`, `support.info`

Пример:

```ts
const Surface = styled.div(({ theme }) => ({
  color: theme.tokens.current.text.primary,
  background: theme.tokens.current.layer['01'],
  border: `1px solid ${theme.tokens.current.border.gentle}`,
}));
```

## Typography

Каждый вариант typography является объектом со следующими полями:

```ts
type TypographyStyle = {
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};
```

Доступны варианты:

- `h1Bold`, `h2Semibold`, `h3Semibold`, `h4Semibold`, `extraBodyRegular`
- `body1Regular`, `body1Semibold`
- `body2ParagraphRegular`, `body2Regular`, `body2Semibold`
- `caption1ParagraphRegular`, `captionParagraphRegular`
- `caption1Regular`, `captionRegular`, `caption1Semibold`, `captionSemibold`
- `caption2Regular`, `caption2Semibold`
- `tabBarMedium`, `smallTextRegular`, `smallTextSemibold`

Typography применяется через spread:

```ts
const Title = styled.h1(({ theme }) => ({
  ...theme.typography.h1Bold,
}));
```

Для одного свойства нужно обращаться к полю объекта, например `theme.typography.body1Regular.fontFamily`.

### Text

Локальный `@pulse/ui/components/Text` принимает все варианты из `TypographyVariant`. В продуктовом коде вариант задаётся явно по смыслу:

- заголовки экранов — `h2Semibold`, заголовки карточек — `h4Semibold`;
- основной текст — `body1Regular`, смысловой акцент того же размера — `body1Semibold`;
- метаданные и короткие подписи — `body2Regular` / `body2Semibold`;
- многострочные описания — `body2ParagraphRegular`;
- хлебные крошки и компактные служебные подписи — варианты `caption*`.

Основной текст использует `text.primary`, вспомогательный — `text.secondary`, малозначимые значения и заглушки — `text.tertiary`, ошибки — `text.error`. Цвета статусных подписей могут использовать `support.*`. Если цвет зависит от состояния, токен передаётся через `color`:

```tsx
const theme = useTheme();

<Text
  variant="body2Regular"
  color={theme.tokens.current.text.secondary}
>
  Дополнительная информация
</Text>
```

Не использовать `weight` вместо существующего семантического варианта (`body1Semibold`, `body2Semibold` и т.д.) и не оставлять `variant` неявным в продуктовом коде.

## Остальные поля theme

- `borderWidths`
- `breakpoints: string[]`
- `layout.columns`, `layout.gutter`, `layout.margin`
- опциональный `layoutColumnWidth`
- `mediaQueries.min*`, `mediaQueries.max*`, `mediaQueries.only*` для ширин 320–1920
- `radii` — локально типизированы ключи `sm`, `md`, `lg`, `pill`
- `screenSize`
- `space: number[]` — deprecated в Pulse, не использовать как основу нового layout-кода
- `zIndices.modal`, `tooltip`, `actionSheet`, `popover`, `pushNotifications`

## styled-components v5

Для styled-деклараций используется default import и синтаксис intrinsic properties:

```ts
import styled from 'styled-components';

const Wrapper = styled.div(({ theme }) => ({
  borderRadius: theme.radii.lg,
}));
```

Не использовать в новом коде обвязки `import { styled }` и `styled('div')`.

Helpers импортируются именованно:

```ts
import styled, { css, keyframes } from 'styled-components';
```

## Расширение локальной обвязки

Если приложение использует новое поле theme:

1. Проверить его наличие в выгрузке Pulse theme или TokensTheme.
2. Добавить поле в тип `HostTheme`.
3. Добавить локальное mock-значение в `hostTheme`.
4. Использовать исходный token-path без адаптации внутри компонента.
5. Прогнать `npm run typecheck` и `npm run build`.

Запрещено добавлять параллельные `theme.colors`, `theme.spacing`, `theme.radius` или `theme.tokens.current.core`.
