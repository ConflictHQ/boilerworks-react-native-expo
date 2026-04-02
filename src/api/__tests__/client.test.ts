import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { jwtDecode } from 'jwt-decode';

import { ApiClient } from '../client';
import { authStorage } from '@/storage/authStorage';
import { API_ENDPOINTS } from '../config';

jest.mock('@/storage/authStorage');
jest.mock('jwt-decode');

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const BASE_URL = 'http://test.api';
const MOCK_JWT = 'mock.access.token';
const MOCK_REFRESH_TOKEN = 'mock-refresh-token';
const MOCK_NEW_JWT = 'new.access.token';
const MOCK_NEW_REFRESH_TOKEN = 'new-refresh-token';

const nowSeconds = () => Math.floor(Date.now() / 1000);
const EXP_FUTURE = nowSeconds() + 3600; // 1 hour — valid
const EXP_SOON = nowSeconds() + 30; // 30 s  — within 60 s proactive-refresh threshold

// ─── Helpers ──────────────────────────────────────────────────────────────────

type RequestInterceptorFn = (
  c: InternalAxiosRequestConfig
) => Promise<InternalAxiosRequestConfig>;

type ResponseInterceptors = {
  fulfilled: (r: AxiosResponse) => AxiosResponse;
  rejected: (e: unknown) => Promise<unknown>;
};

/** Minimal shape of axios's internal interceptor manager (not part of the public API). */
type AxiosInterceptorManagerInternal<T> = {
  handlers: (T | null)[];
};

/** Access the single request interceptor handler installed by ApiClient. */
const getRequestHandler = (client: ApiClient): RequestInterceptorFn =>
  (
    client.http.interceptors
      .request as unknown as AxiosInterceptorManagerInternal<{
      fulfilled: RequestInterceptorFn;
    }>
  ).handlers[0]!.fulfilled;

/** Access the single response interceptor handlers installed by ApiClient. */
const getResponseHandlers = (client: ApiClient): ResponseInterceptors =>
  (
    client.http.interceptors
      .response as unknown as AxiosInterceptorManagerInternal<ResponseInterceptors>
  ).handlers[0]!;

/** Typed accessor for private ApiClient internals used in tests. */
const priv = (c: ApiClient) =>
  c as unknown as {
    isRefreshing: boolean;
    processQueue: (error: unknown, token: string | null) => void;
  };

const makeConfig = (
  url: string,
  extra: Partial<InternalAxiosRequestConfig> = {}
): InternalAxiosRequestConfig =>
  ({
    url,
    method: 'get',
    headers: new AxiosHeaders(),
    ...extra,
  }) as InternalAxiosRequestConfig;

const makeAxiosError = (
  status: number | undefined,
  url: string,
  extra: Record<string, unknown> = {}
): AxiosError => {
  const config = {
    url,
    headers: new AxiosHeaders(),
    ...extra,
  } as InternalAxiosRequestConfig;
  const response = status
    ? ({
        status,
        data: {},
        headers: {},
        config,
        statusText: '',
      } as AxiosResponse)
    : undefined;
  return new AxiosError(
    'Request failed',
    undefined,
    config,
    undefined,
    response
  );
};

