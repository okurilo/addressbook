<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Dropdown/Items/SelectionSheetItem/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Dropdown`
- Строк кода: 20
- Экспорты: `SelectionSheetItemProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
interface BaseProps {
  title: string;
  onSelect: () => void;
  disabled?: boolean;
  isSelected?: boolean;
}

interface SelectProps extends BaseProps {
  withCheckbox?: never;
  isError?: never;
  errorText?: never;
}

interface MultiSelectProps extends BaseProps {
  withCheckbox: true;
  isError?: boolean;
  errorText?: string;
}

export type SelectionSheetItemProps = SelectProps | MultiSelectProps;

```
