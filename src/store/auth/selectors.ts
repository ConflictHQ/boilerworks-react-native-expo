import type { RootState } from '@/store/types';
import type { UserType } from '@/api/models/enums/UserType';
import { createAppSelector } from '../utils';

export const selectAuthStatus = createAppSelector(
  [state => state.auth],
  auth => auth.status
);

export const selectAuth = (state: RootState) => state.auth;

export const selectAuthJwt = createAppSelector(selectAuth, auth => auth.jwt);

export const selectDecodedJwt = createAppSelector(
  selectAuth,
  auth => auth.decodedJwt
);

export const selectAuthIsLoading = createAppSelector(
  selectAuth,
  auth => auth.isLoading
);

export const selectAuthError = createAppSelector(
  selectAuth,
  auth => auth.error
);

export const selectUserId = createAppSelector(
  selectDecodedJwt,
  decodedJwt => decodedJwt?.sub ?? null
);

export const selectUserRoles = createAppSelector(
  selectDecodedJwt,
  decodedJwt => decodedJwt?.roles ?? []
);

export const selectUserProfile = createAppSelector(
  selectAuth,
  auth => auth.profile
);

export const selectUserFullName = createAppSelector(
  selectUserProfile,
  profile => profile?.attributes.fullName ?? null
);

export const selectUserFirstName = createAppSelector(
  selectUserProfile,
  profile => profile?.attributes.firstName ?? null
);

export const selectUserEmail = createAppSelector(
  selectUserProfile,
  profile => profile?.attributes.email ?? undefined
);

export const selectUserAvatarUrl = createAppSelector(
  selectUserProfile,
  profile => profile?.attributes.profileImageUrl ?? undefined
);

export const selectUserInitials = createAppSelector(
  selectUserProfile,
  profile => {
    const first = profile?.attributes.firstName?.[0] ?? '';
    const last = profile?.attributes.lastName?.[0] ?? '';
    const initials = (first + last).toUpperCase();
    return initials || undefined;
  }
);

export const selectAppUser = createAppSelector(
  selectUserProfile,
  profile => profile?.appUser ?? null
);

export const selectAppUserId = createAppSelector(
  selectAppUser,
  appUser => appUser?.id ?? null
);

export const selectProfileType = createAppSelector(
  selectUserProfile,
  profile => (profile?.attributes.metadata?.profileType as UserType) ?? null
);
