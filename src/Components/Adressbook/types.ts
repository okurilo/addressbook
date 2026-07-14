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
