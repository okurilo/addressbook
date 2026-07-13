<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Scrollbar/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Scrollbar`
- Строк кода: 9
- Экспорты: `ScrollbarProps`
- Импорты: `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { DefaultTheme } from "styled-components";

export interface ScrollbarProps {
  theme: DefaultTheme;
  /**
   * Текущая платформа.
   */
  platform?: "win";
}

```
