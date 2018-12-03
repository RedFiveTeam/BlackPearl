import { StubUserRepository } from '../../component/metrics/user/StubUserRepository';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { StubMetricRepository } from '../../component/metrics/metric/StubMetricRepository';
import { MetricsActions } from './MetricsActions';
import { MetricRepository } from '../../component/metrics/metric/MetricRepository';

describe('MetricsActions', () => {
  let subject: MetricsActions;
  let userRepository: UserRepository;
  let metricRepository: MetricRepository;
  let metricsStore: any;

  beforeEach(() => {
    metricsStore = {
      hydrate: jest.fn()
    };

    userRepository = new StubUserRepository();
    metricRepository = new StubMetricRepository();
    subject = new MetricsActions({metricsStore}, {userRepository, metricRepository: metricRepository});
  });

  it('should hydrate the store on initialize', async () => {
    await subject.initializeStores();
    expect(metricsStore.hydrate).toHaveBeenCalledWith(userRepository, metricRepository);
  });
});