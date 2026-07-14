<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Gigabox/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Gigabox`
- Строк кода: 24
- Экспорты: `GigaBoxProps`, `GigaBoxState`, `GroupedContent`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface GigaBoxProps {
  children: React.ReactNode;
  state?: GigaBoxState;
  onStateChange?: (state: GigaBoxState) => void;
  prompt?: string;
}

export interface GroupedContent {
  [groupName: string]: {
    header: string;
    items: string[];
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  ungrouped?: string[];
}

export type GigaBoxState =
  | "idle"
  | "analysing"
  | "success"
  | "error"
  | undefined;

```
