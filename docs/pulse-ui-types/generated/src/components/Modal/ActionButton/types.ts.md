<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Modal/ActionButton/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Modal`
- Строк кода: 14
- Экспорты: `ActionButtonIconVariants`, `ActionButtonProps`
- Импорты: `@styled-system/css`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { SystemStyleObject } from "@styled-system/css";

export interface ActionButtonProps {
  /**
   * Флаг, содержит только икноку.
   * @default false
   */
  $containsOnlyIcon?: boolean;
}

export type ActionButtonIconVariants = Record<
  "true" | "false",
  SystemStyleObject
>;

```
