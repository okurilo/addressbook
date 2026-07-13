<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/illustrations/__stories__/components/Cards/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../raw/types-context.part-2.md>)
- Раздел: `illustrations`
- Компонент/группа: `illustrations`
- Строк кода: 10
- Экспорты: `CardsProps`
- Импорты: `../Card`, `@pulse/illustrations/components/Illustration/illustrations/illustrations`
- Зависимости внутри выгрузки: [`src/illustrations/__stories__/components/Card/types.ts`](<../Card/types.ts.md>)

## Исходная типизация

```typescript
import { IllustrationNames } from "@pulse/illustrations/components/Illustration/illustrations/illustrations";
import type { Sizes } from "../Card";

export interface CardsProps {
  padding?: number;
  isGroupCards?: true;
  values: IllustrationNames[];
  search: string;
  sizes: Sizes;
}

```
