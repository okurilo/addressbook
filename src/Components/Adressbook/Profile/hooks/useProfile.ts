import { useState, useEffect } from 'react';
import { ProfileMainInfoV1Data } from './types';

const API_PATH =
  '/api-mobile/smart-profile/web/widgets/data?widgets=mainInfo_v1&widgets=about&widgets=manager';

export const useProfile = (pid?: string) => {
  const [data, setData] = useState<ProfileMainInfoV1Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const url = pid ? `${API_PATH}&userId=${pid}` : API_PATH;

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (cancelled) return;

        const items = response?.data as
          | Array<{ code: string; data: Record<string, unknown> }>
          | undefined;
        const mainInfoItem = items?.find((i) => i?.code === 'mainInfo_v1');
        const aboutItem = items?.find((i) => i?.code === 'about');
        const managerItem = items?.find((i) => i?.code === 'manager');
        const mainInfo = mainInfoItem?.data || {};
        const aboutData = aboutItem?.data || {};

        const managers = managerItem?.data?.managers as Array<Record<string, unknown>> | undefined;
        const linearManager = (managers as Array<{ isLinear: boolean }> | undefined)?.find(
          (m) => m?.isLinear
        );

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
            return parts.length ? `@${parts.at(-1)}` : undefined;
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
    };
  }, [pid]);

  return {
    ...data,
    isLoading,
  };
};

