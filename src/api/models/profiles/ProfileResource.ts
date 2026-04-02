import type { DataResponse } from '@/api/models/DataResponse';

export interface BaseProfileAttributes {
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileData<
  TType extends string,
  TAttributes extends BaseProfileAttributes,
> {
  type: TType;
  id: string;
  attributes: TAttributes;
}

export type ProfileResponse<
  TType extends string,
  TAttributes extends BaseProfileAttributes,
> = DataResponse<ProfileData<TType, TAttributes>>;
