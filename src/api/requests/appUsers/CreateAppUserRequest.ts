import type { BirthControlMethod } from '@/api/models/enums/BirthControlMethod';
import type { MaritalStatus } from '@/api/models/enums/MaritalStatus';
import type { UserType } from '@/api/models/enums/UserType';

/** Request body for POST /api/v1/app-users. */
export interface CreateAppUserRequest {
  userId: string;
  userType: UserType;
  dateOfBirth?: string;
  maritalStatus?: MaritalStatus;
  sexuallyActive?: boolean;
  birthControlMethods?: BirthControlMethod[];
  numberOfPregnancies?: number;
  numberOfChildren?: number;
  knownHealthConditions?: string[];
  zipCode?: string;
  city?: string;
  county?: string;
  state?: string;
  prayerNotificationsEnabled?: boolean;
  communityNotificationsEnabled?: boolean;
  appleHealthSyncEnabled?: boolean;
  ouraRingSyncEnabled?: boolean;
}
