<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Carousel/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Carousel`
- Строк кода: 207
- Экспорты: `ActiveSlideActionType`, `ActiveSlideStateType`, `AdaptiveOptions`, `CarouselContextType`, `CarouselPeekSide`, `CarouselProps`, `CarouselSlotProps`, `ContentProps`, `DotsDynamicConfig`, `RenderArrowsProps`, `RenderDotsProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { ReactElement, ReactNode } from "react";

interface CarouselApiArgs {
  setActiveSlide: (activeSlide: number) => void;
}

export type AdaptiveOptions = {
  tablet1?: number;
  tablet2?: number;
  tablet3?: number;
  tablet4?: number;
  mobile?: number;
};

export type CarouselPeekSide = "left" | "right" | "both";

export interface CarouselProps {
  /**
   * Наличие границ у содержимого слайдов.
   * @default false
   */
  $bordered?: boolean;
  /**
   * Режим зацикливания слайдов.
   * @default false
   */
  $loop?: boolean;
  /**
   * Флаг включения стрелок по бокам для управления.
   * @default true
   */
  $withArrows?: boolean;
  /**
   * Режим анимированного перелистывания слайдов
   * @default true
   */
  $withAnimation?: boolean;
  /**
   * Задержка в ms для автоматического переключения слайдов.
   * По умолчанию включает $loop.
   */
  $autoplay?: number;
  /**
   * Флаг скрытия точек для навигации.
   * @default false
   */
  $hideDots?: boolean;
  /**
   * Активный слайд по умолчанию.
   * @default 0
   */
  $defaultActiveSlide?: number;
  /**
   * Коллбэк изменения активного слайда.
   */
  $onChange?: (activeSlide: number) => void;
  /**
   * Элемент левой стрелки.
   */
  $leftArrow?: ReactElement;
  /**
   * Элемент правой стрелки.
   */
  $rightArrow?: ReactElement;
  /**
   * Элементы точек.
   */
  $dots?: ReactElement | ReactElement[];
  /**
   * Флаг влючения режима динамических точек.
   * @default true
   */
  $dynamicDots?: boolean;
  /**
   * Количество основных (больших) динамических точек.
   * @default 5
   */
  $dynamicDotsCount?: number;
  /**
   * Ширина контейнера точки (включая внешние отступы).
   * @default 16
   * @example 4px (marginLeft) + 8px (width) + 4px (marginRight)
   */
  $dynamicDotsWidth?: number;
  /**
   * Дочерние элементы.
   */
  children: ((args: CarouselApiArgs) => ReactNode) | ReactNode;
  /**
   * Количество слайдов, видимых одновременно.
   * @default 1
   */
  $visibleSlides?: number;
  /**
   *
   * Настройки адаптива.
   *
   * tablet 1 - от 1024 до 1279.
   *
   * tablet 2 - от 840 до 1023.
   *
   * tablet 3 - от 740 до 839.
   *
   * tablet 4 - от 600 до 719.
   *
   * mobile - до 600.
   *
   */
  $adaptiveOptions?: AdaptiveOptions;
  /**
   * Отступ между элементами на ленте карусели. Можно выключить, если есть необходимость убрать дефолтные отступы и задать кастомные.
   */
  $withMarginBetweenElements?: boolean;
  /**
   * Видимая часть обрезаемого слайда.
   * @default 0
   * @example 0.5
   */
  $nextSlidePeek?: number;
  /**
   * Сторона обрезки слайда.
   * @default "right"
   */
  $peekSide?: CarouselPeekSide;
}

export interface ActiveSlideStateType {
  animate: boolean;
  lastSlide: number;
  activeSlide: number;
  visualSlide?: number;
  renderSlide?: number;
  totalSlides: number;
  prev: number | null;
  next: number | null;
  direction: "prev" | "next" | null;
  $withAnimation: boolean;
  $loop?: boolean;
  disableTransition?: boolean;
  loopStartIndex?: number;
  loopEndIndex?: number;
  loopStep?: number;
  loopShift?: number;
  isLooping?: boolean;
}

export interface ActiveSlideActionType {
  type: "sliding" | "slideEnd" | "finishLoopJump" | "setLoop" | "updateState";
  payload?: {
    activeSlide?: number;
    $loop?: boolean;
    lastSlide?: number;
    loopStartIndex?: number;
    loopEndIndex?: number;
    loopStep?: number;
    loopShift?: number;
    totalSlides?: number;
  };

  /** Число слайдов на которое необходимо перелистнуть карусель */
  amount?: number;
}

export interface ContentProps {
  $activeSlide: number;
  $bordered?: boolean;
  $visibleSlides?: number;
  $leftPeek?: number;
  $rightPeek?: number;
  $trackOffset?: number;
  $disableTransition?: boolean;
}

export interface CarouselSlotProps {
  $visibleSlides: number;
  $leftPeek?: number;
  $rightPeek?: number;
  $disableTransition?: boolean;
  $margin: number | null;
}

export interface CarouselContextType {
  handleSlideTo: (index: number) => void;
  activeSlide: number;
  totalSlides: number;
}

export type RenderDotsProps = {
  $hideDots: CarouselProps["$hideDots"];
  $dotsProp: CarouselProps["$dots"];
  contentArray: Array<ReactNode>;
  dynamicConfig: DotsDynamicConfig;
};

export type RenderArrowsProps = {
  $withArrows: CarouselProps["$withArrows"];
  $leftArrowProp: CarouselProps["$leftArrow"];
  $rightArrowProp: CarouselProps["$rightArrow"];
  $leftHidden?: boolean;
  $rightHidden?: boolean;
};

export interface DotsDynamicConfig {
  startIndex: number;
  endIndex: number;
  offset: number;
}

```
