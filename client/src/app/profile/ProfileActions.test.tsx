import { ProfileActions } from './ProfileActions';
import { StubProfileRepository } from './StubProfileRepository';
import { ProfileRepository } from './ProfileRepository';
import { LoginRepository } from '../component/metrics/login/LoginRepository.tsx';
import { StubLoginRepository } from '../component/metrics/login/StubLoginRepository';

describe('ProfileActions', () => {
  let subject: ProfileActions;
  let profileRepository: ProfileRepository;
  let profileStore: any;
  let loginRepository: LoginRepository;

  beforeEach(() => {
    profileStore = {
      setProfile: jest.fn(),
    };

    profileRepository = new StubProfileRepository();
    loginRepository = new StubLoginRepository();
    loginRepository.addLogin = jest.fn();

    subject = new ProfileActions({profileStore} as any, {profileRepository, loginRepository} as any);
  });

  it('should get the current account', async () => {
    await subject.setProfile();
    expect(profileStore.setProfile).toHaveBeenCalled();
  });

  it('should post a new metrics when it adds a login', async () => {
    await subject.addLogin();
    expect(loginRepository.addLogin).toHaveBeenCalled();
  });
});