/** Attributes of a User resource (JSON:API). */
export interface UserAttributes {
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  referredBy?: string;
  deletedAt?: string;
  lastLoginAt?: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}
