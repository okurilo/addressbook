type BreadcrumbItem = {
  title: string;
  href: string;
};

type BreadcrumbsApi = {
  addItems: (item: BreadcrumbItem) => void;
  clearItems: () => void;
};

const ignoreItem = (_item: BreadcrumbItem): void => undefined;
const clearItems = (): void => undefined;

export const useBreadcrumbs = (): BreadcrumbsApi => ({
  addItems: ignoreItem,
  clearItems,
});
