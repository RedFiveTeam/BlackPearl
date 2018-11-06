import { ProfileModel } from './ProfileModel';

export interface ProfileRepository {
  getProfile(): Promise<ProfileModel>;
}