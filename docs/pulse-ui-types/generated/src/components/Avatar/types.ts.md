<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Avatar/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Avatar`
- Строк кода: 74
- Экспорты: `AvatarProps`, `AvatarSizesConst`, `MapToCounterSize`, `Shape`, `Size`, `VerificationStatus`
- Импорты: `../Grade/RoundGrade`, `react`
- Зависимости внутри выгрузки: [`src/components/Grade/RoundGrade/types.ts`](<../Grade/RoundGrade/types.ts.md>)

## Исходная типизация

```typescript
import { ReactNode } from "react";

import { GradeProps } from "../Grade/RoundGrade";

type AvatarType =
  | "default"
  | "initials"
  | "empty"
  | "noCandidate"
  | "grade-long"
  | "grade-short";

export type Shape = "circle" | "square";

export interface AvatarProps {
  /**
   * Тип компонента.
   */
  $type?: AvatarType;
  /**
   * Иконка, используемая в аватаре.
   * Может быть ссылкой или компонентом.
   */
  $icon?: ReactNode | string;
  /**
   * Размер компонента.
   * @default l
   */
  $size?: Size;
  /**
   * Форма компонента.
   */
  $shape?: Shape;
  /**
   * Текст.
   * @example АВ
   */
  $text?: ReactNode;
  /**
   * Лейбл.
   * - Передается количество подчиненных или должность
   * - Не используется с размерами меньше `m`
   */
  $label?: ReactNode;
  /**
   * Имеет бейдж.
   */
  $hasBadge?: boolean;
  /**
   * Статус.
   *
   * Можно передать любую иконку.
   *
   * Размеры: `l`, `m`
   */
  $status?: ReactNode;
  /**
   * Статус верификации.
   *
   * Размеры: `xxl`, `l`, `m`
   */
  $verificationStatus?: VerificationStatus;
  /**
   * Тип фоллбэка.
   *
   * Используется, если нужен фоллбэк.
   */
  $fallbackType?: Omit<AvatarType, "default">;
}

export type VerificationStatus = "accept" | "decline" | "no_result";
export type Size = "xs" | "s" | "m" | "l" | "xl" | "xxl";
export type MapToCounterSize = Partial<Record<Size, GradeProps["$size"]>>;
export type AvatarSizesConst = Record<Size, number>;

```
