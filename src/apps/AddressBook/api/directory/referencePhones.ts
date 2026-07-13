export type ReferencePhoneCategory = {
  id: string;
  title: string;
};

export type ReferencePhone = {
  id: string;
  categoryId: string;
  title: string;
  initials: string;
  responsibility: string;
  phone: string | null;
  accentColor: string;
};

export type ReferencePhoneResponse = {
  items: ReferencePhone[];
};

