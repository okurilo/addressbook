<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/icons/__stories__/components/IconWithCopyButton/ButtonsGroup/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../../raw/types-context.part-2.md>)
- Раздел: `icons`
- Компонент/группа: `icons`
- Строк кода: 9
- Экспорты: `ButtonGroupProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface ButtonGroupProps {
  values: Array<{
    name: string;
    valueForCopy: string;
    successText: string;
    errorText: string;
  }>;
  name: string;
}

```
