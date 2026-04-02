import { ActiveStatus } from '../enums/ActiveStatus';
import { BirthControlMethod } from '../enums/BirthControlMethod';
import { MaritalStatus } from '../enums/MaritalStatus';
import { UserType } from '../enums/UserType';

export interface AppUserAttributes {
  userId?: string;
  userType?: UserType;
  status?: ActiveStatus;
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
  createdAt?: string;
  updatedAt?: string;
}
