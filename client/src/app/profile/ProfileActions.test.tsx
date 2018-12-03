import { ProfileActions } from './ProfileActions';
import { StubProfileRepository } from './StubProfileRepository';
import { ProfileRepository } from './ProfileRepository';
import { StubMetricRepository } from '../component/metrics/metric/StubMetricRepository';
import { MetricRepository } from '../component/metrics/metric/MetricRepository';

describe('ProfileActions', () => {
  let subject: ProfileActions;
  let profileRepository: ProfileRepository;
  let profileStore: any;
  let metricRepository: MetricRepository;

  beforeEach(() => {
    profileStore = {
      setProfile: jest.fn(),
    };

    profileRepository = new StubProfileRepository();
    metricRepository = new StubMetricRepository();
    metricRepository.addLogin = jest.fn();

    subject = new ProfileActions({profileStore} as any, {profileRepository, metricRepository: metricRepository} as any);
  });

  it('should get the current account', async () => {
    await subject.setProfile();
    expect(profileStore.setProfile).toHaveBeenCalled();
  });

  it('should post a new metrics when it adds a login', async () => {
    await subject.addLogin();
    expect(metricRepository.addLogin).toHaveBeenCalled();
  });
});