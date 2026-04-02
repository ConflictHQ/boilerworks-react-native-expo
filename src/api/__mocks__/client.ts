export const apiClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  setAuthToken: jest.fn(),
  bootstrapToken: jest.fn().mockResolvedValue('mock-jwt'),
  setOnTokenRefreshed: jest.fn(),
  setOnSessionExpired: jest.fn(),
};
