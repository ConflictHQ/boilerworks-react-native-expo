import type { DataResponse } from '@/api/models/DataResponse';
import type { AppUserAttributes } from './AppUserAttributes';

export interface AppUserData {
  type: 'app-users';
  id: string;
  attributes: AppUserAttributes;
}

/** JSON:API single-resource response for POST /api/v1/app-users. */
export type AppUserResponse = DataResponse<AppUserData>;
