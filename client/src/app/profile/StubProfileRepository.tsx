import { ProfileRepository } from './ProfileRepository';
import { ProfileModel } from './ProfileModel';

export class StubProfileRepository implements ProfileRepository {
  getProfile(): Promise<ProfileModel> {
    return Promise.resolve(
      new ProfileModel(null, 'cardID', 'AltId', 1, 0, 1)
    );
  }

  updateProfile(profile: ProfileModel): Promise<void> {
    return Promise.resolve();
  }

  getAllProfiles(): Promise<ProfileModel[]> {
    return Promise.resolve(
      [
        new ProfileModel(null, 'cardID', 'AltId', 1, 0, 1),
        new ProfileModel(1, 'JORDAN.CROSS.MIDDLE.0123456789', '', 1, 0, 1),
        new ProfileModel(1, 'GUEST.GUEST.GUEST.0123456789', '', 1, 0, 1)
      ]
    );
  }

  login(profile: ProfileModel): Promise<ProfileModel> {
    return Promise.resolve(new ProfileModel(null, 'cardID', 'AltId', 1, 0, 1));
  }

  link(profile: ProfileModel): Promise<ProfileModel> {
    return Promise.resolve(new ProfileModel(null, 'cardID', 'AltId', 1, 0, 1));
  }
}
