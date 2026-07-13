<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/illustrations/__stories__/utils/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `illustrations`
- Компонент/группа: `illustrations`
- Строк кода: 13
- Экспорты: `Illustrations`, `IllustrationsConfig`
- Импорты: `../components`, `@pulse/illustrations/components/Illustration/illustrations`, `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { FC, SVGProps } from "react";
import type { IllustrationNames } from "@pulse/illustrations/components/Illustration/illustrations";
import type { Sizes } from "../components";

export type Illustrations = Partial<
  Record<IllustrationNames, FC<SVGProps<SVGSVGElement>>>
>;

export interface IllustrationsConfig {
  title: string;
  data: Illustrations;
  sizes: Sizes;
}

```
