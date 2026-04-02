/** POST /api/v1/auth/refresh */
export interface RefreshResponse {
  /** New access token (JWT). 30-minute expiration. */
  jwt: string;
  /** New refresh token. Old token is invalidated (rotation). */
  refreshToken: string;
}
