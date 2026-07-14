import type { ProfileMainInfo } from '../../api/profile';

export type ProfileMainInfoV1Data = ProfileMainInfo;

export type ProfileViewData = ProfileMainInfo & {
  isLoading: boolean;
};
