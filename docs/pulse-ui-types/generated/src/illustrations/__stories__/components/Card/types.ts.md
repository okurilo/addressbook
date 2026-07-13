<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/illustrations/__stories__/components/Card/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../raw/types-context.part-2.md>)
- Раздел: `illustrations`
- Компонент/группа: `illustrations`
- Строк кода: 19
- Экспорты: `CardProps`, `Size`, `Sizes`
- Импорты: `../../../illustrations`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { IllustrationNames } from "../../../illustrations";

export type Size =
  | "650x650"
  | "320x320"
  | "250x250"
  | "160x160"
  | "120x120"
  | "100x100"
  | "72x72"
  | "48x48";

export type Sizes = Array<Size>;

export interface CardProps {
  padding?: number;
  name: IllustrationNames;
  sizes: Sizes;
}

```
