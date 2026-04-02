import type { DataResponse } from '@/api/models/DataResponse';
import type { UserAttributes } from './UserAttributes';

export interface UserData {
  type: 'users';
  id: string;
  attributes: UserAttributes;
}

/** JSON:API single-resource response for GET /api/v1/users/{id}. */
export type UserResponse = DataResponse<UserData>;
