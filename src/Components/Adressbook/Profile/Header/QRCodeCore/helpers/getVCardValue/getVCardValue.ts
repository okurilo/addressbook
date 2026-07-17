import type { GetVCardValueParams } from './types';

export const getVCardValue = (values: GetVCardValueParams): string => {
  const result = values.reduce(
    (previousValue, currentValue) =>
      `${previousValue ? `${previousValue}\n` : ''}${currentValue.key}:${currentValue.value}`,
    ''
  );

  return `BEGIN:VCARD\n${result}\nEND:VCARD`;
};