/** A mock axios adapter that resolves all requests with a fixed 200 payload. */
const makeMockAdapter = () =>
  jest.fn().mockResolvedValue({
    data: { retried: true },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
    request: {},
  });

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ApiClient', () => {
  let client: ApiClient;

  beforeEach(() => {
    jest.clearAllMocks();
    (jwtDecode as jest.Mock).mockReturnValue({ exp: EXP_FUTURE });
    (authStorage.getJwt as jest.Mock).mockResolvedValue(undefined);
    (authStorage.getRefreshToken as jest.Mock).mockResolvedValue(
      MOCK_REFRESH_TOKEN
    );
    (authStorage.setJwt as jest.Mock).mockResolvedValue(undefined);
    (authStorage.setRefreshToken as jest.Mock).mockResolvedValue(undefined);
    (authStorage.clearAll as jest.Mock).mockResolvedValue(undefined);
    client = new ApiClient(BASE_URL);
  });

  // ─── setAuthToken ───────────────────────────────────────────────────────────

  describe('setAuthToken', () => {
    it('sets Authorization header with Bearer token', () => {
      client.setAuthToken(MOCK_JWT);
      expect(client.http.defaults.headers.common['Authorization']).toBe(
        `Bearer ${MOCK_JWT}`
      );
    });

    it('clears Authorization header when passed null', () => {
      client.setAuthToken(MOCK_JWT);
      client.setAuthToken(null);
      expect(
        client.http.defaults.headers.common['Authorization']
      ).toBeUndefined();
    });

    it('decodes the token to cache its expiry', () => {
      client.setAuthToken(MOCK_JWT);
      expect(jwtDecode).toHaveBeenCalledWith(MOCK_JWT);
    });

    it('does not throw and still sets Authorization when jwtDecode throws', () => {
      (jwtDecode as jest.Mock).mockImplementation(() => {
        throw new Error('bad token');
      });
      expect(() => client.setAuthToken(MOCK_JWT)).not.toThrow();
      expect(client.http.defaults.headers.common['Authorization']).toBe(
        `Bearer ${MOCK_JWT}`
      );
    });
  });

  // ─── bootstrapToken ─────────────────────────────────────────────────────────

  describe('bootstrapToken', () => {
    it('returns stored token when it is not expiring soon', async () => {
      // jwtDecode returns EXP_FUTURE (default from beforeEach)
      const result = await client.bootstrapToken(MOCK_JWT);
      expect(result).toBe(MOCK_JWT);
      expect(authStorage.getRefreshToken).not.toHaveBeenCalled();
    });

    it('returns stored token without refreshing when a refresh is already in flight', async () => {
      (jwtDecode as jest.Mock).mockReturnValue({ exp: EXP_SOON });
      priv(client).isRefreshing = true;
      const result = await client.bootstrapToken(MOCK_JWT);
      expect(result).toBe(MOCK_JWT);
      expect(authStorage.getRefreshToken).not.toHaveBeenCalled();
    });

    it('proactively refreshes and returns new token when token is expiring soon', async () => {
      // First decode (inside setAuthToken): expiring soon
      // Second decode (inside setAuthToken called from performRefresh): far future
      (jwtDecode as jest.Mock)
        .mockReturnValueOnce({ exp: EXP_SOON })
        .mockReturnValue({ exp: EXP_FUTURE });
      const axiosPost = jest.spyOn(axios, 'post').mockResolvedValue({
        data: { jwt: MOCK_NEW_JWT, refreshToken: MOCK_NEW_REFRESH_TOKEN },
      });
      const onTokenRefreshed = jest.fn();
      client.setOnTokenRefreshed(onTokenRefreshed);

      const result = await client.bootstrapToken(MOCK_JWT);

      expect(result).toBe(MOCK_NEW_JWT);
      expect(authStorage.getRefreshToken).toHaveBeenCalled();
      expect(authStorage.setJwt).toHaveBeenCalledWith(MOCK_NEW_JWT);
      expect(authStorage.setRefreshToken).toHaveBeenCalledWith(
        MOCK_NEW_REFRESH_TOKEN
      );
      expect(onTokenRefreshed).toHaveBeenCalledWith(MOCK_NEW_JWT);

      axiosPost.mockRestore();
    });

    it('treats a token with no exp claim as expiring soon and proactively refreshes', async () => {
      // First decode (setAuthToken): no exp → tokenExpiresAt = null → isTokenExpiringSoon = true
      // Second decode (setAuthToken after refresh): far future
      (jwtDecode as jest.Mock)
        .mockReturnValueOnce({})
        .mockReturnValue({ exp: EXP_FUTURE });
      const axiosPost = jest.spyOn(axios, 'post').mockResolvedValue({
        data: { jwt: MOCK_NEW_JWT, refreshToken: MOCK_NEW_REFRESH_TOKEN },
      });

      const result = await client.bootstrapToken(MOCK_JWT);

      expect(result).toBe(MOCK_NEW_JWT);
      expect(authStorage.getRefreshToken).toHaveBeenCalled();
      expect(authStorage.setJwt).toHaveBeenCalledWith(MOCK_NEW_JWT);

      axiosPost.mockRestore();
    });

    it('clears session and returns null when proactive refresh fails', async () => {
      (jwtDecode as jest.Mock).mockReturnValue({ exp: EXP_SOON });
      const axiosPost = jest
        .spyOn(axios, 'post')
        .mockRejectedValue(new Error('network error'));

      const result = await client.bootstrapToken(MOCK_JWT);

      expect(result).toBeNull();
      expect(authStorage.getRefreshToken).toHaveBeenCalled();
      expect(authStorage.clearAll).toHaveBeenCalled();
      expect(
        client.http.defaults.headers.common['Authorization']
      ).toBeUndefined();

      axiosPost.mockRestore();
    });
  });

  // ─── Request interceptor ────────────────────────────────────────────────────

  describe('request interceptor', () => {
    it('strips Authorization header on the login path', async () => {
      const config = makeConfig(API_ENDPOINTS.auth.mobileLogin, {
        headers: new AxiosHeaders({ Authorization: `Bearer ${MOCK_JWT}` }),
      });
      const result = await getRequestHandler(client)(config);
      expect(result.headers['Authorization']).toBeUndefined();
    });

    it('strips Authorization header on the refresh path', async () => {
      const config = makeConfig(API_ENDPOINTS.auth.refresh, {
        headers: new AxiosHeaders({ Authorization: `Bearer ${MOCK_JWT}` }),
      });
      const result = await getRequestHandler(client)(config);
      expect(result.headers['Authorization']).toBeUndefined();
    });

    it('strips Authorization header on the logout path', async () => {
      const config = makeConfig(API_ENDPOINTS.auth.logout, {
        headers: new AxiosHeaders({ Authorization: `Bearer ${MOCK_JWT}` }),
      });
      const result = await getRequestHandler(client)(config);
      expect(result.headers['Authorization']).toBeUndefined();
    });

    it('passes through unauthenticated when no token is available', async () => {
      (authStorage.getJwt as jest.Mock).mockResolvedValue(undefined);
      const config = makeConfig('/api/v1/data');
      const result = await getRequestHandler(client)(config);
      expect(authStorage.getJwt).toHaveBeenCalled();
      expect(result.headers['Authorization']).toBeUndefined();
    });

    it('injects Authorization header when a valid token is already set', async () => {
      // Simulate what axios does: merge defaults into config before interceptors run.
      client.setAuthToken(MOCK_JWT);
      const config = makeConfig('/api/v1/data', {
        headers: new AxiosHeaders({ Authorization: `Bearer ${MOCK_JWT}` }),
      });
      const result = await getRequestHandler(client)(config);
      expect(result.headers['Authorization']).toBe(`Bearer ${MOCK_JWT}`);
    });

    it('loads token from storage on cold start (before setAuthToken is called)', async () => {
      (authStorage.getJwt as jest.Mock).mockResolvedValue(MOCK_JWT);
      const config = makeConfig('/api/v1/data');
      const result = await getRequestHandler(client)(config);
      expect(authStorage.getJwt).toHaveBeenCalled();
      expect(result.headers['Authorization']).toBe(`Bearer ${MOCK_JWT}`);
    });

    it('proactively refreshes and updates header when token expires within threshold', async () => {
      // First setAuthToken call: token expiring soon → tokenExpiresAt = EXP_SOON
      (jwtDecode as jest.Mock).mockReturnValue({ exp: EXP_SOON });
      client.setAuthToken(MOCK_JWT);

      // Subsequent jwtDecode calls (for new token): return far-future expiry
      (jwtDecode as jest.Mock).mockReturnValue({ exp: EXP_FUTURE });
      const axiosPost = jest.spyOn(axios, 'post').mockResolvedValue({
        data: { jwt: MOCK_NEW_JWT, refreshToken: MOCK_NEW_REFRESH_TOKEN },
      });

      const config = makeConfig('/api/v1/data', {
        headers: new AxiosHeaders({ Authorization: `Bearer ${MOCK_JWT}` }),
      });
      const result = await getRequestHandler(client)(config);

      expect(axiosPost).toHaveBeenCalledWith(
        expect.stringContaining(API_ENDPOINTS.auth.refresh),
        { refreshToken: MOCK_REFRESH_TOKEN },
        expect.any(Object)
      );
      expect(authStorage.setJwt).toHaveBeenCalledWith(MOCK_NEW_JWT);
      expect(authStorage.setRefreshToken).toHaveBeenCalledWith(
        MOCK_NEW_REFRESH_TOKEN
      );
      expect(result.headers['Authorization']).toBe(`Bearer ${MOCK_NEW_JWT}`);

      axiosPost.mockRestore();
    });

    it('queues request and injects new token when refresh is in flight (race #1 — resolve)', async () => {
      priv(client).isRefreshing = true;
      const config = makeConfig('/api/v1/data');
      const promise = getRequestHandler(client)(config);
      await Promise.resolve(); // let enqueueRequest run
      priv(client).processQueue(null, MOCK_NEW_JWT);
      const result = await promise;
      expect(result.headers['Authorization']).toBe(`Bearer ${MOCK_NEW_JWT}`);
    });

    it('rejects queued request when in-flight refresh fails (race #1 — reject)', async () => {
      priv(client).isRefreshing = true;
      const config = makeConfig('/api/v1/data');
      const promise = getRequestHandler(client)(config);
      await Promise.resolve();
      priv(client).processQueue(new Error('fail'), null);
      await expect(promise).rejects.toThrow('fail');
    });

    it('queues request when refresh starts during storage read (race #2)', async () => {
      let resolveJwt!: (v: string) => void;
      (authStorage.getJwt as jest.Mock).mockReturnValue(
        new Promise<string>(res => {
          resolveJwt = res;
        })
      );

      const config = makeConfig('/api/v1/data');
      const promise = getRequestHandler(client)(config);

      // Simulate a concurrent request starting a refresh while storage read is pending
      priv(client).isRefreshing = true;
      resolveJwt(MOCK_JWT); // unblock the storage read

      await Promise.resolve(); // let the re-check at line 320 queue the request
      priv(client).processQueue(null, MOCK_NEW_JWT);

      const result = await promise;
      expect(authStorage.getJwt).toHaveBeenCalled();
      expect(result.headers['Authorization']).toBe(`Bearer ${MOCK_NEW_JWT}`);
    });

    it('rejects and clears session when proactive refresh fails', async () => {
      (jwtDecode as jest.Mock).mockReturnValue({ exp: EXP_SOON });
      client.setAuthToken(MOCK_JWT);

      const refreshError = new Error('Refresh failed');
      const axiosPost = jest
        .spyOn(axios, 'post')
        .mockRejectedValue(refreshError);
      const onSessionExpired = jest.fn();
      client.setOnSessionExpired(onSessionExpired);

      const config = makeConfig('/api/v1/data', {
        headers: new AxiosHeaders({ Authorization: `Bearer ${MOCK_JWT}` }),
      });

      await expect(getRequestHandler(client)(config)).rejects.toBe(
        refreshError
      );
      expect(authStorage.getRefreshToken).toHaveBeenCalled();
      expect(authStorage.clearAll).toHaveBeenCalled();
      expect(onSessionExpired).toHaveBeenCalled();

      axiosPost.mockRestore();
    });
  });

  // ─── Response interceptor ───────────────────────────────────────────────────

  describe('response interceptor', () => {
    describe('fulfilled', () => {
      it('passes successful responses through unchanged', () => {
        const response = {
          status: 200,
          data: { ok: true },
          headers: {},
          config: {},
        };
        expect(
          getResponseHandlers(client).fulfilled(response as AxiosResponse)
        ).toBe(response);
      });
    });

    describe('rejected', () => {
      it('rejects non-401 errors without retrying', async () => {
        const error = makeAxiosError(500, '/api/v1/data');
        await expect(getResponseHandlers(client).rejected(error)).rejects.toBe(
          error
        );
      });

      it('rejects 401 on auth endpoints without retrying', async () => {
        const error = makeAxiosError(401, API_ENDPOINTS.auth.mobileLogin);
        await expect(getResponseHandlers(client).rejected(error)).rejects.toBe(
          error
        );
      });

      it('rejects 401 on the refresh endpoint without retrying', async () => {
        const error = makeAxiosError(401, API_ENDPOINTS.auth.refresh);
        await expect(getResponseHandlers(client).rejected(error)).rejects.toBe(
          error
        );
      });

      it('rejects already-retried 401 requests to prevent loops', async () => {
        const error = makeAxiosError(401, '/api/v1/data', { _retry: true });
        await expect(getResponseHandlers(client).rejected(error)).rejects.toBe(
          error
        );
      });

      it('refreshes token, stores new tokens, and retries the request on 401', async () => {
        client.http.defaults.adapter = makeMockAdapter();
        const axiosPost = jest.spyOn(axios, 'post').mockResolvedValue({
          data: { jwt: MOCK_NEW_JWT, refreshToken: MOCK_NEW_REFRESH_TOKEN },
        });

        const error = makeAxiosError(401, '/api/v1/data');
        const result = (await getResponseHandlers(client).rejected(
          error
        )) as AxiosResponse;

        expect(authStorage.setJwt).toHaveBeenCalledWith(MOCK_NEW_JWT);
        expect(authStorage.setRefreshToken).toHaveBeenCalledWith(
          MOCK_NEW_REFRESH_TOKEN
        );
        expect(result.data).toEqual({ retried: true });

        axiosPost.mockRestore();
      });

      it('calls onTokenRefreshed with the new token after a 401 refresh', async () => {
        client.http.defaults.adapter = makeMockAdapter();
        const onTokenRefreshed = jest.fn();
        client.setOnTokenRefreshed(onTokenRefreshed);
        const axiosPost = jest.spyOn(axios, 'post').mockResolvedValue({
          data: { jwt: MOCK_NEW_JWT, refreshToken: MOCK_NEW_REFRESH_TOKEN },
        });

        await getResponseHandlers(client).rejected(
          makeAxiosError(401, '/api/v1/data')
        );

        expect(onTokenRefreshed).toHaveBeenCalledWith(MOCK_NEW_JWT);
        axiosPost.mockRestore();
      });

      it('clears session and calls onSessionExpired when refresh fails on 401', async () => {
        const refreshError = new Error('Refresh failed');
        const axiosPost = jest
          .spyOn(axios, 'post')
          .mockRejectedValue(refreshError);
        const onSessionExpired = jest.fn();
        client.setOnSessionExpired(onSessionExpired);

        await expect(
          getResponseHandlers(client).rejected(
            makeAxiosError(401, '/api/v1/data')
          )
        ).rejects.toBe(refreshError);

        expect(authStorage.clearAll).toHaveBeenCalled();
        expect(
          client.http.defaults.headers.common['Authorization']
        ).toBeUndefined();
        expect(onSessionExpired).toHaveBeenCalled();

        axiosPost.mockRestore();
      });

      it('queues retry and resolves with retried response when 401 arrives during in-flight refresh', async () => {
        // Set a valid token so the request interceptor does not attempt a
        // proactive refresh when it processes the retried request.
        client.setAuthToken(MOCK_JWT); // jwtDecode → EXP_FUTURE (from beforeEach)
        client.http.defaults.adapter = makeMockAdapter();
        priv(client).isRefreshing = true;

        const promise = getResponseHandlers(client).rejected(
          makeAxiosError(401, '/api/v1/data')
        );

        // Mirror the real finally block: clear isRefreshing before resolving the
        // queue so the retried request's request interceptor does not re-queue.
        priv(client).isRefreshing = false;
        priv(client).processQueue(null, MOCK_NEW_JWT);

        const result = await promise;
        expect((result as AxiosResponse).data).toEqual({ retried: true });
      });

      it('clears session when no refresh token is available on 401', async () => {
        (authStorage.getRefreshToken as jest.Mock).mockResolvedValue(undefined);
        const onSessionExpired = jest.fn();
        client.setOnSessionExpired(onSessionExpired);

        await expect(
          getResponseHandlers(client).rejected(
            makeAxiosError(401, '/api/v1/data')
          )
        ).rejects.toThrow('No refresh token available');

        expect(authStorage.clearAll).toHaveBeenCalled();
        expect(onSessionExpired).toHaveBeenCalled();
      });
    });
  });

  // ─── HTTP methods ───────────────────────────────────────────────────────────

  describe('HTTP methods', () => {
    it('get passes url and params to http.get', async () => {
      const mockResponse = { data: { items: [] } };
      jest.spyOn(client.http, 'get').mockResolvedValue(mockResponse);
      const result = await client.get('/api/v1/data', { page: 1 });
      expect(client.http.get).toHaveBeenCalledWith('/api/v1/data', {
        params: { page: 1 },
      });
      expect(result).toBe(mockResponse);
    });

    it('post passes url and body to http.post', async () => {
      const mockResponse = { data: { id: '1' } };
      jest.spyOn(client.http, 'post').mockResolvedValue(mockResponse);
      const result = await client.post('/api/v1/data', { name: 'test' });
      expect(client.http.post).toHaveBeenCalledWith(
        '/api/v1/data',
        { name: 'test' },
        undefined
      );
      expect(result).toBe(mockResponse);
    });

    it('put passes url and body to http.put', async () => {
      const mockResponse = { data: { id: '1' } };
      jest.spyOn(client.http, 'put').mockResolvedValue(mockResponse);
      const result = await client.put('/api/v1/data', { name: 'updated' });
      expect(client.http.put).toHaveBeenCalledWith(
        '/api/v1/data',
        { name: 'updated' },
        undefined
      );
      expect(result).toBe(mockResponse);
    });

    it('patch passes url and body to http.patch', async () => {
      const mockResponse = { data: { id: '1' } };
      jest.spyOn(client.http, 'patch').mockResolvedValue(mockResponse);
      const result = await client.patch('/api/v1/data', { name: 'patched' });
      expect(client.http.patch).toHaveBeenCalledWith(
        '/api/v1/data',
        { name: 'patched' },
        undefined
      );
      expect(result).toBe(mockResponse);
    });

    it('delete passes url and optional body to http.delete', async () => {
      const mockResponse = { data: {} };
      jest.spyOn(client.http, 'delete').mockResolvedValue(mockResponse);
      const result = await client.delete('/api/v1/data');
      expect(client.http.delete).toHaveBeenCalledWith('/api/v1/data', {
        data: undefined,
      });
      expect(result).toBe(mockResponse);
    });
  });
});
