import { MetricActions } from './MetricActions';
import { LogableActions } from './MetricModel';
import { ProfileModel } from '../../../profile/ProfileModel';

describe('MetricActions', () => {
  let subject: MetricActions;
  let metricRepository: any;
  let profileStore: any;
  let profileRepository: any;

  beforeEach(() => {
    metricRepository = {
      logMetric: jest.fn()
    };

    profileStore = {
      setProfile: jest.fn(),
      profile: new ProfileModel(null, 'cardID', 'AltId', 1, 0, 1)
    };

    profileRepository = {
      getProfile: jest.fn()
    };

    subject = new MetricActions({profileStore} as any, {metricRepository, profileRepository} as any);
  });

  it('should log a metric', async () => {
    await subject.logMetric(LogableActions.VISIT, 'Home');
    expect(metricRepository.logMetric).toHaveBeenCalled();
  });
});
