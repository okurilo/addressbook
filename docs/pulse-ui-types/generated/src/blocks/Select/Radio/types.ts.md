<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Select/Radio/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Select`
- Строк кода: 31
- Экспорты: `RadioProps`
- Импорты: `../../../types`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { CustomChangeEvent } from "../../../types";

interface OptionProps {
  /**
   * Если `true`, то элемент будет отключен
   */
  disabled?: boolean;
  /**
   * ID
   */
  id: string;
  /**
   * Подпись
   */
  label: string;
}

export interface RadioProps {
  /**
   * Значение по умолчанию
   */
  defaultValue?: string;
  /**
   * Массив элементов
   */
  items: OptionProps[];
  /**
   * Обработчик события onChange
   */
  onChange?: (event: CustomChangeEvent<OptionProps>) => void;
}

```
