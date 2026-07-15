import { useState, useEffect } from 'react';
import type { ProfileMainInfoV1Data, ProfileViewData } from './types';
import { profileHttp } from '../../../../http-requests/http';

type WidgetData = Record<string, unknown> & {
  contactsV2?: {
    workAddress?: string;
    mails?: { sigma?: { mail?: string }; alpha?: { mail?: string } };
  };
  contacts?: { workAddress?: string; mails?: { sigma?: string; alpha?: string } };
  socialNets?: { sberchat?: string };
  schedule?: { timezone?: string };
  agile?: ProfileMainInfoV1Data['agile'];
  linear?: ProfileMainInfoV1Data['linear'];
  birthDate?: ProfileMainInfoV1Data['birthDate'];
  managers?: Array<{
    isLinear?: boolean;
    lastName?: string;
    firstName?: string;
    secondName?: string;
    userId?: string;
  }>;
};

const API_PATH =
  'smart-profile/web/widgets/data?widgets=mainInfo_v1&widgets=about&widgets=manager';

type ProfileWidget = {
  code: string;
  data: WidgetData;
};

export const useProfile = (pid?: string): ProfileViewData => {
  const [data, setData] = useState<ProfileMainInfoV1Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const url = pid ? `${API_PATH}&userId=${pid}` : API_PATH;

    profileHttp
      .get<ProfileWidget[]>(url, { input: { signal: controller.signal } })
      .then((items) => {
        if (cancelled) return;

        const mainInfoItem = items?.find((i) => i?.code === 'mainInfo_v1');
        const aboutItem = items?.find((i) => i?.code === 'about');
        const managerItem = items?.find((i) => i?.code === 'manager');
        const mainInfo = mainInfoItem?.data || {};
        const aboutData = aboutItem?.data || {};

        const managers = managerItem?.data?.managers;
        const linearManager = managers?.find((m) => m?.isLinear);

        setData({
          workAddress:
            (mainInfo.contactsV2?.workAddress as string) ??
            (mainInfo.contacts?.workAddress as string) ??
            undefined,
          mailSigma:
            (mainInfo.contactsV2?.mails?.sigma?.mail as string) ??
            (mainInfo.contacts?.mails?.sigma as string) ??
            undefined,
          mailAlpha:
            (mainInfo.contactsV2?.mails?.alpha?.mail as string) ??
            (mainInfo.contacts?.mails?.alpha as string) ??
            undefined,
          sberchat: (() => {
            const raw = aboutData?.socialNets?.sberchat as string | undefined;
            if (!raw) return undefined;
            const parts = raw.split('@').filter(Boolean);
            return parts.length ? `@${parts[parts.length - 1]}` : undefined;
          })(),
          timezone: mainInfo?.schedule?.timezone,
          linearManager: {
            name: `${linearManager?.lastName || ''} ${linearManager?.firstName || ''} ${
              linearManager?.secondName || ''
            }`,
            url: `/platform/profile/${linearManager?.userId}/`,
          },
          agile: mainInfo?.agile,
          linear: mainInfo?.linear,
          birthDate: mainInfo?.birthDate,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [pid]);

  return {
    ...data,
    isLoading,
  };
};
