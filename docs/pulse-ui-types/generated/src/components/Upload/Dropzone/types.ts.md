<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Upload/Dropzone/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Upload`
- Строк кода: 11
- Экспорты: `DropzoneProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Upload/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { Size } from "../types";

export interface DropzoneProps {
  $size: Size;
  isDisabled: boolean;
  isMobile: boolean;
  firstHalfTitle: string;
  secondHalfTitle: string;
  subtitle: string | undefined;
  handleClickOnInput: () => void;
}

```
