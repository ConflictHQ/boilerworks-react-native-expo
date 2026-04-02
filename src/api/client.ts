import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { jwtDecode } from 'jwt-decode';

// jwt-decode relies on atob(). React Native >= 0.74 ships atob() natively,
// so no polyfill is needed for this project (RN 0.81.4).

import { authStorage } from '@/storage/authStorage';
import { API_BASE_URL, API_ENDPOINTS } from './config';
import type { RefreshResponse } from './models/auth/RefreshResponse';
import { logger } from '@/utils/logger';

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const TOKEN_EXPIRY_THRESHOLD_MS = 60_000; // refresh 60 s before expiry

const AUTH_PATHS = [
  API_ENDPOINTS.auth.mobileLogin,
  API_ENDPOINTS.auth.refresh,
  API_ENDPOINTS.auth.logout,
];

// ─── ApiClient class ──────────────────────────────────────────────────────────

export class ApiClient {
  readonly http: AxiosInstance;

  private isRefreshing = false;
  private failedQueue: QueueItem[] = [];
  private tokenExpiresAt: number | null = null;
  private onTokenRefreshed: ((token: string) => void) | null = null;
  private onSessionExpired: (() => void) | null = null;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      timeout: 15_000,
      headers: { 'Content-Type': 'application/json' },
    });
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  // ─── Public setup ───────────────────────────────────────────────────────────

  setOnTokenRefreshed(callback: (token: string) => void): void {
    this.onTokenRefreshed = callback;
  }

  setOnSessionExpired(callback: () => void): void {
    this.onSessionExpired = callback;
  }

  /**
   * Call once during app bootstrap (after restoring tokens from storage)
   * and after every successful login / refresh.
   */
  setAuthToken(token: string | null): void {
    if (token) {
      this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.tokenExpiresAt = this.parseTokenExpiry(token);
      const expiresIn = this.tokenExpiresAt
        ? Math.round((this.tokenExpiresAt - Date.now()) / 1000)
        : null;
      logger.log(
        `[ApiClient] setAuthToken: token set, expires in ${expiresIn != null ? `${expiresIn}s` : 'unknown'}`
      );
    } else {
      logger.log('[ApiClient] setAuthToken: token cleared');
      delete this.http.defaults.headers.common['Authorization'];
      this.tokenExpiresAt = null;
    }
  }

  async bootstrapToken(storedJwt: string): Promise<string | null> {
    this.setAuthToken(storedJwt);
    if (!this.isTokenExpiringSoon()) return storedJwt;
    if (this.isRefreshing) return storedJwt;
    this.isRefreshing = true;
    try {
      const newToken = await this.performRefresh();
      this.processQueue(null, newToken);
      return newToken;
    } catch (e) {
      this.processQueue(e, null);
      await authStorage.clearAll();
      this.setAuthToken(null);
      return null;
    } finally {
      this.isRefreshing = false;
    }
  }

  // ─── Typed HTTP methods ─────────────────────────────────────────────────────

  get<TRes, TParams = unknown>(
    url: string,
    params?: TParams,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TRes>> {
    return this.http.get<TRes>(url, { ...config, params });
  }

  post<TRes, TReq = unknown>(
    url: string,
    body: TReq,
    config?: AxiosRequestConfig<TReq>
  ): Promise<AxiosResponse<TRes>> {
    return this.http.post<TRes, AxiosResponse<TRes>, TReq>(url, body, config);
  }

  put<TRes, TReq = unknown>(
    url: string,
    body: TReq,
    config?: AxiosRequestConfig<TReq>
  ): Promise<AxiosResponse<TRes>> {
    return this.http.put<TRes, AxiosResponse<TRes>, TReq>(url, body, config);
  }

  patch<TRes, TReq = unknown>(
    url: string,
    body: TReq,
    config?: AxiosRequestConfig<TReq>
  ): Promise<AxiosResponse<TRes>> {
    return this.http.patch<TRes, AxiosResponse<TRes>, TReq>(url, body, config);
  }

  delete<TRes, TReq = unknown>(
    url: string,
    body?: TReq,
    config?: AxiosRequestConfig<TReq>
  ): Promise<AxiosResponse<TRes>> {
    return this.http.delete<TRes, AxiosResponse<TRes>>(url, {
      ...config,
      data: body,
    });
  }

  // ─── JWT helpers ────────────────────────────────────────────────────────────

  /** Decode once and cache the expiry timestamp (ms). */
  private parseTokenExpiry(token: string): number | null {
    try {
      const { exp } = jwtDecode<{ exp?: number }>(token);
      return exp ? exp * 1_000 : null;
    } catch {
      return null;
    }
  }

  /**
   * Pure timestamp comparison — no decode on every request.
   * Returns true when missing, malformed, expired, or expiring within threshold.
   */
  private isTokenExpiringSoon(): boolean {
    if (this.tokenExpiresAt === null) return true;
    return Date.now() >= this.tokenExpiresAt - TOKEN_EXPIRY_THRESHOLD_MS;
  }

  // ─── Queue helpers ──────────────────────────────────────────────────────────

  private processQueue(error: unknown, token: string | null): void {
    logger.log(
      `[ApiClient] processQueue: ${this.failedQueue.length} queued request(s) — ${error ? 'rejecting' : 'resolving'}`
    );
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) reject(error);
      else resolve(token!);
    });
    this.failedQueue = [];
  }

  private enqueueRequest(): Promise<string> {
    logger.log(
      `[ApiClient] enqueueRequest: refresh in flight, queuing (queue size: ${this.failedQueue.length + 1})`
    );
    return new Promise<string>((resolve, reject) => {
      this.failedQueue.push({ resolve, reject });
    });
  }

  // ─── Core refresh logic ─────────────────────────────────────────────────────

  private async performRefresh(): Promise<string> {
    logger.log('[ApiClient] performRefresh: starting token refresh');
    const refreshToken = await authStorage.getRefreshToken();
    if (!refreshToken) {
      logger.warn('[ApiClient] performRefresh: no refresh token available');
      throw new Error('No refresh token available');
    }

    // Plain axios call — bypasses our interceptors.
    const { data } = await axios.post<RefreshResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.auth.refresh}`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    );

    logger.log('[ApiClient] performRefresh: token refreshed successfully');
    await authStorage.setJwt(data.jwt);
    await authStorage.setRefreshToken(data.refreshToken);
    this.setAuthToken(data.jwt);
    this.onTokenRefreshed?.(data.jwt);

    return data.jwt;
  }

  private async handleRefreshFailure(error: unknown): Promise<never> {
    logger.warn(
      '[ApiClient] handleRefreshFailure: refresh failed, session expired',
      error
    );
    this.processQueue(error, null);
    await authStorage.clearAll();
    this.setAuthToken(null);
    this.onSessionExpired?.();
    throw error;
  }

  // ─── curl generator ─────────────────────────────────────────────────────────

  private toCurl(config: InternalAxiosRequestConfig): string {
    const method = config.method?.toUpperCase() ?? 'GET';
    const baseURL = (config.baseURL ?? '').replace(/\/$/, '');
    const path = config.url ?? '';
    let url = path.startsWith('http') ? path : `${baseURL}${path}`;

    if (config.params) {
      const qs = new URLSearchParams(config.params).toString();
      if (qs) url += `?${qs}`;
    }

    const headers = Object.entries(config.headers ?? {})
      .filter(([, v]) => typeof v === 'string')
      .map(([k, v]) => `-H '${k}: ${v}'`)
      .join(' \\\n  ');

    const body = config.data
      ? `-d '${typeof config.data === 'string' ? config.data : JSON.stringify(config.data)}'`
      : '';

    return [
      `curl -X ${method}`,
      `  '${url}'`,
      headers && `  ${headers}`,
      body && `  ${body}`,
    ]
      .filter(Boolean)
      .join(' \\\n');
  }

  // ─── Interceptors ───────────────────────────────────────────────────────────

  private setupRequestInterceptor(): void {
    this.http.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        logger.log(
          `[ApiClient] → ${config.method?.toUpperCase()} ${config.url}`
        );
        logger.debug(`[ApiClient] curl:\n${this.toCurl(config)}`);

        if (AUTH_PATHS.some(path => config.url?.includes(path))) {
          // Strip any Authorization header that axios merged from defaults —
          // auth endpoints must never receive a Bearer token.
          logger.log(
            `[ApiClient] request interceptor: auth path, skipping token injection`
          );
          delete config.headers['Authorization'];
          return config;
        }

        // A refresh is already in flight — queue this request and wait.
        if (this.isRefreshing) {
          logger.log(
            `[ApiClient] request interceptor: refresh in flight, queuing ${config.url}`
          );
          const newToken = await this.enqueueRequest();
          config.headers['Authorization'] = `Bearer ${newToken}`;
          return config;
        }

        // Prefer the already-set default header; fall back to storage for the
        // cold-start window before setAuthToken has been called.
        const existingHeader = config.headers['Authorization'] as
          | string
          | undefined;
        let token = existingHeader?.replace('Bearer ', '') ?? null;

        if (!token) {
          const stored = await authStorage.getJwt();
          if (stored) {
            logger.log(
              '[ApiClient] request interceptor: token loaded from storage'
            );
            // Also initialises tokenExpiresAt so isTokenExpiringSoon() works.
            this.setAuthToken(stored);
            token = stored;
          }
        }

        if (!token) {
          logger.log(
            `[ApiClient] request interceptor: no token, sending unauthenticated`
          );
          return config;
        }

        // Re-check after the async yield: another concurrent request may have started
        // a refresh while this one was waiting on authStorage.getJwt().
        if (this.isRefreshing) {
          logger.log(
            `[ApiClient] request interceptor: refresh started during storage read, queuing ${config.url}`
          );
          const newToken = await this.enqueueRequest();
          config.headers['Authorization'] = `Bearer ${newToken}`;
          return config;
        }

        if (this.isTokenExpiringSoon()) {
          logger.log(
            `[ApiClient] request interceptor: token expiring soon, proactive refresh for ${config.url}`
          );
          this.isRefreshing = true;
          try {
            const newToken = await this.performRefresh();
            this.processQueue(null, newToken);
            config.headers['Authorization'] = `Bearer ${newToken}`;
          } catch (error) {
            await this.handleRefreshFailure(error);
          } finally {
            this.isRefreshing = false;
          }
        } else {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error: unknown) => Promise.reject(error)
    );
  }

  private setupResponseInterceptor(): void {
    this.http.interceptors.response.use(
      (response: AxiosResponse) => {
        logger.log(`[ApiClient] ← ${response.status} ${response.config.url}`);
        return response;
      },
      async (error: AxiosError) => {
        const original = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        const status = error.response?.status;
        const is401 = status === 401;
        const isAuthEndpoint = AUTH_PATHS.some(path =>
          original?.url?.includes(path)
        );

        if (!is401 || original._retry || isAuthEndpoint) {
          logger.warn(`[ApiClient] ← ${status ?? 'ERR'} ${original?.url}`);
          return Promise.reject(error);
        }

        if (this.isRefreshing) {
          logger.log(
            `[ApiClient] response interceptor: 401 on ${original?.url}, refresh in flight, queuing retry`
          );
          return this.enqueueRequest().then(token => {
            original.headers['Authorization'] = `Bearer ${token}`;
            return this.http(original);
          });
        }

        logger.log(
          `[ApiClient] response interceptor: 401 on ${original?.url}, triggering reactive refresh`
        );
        original._retry = true;
        this.isRefreshing = true;

        try {
          const newToken = await this.performRefresh();
          this.processQueue(null, newToken);
          original.headers['Authorization'] = `Bearer ${newToken}`;
          return this.http(original);
        } catch (refreshError) {
          return this.handleRefreshFailure(refreshError);
        } finally {
          this.isRefreshing = false;
        }
      }
    );
  }
}

// ─── Singleton ────────────────────────────────────────────────────────────────

export const apiClient = new ApiClient(API_BASE_URL);
