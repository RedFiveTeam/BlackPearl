import { ProfileRepository } from './ProfileRepository';
import { ProfileModel } from './ProfileModel';

export class StubProfileRepository implements ProfileRepository {
  getProfile(): Promise<ProfileModel> {
    return Promise.resolve(
      new ProfileModel('TEST.TEST.TEST', 'TEST')
    );
  }
}