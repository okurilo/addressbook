<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Delta/ArrowIcon/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Delta`
- Строк кода: 5
- Экспорты: `ArrowIconProps`
- Импорты: `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { DefaultTheme } from "styled-components";

export interface ArrowIconProps {
  color: keyof DefaultTheme["tokens"]["current"]["colors"];
}

```
