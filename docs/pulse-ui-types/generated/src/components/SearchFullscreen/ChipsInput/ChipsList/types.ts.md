<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/SearchFullscreen/ChipsInput/ChipsList/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `SearchFullscreen`
- Строк кода: 20
- Экспорты: `ChipsListProps`
- Импорты: `../../types`
- Зависимости внутри выгрузки: [`src/components/SearchFullscreen/types.ts`](<../../types.ts.md>)

## Исходная типизация

```typescript
import { ChipData } from "../../types";

export type ChipsListProps = {
  /**
   * Массив чипсов
   */
  chips: ChipData[];
  /**
   * Коллбэк удаления чипса
   */
  $onRemove?: (value: string) => void;
  /**
   * Максимальная ширина списка чипсов
   */
  maxWidth: number;
  /**
   * Показывать скелетоны загрузки вместо чипсов
   */
  showSkeletons?: boolean;
};

```
