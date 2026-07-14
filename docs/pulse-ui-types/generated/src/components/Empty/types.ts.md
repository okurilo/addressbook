<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Empty/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Empty`
- Строк кода: 72
- Экспорты: `EmptyProps`, `EmptyType`, `Orientation`, `Size`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
/**
 * Тип компонента.
 */
export type EmptyType = "start" | "noResults" | "wait" | "create" | "noData";
/**
 * Тип noData.
 */
type NoData = Extract<EmptyType, "noData">;
/**
 * Простые типы.
 */
type SimpleTypes = Extract<EmptyType, "start" | "noResults">;
/**
 * Размер компонента, влияющий на стили и доступные параметры.
 */
export type Size = "default" | "small";
/**
 * Расположение содержимого компонента: горизонтально или вертикально.
 */
export type Orientation = "horizontal" | "vertical";

interface BaseProps {
  /**
   * Тип компонента.
   */
  type: EmptyType;
  /**
   * Краткое описание, раскрывающее суть и дополняющее заголовок.
   */
  description: string;
  /**
   * Заголовок компонента, который привлекает внимание пользователя и задаёт тему.
   */
  title?: string;
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

interface PropsStartNoResults extends BaseProps {
  type: SimpleTypes;
  size?: Extract<Size, "default">;
}

interface PropsNoData extends BaseProps {
  type: NoData;
  size?: Extract<Size, "default">;
  buttonLabel?: never;
  onClick?: never;
  buttonSecondaryLabel?: never;
  onSecondaryBtnClick?: never;
}

interface PropsRestTypes extends BaseProps {
  type: Exclude<EmptyType, SimpleTypes>;
  size?: Size;
}

export type EmptyProps = PropsStartNoResults | PropsRestTypes | PropsNoData;

```
