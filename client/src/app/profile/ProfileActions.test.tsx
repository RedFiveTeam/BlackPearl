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

  it('should generate a display name from a JWICS and SIPR login', () => {
    let JWICSProfile = new ProfileModel(1, 'first.last@af.ic.gov', 1, 1, 1, '');
    let SIPRProfile = new ProfileModel(1, 'first.m.last.mil@mail.smil.mil', 1, 1, 1, '');

    expect(subject.generateDisplayName(JWICSProfile)).toBe('first last');
    expect(subject.generateDisplayName(SIPRProfile)).toBe('first last');
  });
});