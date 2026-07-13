<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Quantity/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 30
- Экспорты: `QuantityProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/templates/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { TemplateProps } from "../types";

export interface QuantityProps extends TemplateProps {
  /**
   * Подпись кнопки
   */
  button: string;
  /**
   * Максимальное значение
   */
  max?: number;
  /**
   * Минимальное значение
   */
  min?: number;
  /**
   * Заголовок
   */
  title: string;
  /**
   *  Единица измерения
   *
   * @default "экз"
   */
  unit?: string;
  /**
   * Начальное значение
   */
  value?: number;
}

```
