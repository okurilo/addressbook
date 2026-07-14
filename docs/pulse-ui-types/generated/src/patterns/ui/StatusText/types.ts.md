<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/patterns/ui/StatusText/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `patterns`
- Компонент/группа: `patterns`
- Строк кода: 10
- Экспорты: `StatusTextBaseProps`, `StatusTextProps`, `TextType`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type TextType = "right" | "wrong";

export interface StatusTextProps {
  text?: string;
  type?: TextType;
}

export interface StatusTextBaseProps {
  type?: TextType;
}

```
