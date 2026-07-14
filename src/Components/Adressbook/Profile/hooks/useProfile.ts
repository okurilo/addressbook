import { useEffect, useState } from 'react';
import { fetchProfileMainInfo } from '../../../../http-requests/profile';
import type { ProfileMainInfoV1Data } from './types';

export const useProfile = (pid?: string) => {
  const [data, setData] = useState<ProfileMainInfoV1Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    setIsLoading(true);
    void fetchProfileMainInfo(pid, controller.signal)
      .then((response) => {
        if (isActive) {
          setData(response);
        }
      })
      .catch(() => {
        if (isActive && !controller.signal.aborted) {
          setData(null);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [pid]);

  return {
    ...data,
    isLoading,
  };
};
