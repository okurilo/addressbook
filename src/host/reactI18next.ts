type TranslationResult = {
  t: (key: string) => string;
};

export const useTranslation = (_namespace: string): TranslationResult => ({
  t: (key) => key,
});
