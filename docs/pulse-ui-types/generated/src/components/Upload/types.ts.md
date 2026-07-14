<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Upload/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Upload`
- Строк кода: 171
- Экспорты: `Errors`, `FileButton`, `FileProps`, `FileState`, `FileWithId`, `Progress`, `Size`, `State`, `UploadProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ComponentProps, ReactElement } from "react";

export type Size = "small" | "large";

export type State = "default" | "hover" | "loading" | "loaded";

type ErrorText = string;

export type Errors = Record<string, ErrorText>;

type ProgressPercent = number | undefined;

export type Progress = {
  [id: string]: ProgressPercent;
};

export interface FileProps {
  $file: FileWithId;
  $error?: string;
  $progress?: number;
  $withRepeatButton?: boolean;
  $repeatButtonText?: string;
  $withRemoveButton?: boolean;
  $isLoading?: boolean;
  $handleRetry: (id: string) => void;
  $handleFileRemove: (id: string) => void;
  $onClick?: (file: FileWithId) => void;
  $isShowWeight?: boolean;
  $isAbleToOpenWhenError?: boolean;
}

export type FileButton = {
  element: ReactElement;
  onClick: (id: string) => void;
};

export type FileState = "ready" | "loading";

export type FileWithId = {
  id: string;
  file: File;
  buttons?: FileButton[];
  state?: FileState;
  props?: Partial<FileProps>;
};

export interface UploadProps {
  /**
   * Размер компонента.
   */
  size?: Size;
  /**
   * Основной заголовок компонента.
   */
  title?: string;
  /**
   * Заголовок компонента.
   */
  label?: string;
  /**
   * Описание компонента.
   */
  description?: string;
  /**
   * Ошибка.
   */
  error?: string;
  /**
   * Типы файлов, с которыми работает компонент.
   * @example ".jpg,.jpeg,.png"
   */
  fileTypes?: string;
  /**
   * Список файлов, которые должны быть загружены в компонент.
   */
  filesWithId: FileWithId[];
  /**
   * Дополнительные пропсы для инпута компонента.
   */
  inputProps?: Omit<ComponentProps<"input">, "onChange"> & {
    "data-testid"?: string;
  };
  /**
   * Первая часть заголовка.
   */
  firstHalfTitle: string;
  /**
   * Вторая часть заголовка.
   */
  secondHalfTitle: string;
  /**
   * Подзаголовок.
   */
  subtitle?: string;
  /**
   * Список компонентов с ошибками.
   *
   * Ключ - id файла.
   *
   * Свойство - текст ошибки.
   * @example {
   *  "czxc7": "Произошла ошибка!"
   * }
   */
  errors?: Errors;
  /**
   * Список компонентов со шкалой загрузки.
   *
   * Ключ - id файла.
   *
   * Свойство - процент загрузки.
   * @example {
   *  "czxc7": 75
   * }
   */
  progress?: Progress;
  /**
   * Максимальное количество файлов в компоненте.
   *
   * При превышении лимита компонент становится неактивным.
   *
   * Минимальное рабочее значение - 1.
   */
  maxFilesCount?: number;
  /**
   * Наличие счетчика файлов.
   */
  withCounter?: boolean;
  /**
   * Текст в счетчике файлов.
   */
  counterText?: string;
  /**
   * Наличие кнопки повтора загрузки файла.
   */
  withRepeatButton?: boolean;
  /**
   * Текст для кнопки повтора загрузки файла.
   */
  repeatButtonText?: string;
  /*
   * Обработчик клика по файлу.
   */
  onClickFile?: (file: FileWithId) => void;
  /**
   * Обработчик удаления файла.
   *
   * @returns Возвращаемое булевое значение из промиса означает успешное/неуспешное удаление файла.
   */
  onRemoveFile: (
    fileList: FileWithId[],
    removeFile?: FileWithId
  ) => Promise<boolean> | boolean;
  /**
   * Обработчик добавления файла.
   *
   * @returns Возвращаемое булевое значение означает успешное/неуспешное добавление файла.
   */
  onAddFile: (fileList: FileWithId[], addFiles: FileWithId[]) => void;
  /*
   * Текст кнопки показа/скрытия файлов в списке файлов.
   */
  moreButtonText?: {
    show?: string;
    hide?: string;
  };
  /*
   * Флаг дизейбла компонента.
   */
  isDisabled?: boolean;
}

```
