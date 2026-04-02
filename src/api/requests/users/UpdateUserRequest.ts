/** Request body for PUT /api/v1/users/:id */
export interface UpdateUserRequest {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  referredBy?: string;
  metadata?: Record<string, unknown>;
}
