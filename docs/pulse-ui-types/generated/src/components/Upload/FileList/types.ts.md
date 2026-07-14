<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Upload/FileList/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Upload`
- Строк кода: 15
- Экспорты: `FileListProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Upload/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { Errors, FileWithId, Progress, UploadProps } from "../types";

export interface FileListProps {
  files: FileWithId[];
  errors?: Errors;
  progress?: Progress;
  handleFileRemove: (id: string) => void;
  handleClickOnInput: () => void;
  withCounter?: boolean;
  counterText?: string;
  withRepeatButton?: boolean;
  repeatButtonText?: string;
  onClickFile?: (file: FileWithId) => void;
  moreButtonText?: UploadProps["moreButtonText"];
}

```
