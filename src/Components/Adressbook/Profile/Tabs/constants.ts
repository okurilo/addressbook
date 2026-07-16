export const TABS = [
  { key: 'contacts', label: 'контакты' },
  { key: 'info', label: 'инфо' },
  { key: 'sbergile', label: 'сберджайл' },
] as const;

export type ProfileTabKey = typeof TABS[number]['key'];

