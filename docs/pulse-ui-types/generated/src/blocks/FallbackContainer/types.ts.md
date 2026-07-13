<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/FallbackContainer/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `FallbackContainer`
- Строк кода: 6
- Экспорты: `FallbackContainerProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { PropsWithChildren } from "react";

export interface FallbackContainerProps extends PropsWithChildren {
  isDataPresent: boolean | undefined;
  fallBackText?: string;
}

```
