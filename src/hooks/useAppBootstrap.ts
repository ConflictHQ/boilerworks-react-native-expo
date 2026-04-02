import { useEffect } from 'react';
import { apiClient } from '@/api/client';
import { tokenRefreshed, logout } from '@/store/auth';
import { useAppDispatch } from '@/store/hooks';

// Wires up apiClient callbacks to the Redux store.
// Must be called inside the Redux <Provider> (i.e. in App) so dispatch is
// available, but outside any screen so it is registered for the lifetime of
// the app — not tied to a single screen's mount/unmount cycle.
export const useAppBootstrap = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    apiClient.setOnTokenRefreshed(token => dispatch(tokenRefreshed(token)));
    apiClient.setOnSessionExpired(() => dispatch(logout()));
  }, [dispatch]);
};
