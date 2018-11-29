import { ProfileRepository } from './ProfileRepository';
import { ProfileModel } from './ProfileModel';

export class StubProfileRepository implements ProfileRepository {
  getProfile(): Promise<ProfileModel> {
    return Promise.resolve(
      new ProfileModel(0, 'TEST.TEST.TEST', 'TEST', 1)
    );
  }

  updateProfile(profile: ProfileModel): Promise<void> {
    return Promise.resolve();
  }
}