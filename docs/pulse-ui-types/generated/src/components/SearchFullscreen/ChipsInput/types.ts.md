<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/SearchFullscreen/ChipsInput/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `SearchFullscreen`
- Строк кода: 25
- Экспорты: `ChipsInputProps`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/SearchFullscreen/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { InputHTMLAttributes } from "react";
import { ChipData } from "../types";

export interface ChipsInputProps {
  /**
   * Массив чипсов
   */
  $chips: ChipData[];
  /**
   * Пропсы для инпута
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /**
   * Коллбэк удаления чипса
   */
  $onRemove?: (value: string) => void;
  /**
   * Максимальная ширина списка чипсов
   */
  chipsListMaxWidth: number | undefined;
  /**
   * Показывать скелетоны загрузки вместо чипсов
   */
  showSkeletons?: boolean;
}

```
