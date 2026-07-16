export type AdressbookAbsence = {
  badge?: string;
  period?: string;
  icon_dark?: string;
  icon_light?: string;
};

export type AdressbookPerson = {
  personUuid: string;
  pbasic?: {
    fullName?: string;
    firstName?: string;
    lastName?: string;
  };
  pbasicphoto?: { url?: string };
  jbasic?: { employeeId?: string };
  jposition?: {
    position?: Array<{ fullName?: string; funcBlock?: string }>;
  };
  junit?: {
    unit?: Array<{ balanceUnitName?: string }>;
  };
  jcontactsinterofficetel?: { value?: string };
  jcontactsmobile?: { value?: string };
  jcontactsinterofficeemail?: { value?: string };
  jcontactsexternalemail?: { value?: string };
  absence?: AdressbookAbsence;
};

export type PersonProfile = {
  name: string;
  photo: string;
  employeeNumber?: string;
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
  isFavorite?: boolean;
  _profile: PersonProfile;
};

