import { StubUserRepository } from '../../component/metrics/user/StubUserRepository';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { StubMetricRepository } from '../../component/metrics/metric/StubMetricRepository';
import { MetricsPageActions } from './MetricsPageActions';
import { MetricRepository } from '../../component/metrics/metric/MetricRepository';

describe('MetricsPageActions', () => {
  let subject: MetricsPageActions;
  let userRepository: UserRepository;
  let metricRepository: MetricRepository;
  let metricsStore: any;

  beforeEach(() => {
    metricsStore = {
      hydrate: jest.fn()
    };

    userRepository = new StubUserRepository();
    metricRepository = new StubMetricRepository();
    subject = new MetricsPageActions({metricsStore}, {userRepository, metricRepository: metricRepository});
  });

  it('should hydrate the store on initialize', async () => {
    await subject.initializeStores();
    expect(metricsStore.hydrate).toHaveBeenCalledWith(userRepository, metricRepository);
  });
});