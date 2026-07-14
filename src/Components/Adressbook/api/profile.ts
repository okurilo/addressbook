import { http, profileHttp } from '../../../http-requests/http';

export type ProfileOrgPathItem = {
  title: string;
};

export type ProfileStructure = {
  orgPath?: ProfileOrgPathItem[];
  position?: string;
};

export type ProfileMainInfo = {
  workAddress?: string;
  mailSigma?: string;
  mailAlpha?: string;
  sberchat?: string;
  timezone?: string;
  linearManager?: {
    name: string;
    url: string;
  };
  agile?: ProfileStructure;
  linear?: ProfileStructure;
  birthDate?: {
    day?: number;
    month?: number;
  };
};

export type CustomGroup = {
  id: string;
  type: string;
  typeOrder: number;
  name: string;
  isCustom: boolean;
  structureLink?: string;
};

type ProfileContacts = {
  workAddress?: string;
  mails?: {
    sigma?: { mail?: string };
    alpha?: { mail?: string };
  };
};

type ProfileWidgetData = {
  contactsV2?: ProfileContacts;
  contacts?: {
    workAddress?: string;
    mails?: {
      sigma?: string;
      alpha?: string;
    };
  };
  schedule?: { timezone?: string };
  socialNets?: { sberchat?: string };
  managers?: Array<{
    isLinear?: boolean;
    lastName?: string;
    firstName?: string;
    secondName?: string;
    userId?: string;
  }>;
  agile?: ProfileStructure;
  linear?: ProfileStructure;
  birthDate?: { day?: number; month?: number };
};

type ProfileWidget = {
  code: string;
  data?: ProfileWidgetData;
};

type ProfileWidgetsResponse = {
  data?: ProfileWidget[];
};

type CustomGroupsResponse = CustomGroup[] | { data?: CustomGroup[] };

const PROFILE_WIDGETS_PATH =
  'smart-profile/web/widgets/data?widgets=mainInfo_v1&widgets=about&widgets=manager';

const normalizeSberchat = (value: string | undefined): string | undefined => {
  if (value === undefined || value === '') {
    return undefined;
  }

  const parts = value.split('@').filter(Boolean);
  const login = parts[parts.length - 1];
  return login === undefined ? undefined : `@${login}`;
};

export const fetchProfileMainInfo = async (
  pid: string | undefined,
  signal?: AbortSignal
): Promise<ProfileMainInfo> => {
  const userQuery = pid === undefined ? '' : `&userId=${encodeURIComponent(pid)}`;
  const response = await profileHttp.get<ProfileWidgetsResponse>(
    `${PROFILE_WIDGETS_PATH}${userQuery}`,
    { input: { signal } }
  );
  const mainInfo = response.data?.find((item) => item.code === 'mainInfo_v1')?.data;
  const about = response.data?.find((item) => item.code === 'about')?.data;
  const manager = response.data?.find((item) => item.code === 'manager')?.data;
  const linearManager = manager?.managers?.find((item) => item.isLinear === true);
  const managerName = [linearManager?.lastName, linearManager?.firstName, linearManager?.secondName]
    .filter((item): item is string => item !== undefined && item !== '')
    .join(' ');

  return {
    workAddress: mainInfo?.contactsV2?.workAddress ?? mainInfo?.contacts?.workAddress,
    mailSigma: mainInfo?.contactsV2?.mails?.sigma?.mail ?? mainInfo?.contacts?.mails?.sigma,
    mailAlpha: mainInfo?.contactsV2?.mails?.alpha?.mail ?? mainInfo?.contacts?.mails?.alpha,
    sberchat: normalizeSberchat(about?.socialNets?.sberchat),
    timezone: mainInfo?.schedule?.timezone,
    linearManager:
      linearManager?.userId === undefined
        ? undefined
        : {
            name: managerName,
            url: `/platform/profile/${linearManager.userId}/`,
          },
    agile: mainInfo?.agile,
    linear: mainInfo?.linear,
    birthDate: mainInfo?.birthDate,
  };
};

export const fetchCustomGroups = async (signal?: AbortSignal): Promise<CustomGroup[]> => {
  const response = await http.get<CustomGroupsResponse>('srv/v7/people/teams', {
    input: { signal, headers: { Accept: 'application/json' } },
  });

  return Array.isArray(response) ? response : response.data ?? [];
};
