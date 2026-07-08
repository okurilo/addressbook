import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AppLocation = {
  pathname: string;
  search: string;
  hash: string;
};

type NavigateOptions = {
  replace?: boolean;
};

type AppRouterContextValue = {
  location: AppLocation;
  navigate: (to: string | number, options?: NavigateOptions) => Promise<void>;
};

const LOCATION_EVENT = 'app-location-change';

const AppRouterContext = createContext<AppRouterContextValue | null>(null);

const readLocation = (): AppLocation => ({
  pathname: window.location.pathname,
  search: window.location.search,
  hash: window.location.hash,
});

const emitLocationChange = (): void => {
  window.dispatchEvent(new Event(LOCATION_EVENT));
};

export const AppRouterProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [location, setLocation] = useState<AppLocation>(readLocation);

  useEffect(() => {
    const handleLocationChange = (): void => {
      setLocation(readLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener(LOCATION_EVENT, handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener(LOCATION_EVENT, handleLocationChange);
    };
  }, []);

  const value = useMemo<AppRouterContextValue>(
    () => ({
      location,
      navigate: async (to: string | number, options?: NavigateOptions): Promise<void> => {
        if (typeof to === 'number') {
          window.history.go(to);
          return;
        }

        if (options?.replace === true) {
          window.history.replaceState(window.history.state, '', to);
        } else {
          window.history.pushState(window.history.state, '', to);
        }

        emitLocationChange();
      },
    }),
    [location],
  );

  return <AppRouterContext.Provider value={value}>{children}</AppRouterContext.Provider>;
};

export const useAppLocation = (): AppLocation => {
  const context = useContext(AppRouterContext);

  if (context === null) {
    throw new Error('useAppLocation must be used within AppRouterProvider');
  }

  return context.location;
};

export const useAppNavigate = (): AppRouterContextValue['navigate'] => {
  const context = useContext(AppRouterContext);

  if (context === null) {
    throw new Error('useAppNavigate must be used within AppRouterProvider');
  }

  return context.navigate;
};
