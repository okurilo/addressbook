<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Error/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Error`
- Строк кода: 65
- Экспорты: `BaseProps`, `ErrorProps`, `ErrorType`, `Orientation`, `Size`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
/**
 * Тип компонента.
 */
export type ErrorType = "error" | "reload";
/**
 * Размер компонента, влияющий на стили и доступные параметры.
 */
export type Size = "small" | "default";
/**
 * Расположение содержимого компонента: горизонтально или вертикально.
 */
export type Orientation = "horizontal" | "vertical";

export interface BaseProps {
  /**
   * Тип компонента.
   */
  type: ErrorType;
  /**
   * Краткое описание, раскрывающее суть и дополняющее заголовок.
   */
  description: string | React.ReactNode;
  /**
   * Заголовок компонента, который привлекает внимание пользователя и задаёт тему.
   */
  title?: string;
  /**
   * Расположение содержимого компонента: горизонтально или вертикально.
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Опциональный элемент для кнопки, отображается при наличии.
   */
  buttonLabel?: string;
  /**
   * Действие при нажатии.
   */
  onClick?: () => void;
  /**
   * Опциональный элемент для второй кнопки, отображается при наличии.
   */
  buttonSecondaryLabel?: string;
  /**
   * Действие при нажатии.
   */
  onSecondaryBtnClick?: () => void;
}

interface PropsReload extends BaseProps {
  type: "reload";
  description: string | React.ReactNode;
  buttonLabel?: never;
  onClick?: never;
  size?: Extract<Size, "default">;
}

interface PropsError extends BaseProps {
  type: "error";
  description: string;
  buttonLabel?: string;
  onClick?: () => void;
  size?: Size;
}

export type ErrorProps = PropsReload | PropsError;

```
