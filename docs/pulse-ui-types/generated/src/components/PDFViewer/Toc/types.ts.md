<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/PDFViewer/Toc/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `PDFViewer`
- Строк кода: 10
- Экспорты: `OutlineItem`, `TocProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type OutlineItem = {
  title: string;
  pageNumber?: number;
  items: OutlineItem[];
};

export type TocProps = {
  outline: OutlineItem[];
  onItemClick: (pageNumber: number) => void;
};

```
