import type { AppUserInclude } from '@/api/models/enums/AppUserInclude';

/** Query params for GET /api/v1/app-users/:id or GET /api/v1/app-users/user/:userId */
export type GetAppUserParams =
  | { id: string; userId?: never; include?: AppUserInclude | string }
  | { userId: string; id?: never; include?: AppUserInclude | string };
