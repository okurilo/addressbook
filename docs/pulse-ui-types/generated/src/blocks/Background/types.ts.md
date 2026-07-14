<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Background/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Background`
- Строк кода: 12
- Экспорты: `BackgroundProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { CSSProperties } from "react";

export interface BackgroundProps {
  /**
   * Position
   */
  position?: CSSProperties["backgroundPosition"];
  /**
   * Url
   */
  url: string;
}

```
