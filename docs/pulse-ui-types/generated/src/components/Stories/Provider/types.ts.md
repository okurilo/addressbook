<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Stories/Provider/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Stories`
- Строк кода: 3
- Экспорты: `ProviderProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Stories/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { StoriesProps } from "../types";

export type ProviderProps = Omit<StoriesProps, "onClose">;

```
