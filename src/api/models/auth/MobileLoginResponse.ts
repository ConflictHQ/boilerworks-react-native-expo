/** POST /api/v1/auth/mobile/login */
export interface MobileLoginResponse {
  /** Access token (JWT). 30-minute expiration. */
  jwt: string;
  /** Refresh token. 14-day expiration. Rotated on every use. */
  refreshToken: string;
}
