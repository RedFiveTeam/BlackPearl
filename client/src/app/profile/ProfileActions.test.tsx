import { ProfileActions } from './ProfileActions';
import { StubProfileRepository } from './StubProfileRepository';
import { ProfileRepository } from './ProfileRepository';

describe('ProfileActions', () => {
  let subject: ProfileActions;
  let profileRepository: ProfileRepository;
  let profileStore: any;

  beforeEach(() => {
    profileStore = {
      setProfile: jest.fn()
    };

    profileRepository = new StubProfileRepository();

    subject = new ProfileActions({profileStore} as any, {profileRepository} as any);
  });

  it('should get the current account', async () => {
    await subject.setProfile();
    expect(profileStore.setProfile).toHaveBeenCalled();
  });

});