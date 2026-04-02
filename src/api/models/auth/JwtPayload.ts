/** Decoded JWT payload. */
export interface JwtPayload {
  /** User ID (UUID). */
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
