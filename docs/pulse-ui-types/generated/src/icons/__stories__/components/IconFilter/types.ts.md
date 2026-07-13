<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/icons/__stories__/components/IconFilter/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../raw/types-context.part-2.md>)
- Раздел: `icons`
- Компонент/группа: `icons`
- Строк кода: 7
- Экспорты: `IconsFilterProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface IconsFilterProps<T extends string> {
  disabled?: boolean;
  text: string;
  selectValue: T;
  onChange: (value: T) => void;
  values: readonly T[];
}

```
