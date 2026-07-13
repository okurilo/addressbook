# Полная типизация Pulse UI: инструкция по чтению

Этот каталог хранит полную выгрузку **264 исходных файлов / 9 260 строк** и облегчённое представление для точечного чтения LLM.

## Что здесь находится

- [`raw/types-context.part-1.md`](raw/types-context.part-1.md) и [`raw/types-context.part-2.md`](raw/types-context.part-2.md) — неизменённые исходные выгрузки, источник истины и provenance.
- [`INDEX.md`](INDEX.md) — компоненты и группы с прямыми ссылками на их типы.
- [`EXPORTS.md`](EXPORTS.md) — обратный индекс: имя экспортируемого типа → исходный файл.
- [`manifest.json`](manifest.json) — машиночитаемый каталог путей, импортов, экспортов, числа строк и SHA-256.
- `generated/src/**` — один небольшой Markdown-файл на каждый исходный type-файл.
- [`../PULSE-UI.md`](../PULSE-UI.md) — краткая вручную проверенная памятка по компонентам, уже используемым AddressBook.

## Обязательный маршрут для LLM

При любом добавлении или изменении компонента/stub из `@pulse/ui`:

1. Прочитать краткие правила в [`../PULSE-UI.md`](../PULSE-UI.md).
2. Найти компонент в [`INDEX.md`](INDEX.md) или точный экспорт в [`EXPORTS.md`](EXPORTS.md).
3. Открыть только соответствующие файлы из `generated/src/**`.
4. Если тип импортирует соседний DS-тип, открыть только указанный dependency-файл по индексу или `manifest.json`.
5. Сверить import-path, обязательные props, union-значения, transient-префиксы `$` и взаимоисключающие ветви union.
6. Только если сгенерированная секция выглядит неполной, проверить тот же `FILE:` в `raw/`.

Не читать обе сырые части целиком по умолчанию и не восстанавливать контракт по памяти или названию компонента.

## Быстрые ссылки для текущего приложения

- [Avatar](generated/src/components/Avatar/types.ts.md)
- [Button](generated/src/components/Button/types.ts.md)
- [Empty](generated/src/components/Empty/types.ts.md)
- [Input](generated/src/components/Input/types.ts.md)
- [Layout.Column](generated/src/components/Layout/Column/types.ts.md)
- [Layout.Provider](generated/src/components/Layout/Provider/types.ts.md)
- [Loader](generated/src/components/Loader/types.ts.md)
- [Text](generated/src/components/Text/types.ts.md)

## Поиск без чтения больших файлов

Найти исходный файл компонента:

```bash
grep -n 'components/Empty' docs/pulse-ui-types/INDEX.md
```

Найти объявление конкретного экспорта:

```bash
grep -n '| `EmptyProps` |' docs/pulse-ui-types/EXPORTS.md
```

Найти все упоминания prop только в небольших сгенерированных файлах:

```bash
grep -R -n '\$containsOnlyIcon' docs/pulse-ui-types/generated/src/components/Button
```

## Обновление выгрузки

1. Заменить оба файла в `raw/`, не редактируя их содержимое вручную.
2. Выполнить:

```bash
npm run docs:pulse-types
```

3. Проверить, что генератор разобрал ожидаемое число файлов и не нашёл дубликатов.
4. При изменении используемых контрактов обновить `docs/PULSE-UI.md`, stubs и compile-time аудит.

`INDEX.md`, `EXPORTS.md`, `manifest.json` и `generated/**` создаются автоматически и вручную не редактируются.
