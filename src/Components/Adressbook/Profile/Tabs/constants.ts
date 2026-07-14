export const TABS = [
  { key: 'contacts', label: 'контакты' },
  { key: 'info', label: 'инфо' },
  { key: 'goal', label: 'сберджайл' },
  { key: 'comment', label: 'комментарий' },
] as const;

export type ProfileTabKey = (typeof TABS)[number]['key'];
