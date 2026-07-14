<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Filters/PopupSelection/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Filters`
- Строк кода: 23
- Экспорты: `ArrowSVGProps`, `ContainerProps`, `PopupSelectionProps`, `PopupSelectionStyledProps`, `TriggerProps`
- Импорты: `csstype`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { Property } from "csstype";

export interface PopupSelectionProps {
  fieldValue?: string;
  width?: Property.Width | number;
  onReset?: () => void;
}

export interface PopupSelectionStyledProps {
  $width?: Property.Width | number;
}

export interface ArrowSVGProps {
  $opened: boolean;
}

export interface TriggerProps {
  $focused: boolean;
}

export interface ContainerProps {
  $maxHeight?: Property.MaxHeight | number;
}

```
