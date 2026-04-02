/** Request body for POST /api/v1/users (user registration). */
export interface CreateUserRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  referredBy?: string;
  metadata?: Record<string, unknown>;
}
