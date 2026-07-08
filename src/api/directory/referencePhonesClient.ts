import { DirectoryApiError } from './client';
import type {
  ReferencePhone,
  ReferencePhoneCategory,
  ReferencePhoneResponse,
} from './referencePhones';

const fetchJson = async <T,>(input: string): Promise<T> => {
  const response = await fetch(input);

  if (!response.ok) {
    throw new DirectoryApiError(response.status, `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

export const fetchReferencePhoneCategories = async (): Promise<ReferencePhoneCategory[]> => {
  const response = await fetchJson<{ items: ReferencePhoneCategory[] }>(
    '/api/directory/reference-phone-categories',
  );

  return response.items;
};

export const fetchReferencePhones = async (categoryId: string): Promise<ReferencePhone[]> => {
  const response = await fetchJson<ReferencePhoneResponse>(
    `/api/directory/reference-phones?categoryId=${encodeURIComponent(categoryId)}`,
  );

  return response.items;
};
