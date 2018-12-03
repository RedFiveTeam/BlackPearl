import { MetricsStore } from './MetricsStore';
import { StubMetricRepository } from '../../component/metrics/metric/StubMetricRepository';
import { MetricRepository } from '../../component/metrics/metric/MetricRepository';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { StubUserRepository } from '../../component/metrics/user/StubUserRepository';

describe('MetricsStore', () => {
  let subject: MetricsStore;
  let userRepository: UserRepository;
  let metricRepository: MetricRepository;

  beforeEach(() => {
    userRepository = new StubUserRepository();
    metricRepository = new StubMetricRepository();
    subject = new MetricsStore();
  });

  it('should set the users from a service on hydrate', async () => {
    await subject.hydrate(userRepository, metricRepository);
    expect(subject.userCount).toBe(3);
  });

  it('should set the logins on hydrate', async () => {
    await subject.hydrate(userRepository, metricRepository);
    expect(subject.logins.length).toBe(2);
  });
});