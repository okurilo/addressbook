export type ProfileOrgPathItem = { title: string };

export type ProfileMainInfoV1Data = {
  workAddress?: string;
  mailSigma?: string;
  mailAlpha?: string;
  sberchat?: string;
  timezone?: string;
  linearManager?: { name: string; url: string };
  agile?: { orgPath?: ProfileOrgPathItem[]; position?: string };
  linear?: { orgPath?: ProfileOrgPathItem[]; position?: string };
  birthDate?: { day?: number; month?: number };
};

export type ProfileViewData = ProfileMainInfoV1Data & { isLoading: boolean };

