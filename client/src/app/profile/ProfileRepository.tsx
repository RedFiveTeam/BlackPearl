import { ProfileModel } from './ProfileModel';

export interface ProfileRepository {
  getProfile(): Promise<ProfileModel>;

  updateProfile(profile: ProfileModel): Promise<void>;
}