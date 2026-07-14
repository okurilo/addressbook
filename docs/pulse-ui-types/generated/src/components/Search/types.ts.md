<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Search/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Search`
- Строк кода: 16
- Экспорты: `SearchProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ChangeEventHandler, InputHTMLAttributes } from "react";

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  value: string;
  /**
   * Колбэк для обновления value.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * Текст плейсхолдера.
   * @default "поиск"
   */
  placeholder?: string;
}

```
