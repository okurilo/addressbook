<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Input/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Input`
- Строк кода: 28
- Экспорты: `InputProps`, `Suggestion`, `SuggestionOptionProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { InputHTMLAttributes } from "react";

export interface Suggestion {
  key: string;
  value: string;
  [key: string]: unknown;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Список подсказок для автозаполнения.
   *
   * */
  suggestions?: string[] | Suggestion[];
  /**
   *  Обработчик выбора предложенного значения.
   * */
  onSuggestionSelect?: (value: string | Suggestion) => void;
  /**
   * Уровень место использования компонента, для гарантии видимости окна подсказок.
   * @defaultValue "body"
   */
  placeWhereUsed?: "body" | "modal";
}

export interface SuggestionOptionProps {
  active: boolean;
}

```
