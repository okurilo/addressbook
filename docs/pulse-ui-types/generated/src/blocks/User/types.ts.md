<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/User/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `User`
- Строк кода: 49
- Экспорты: `BaseProps`, `ClickableUserProps`, `NonClickableUserProps`, `UserProps`
- Импорты: `../Avatar/badges`, `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { MouseEventHandler } from "react";
import badges from "../Avatar/badges";

export interface BaseProps {
  /**
   * Url to avatar
   */
  avatar?: string;
  /**
   * Caption
   */
  caption?: string;
  /**
   * Aavatar status (icon)
   */
  status?: keyof typeof badges;
  /**
   * Name
   */
  name: string | undefined;
  /**
   * Position
   */
  position: string | undefined;
  /**
   * Phone
   */
  phone?: string;
  /**
   * Email
   */
  email?: string;
  /**
   * Variant
   */
  variant?: "primary" | "secondary";
}

export interface ClickableUserProps extends BaseProps {
  url?: string;
  onClick?: never;
}

export interface NonClickableUserProps extends BaseProps {
  url?: never;
  onClick?: MouseEventHandler;
}

export type UserProps = ClickableUserProps | NonClickableUserProps;

```
