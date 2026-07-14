import type { AdressbookAbsence } from '../types';

export type PersonProfile = {
  name: string;
  photo: string;
  employeeNumber: string;
  position: string;
  initials: string;
  internalPhone?: string;
  personalPhone?: string;
  internalMail?: string;
  externalEmail?: string;
  absence?: AdressbookAbsence;
};

export type PersonRow = {
  nameCell: {
    name: string;
    photo: string;
    absence?: AdressbookAbsence;
    initials: string;
  };
  position: string;
  block: string;
  unit: string;
  pid: string;
  phone: string | null;
  email: string;
  isFavorite: boolean;
  _profile: PersonProfile;
};
