<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Documents/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 65
- Экспорты: `DocumentProps`, `IDocumentsProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/templates/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { TemplateProps } from "../types";

export interface DocumentProps {
  /**
   * Размер файла в байтах
   * @example 22741123 => '23 МБ'
   */
  size: number;
  /**
   * Заголовок для документа
   * @example "заявление на перевод"
   */
  documentName: string;
  /**
   * Имя файла
   * @example "perevod_21_05_2025.pdf"
   */
  fileName: string;
  /**
   * Путь к файлу в content storage в формате `/[ИМЯ_ПАРТИЦИИ]/[ПУТЬ]` ИЛИ абсолютный путь к файлу (http://...)
   * @example "https://hr-ift.sberbank.ru/api-web/cs/api/1/common/coreui/neuro/test/IOS_qr_instruction.pdf"
   * @example "common/coreui/neuro/test/IOS_qr_instruction.pdf"
   */
  url: string;
  /**
   * Тип файла в MIME-type формате
   * @example "application/pdf"
   * @example "image/gif"
   */
  fileType: string;
  /**
   * Если true, то файл будет доступен для скачивания.
   */
  download?: boolean;
  /**
   * Если true, то файл будет доступен для подписания (если тип файла).
   @deprecated
   */
  subscribe?: boolean;
  /**
   * Если true, то файл будет доступен для подписания
   */
  sign?: boolean;
  /**
   * Текст кнопки
   * @default 'перейти к подписанию'
   */
  signText?: string;
}

export interface IDocumentsProps extends TemplateProps {
  /**
   * Заголовок виджета.
   */
  title: string;
  /**
   * Список документов для отображения в виджете.
   * Максимально - 5 документов.
   */
  documents: DocumentProps[];
  /**
   * Если true, то будет доступна возможность скачать все файлы.
   */
  downloadAll?: boolean;
}

```
