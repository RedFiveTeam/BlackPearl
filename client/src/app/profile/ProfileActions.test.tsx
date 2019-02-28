import { ProfileActions } from './ProfileActions';
import { StubProfileRepository } from './StubProfileRepository';
import { ProfileRepository } from './ProfileRepository';
import { ProfileModel } from './ProfileModel';

describe('ProfileActions', () => {
  let subject: ProfileActions;
  let profileRepository: ProfileRepository;
  let profileStore: any;

  beforeEach(() => {
    profileStore = {
      setProfile: jest.fn(),
    };

    profileRepository = new StubProfileRepository();

    subject = new ProfileActions({profileStore} as any, {profileRepository} as any);
  });

  it('should get the current fetchAccountByCardId', async () => {
    await subject.setProfile();
    expect(profileStore.setProfile).toHaveBeenCalled();
  });

  it('should generate a display name', () => {
    let profile = new ProfileModel(1, 'LAST.FIRST.MIDDLE.0123456789');
    expect(subject.generateDisplayName(profile)).toBe('LAST.FIRST.MIDDLE.0123456789');
  });

  it('should generate a display name from a JWICS login', () => {
    let profile = new ProfileModel(1, 'first.last@af.ic.gov');
    expect(subject.generateDisplayName(profile)).toBe('first last');
  });
});