import { ProfileModel } from './ProfileModel';

export interface ProfileRepository {
  getProfile(): Promise<ProfileModel>;

  updateProfile(profile: ProfileModel): Promise<void>;

  getAllProfiles(): Promise<ProfileModel[]>;

  login(altID: string): Promise<ProfileModel>;

  link(profile: ProfileModel): Promise<ProfileModel>;
}