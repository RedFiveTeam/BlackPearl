import { MetricsStore } from './MetricsStore';
import { StubMetricRepository } from '../../component/metrics/metric/StubMetricRepository';
import { MetricRepository } from '../../component/metrics/metric/MetricRepository';

describe('MetricsStore', () => {
  let subject: MetricsStore;
  let metricRepository: MetricRepository;

  beforeEach(() => {
    metricRepository = new StubMetricRepository();
    subject = new MetricsStore();
  });

  it('should set the logins on hydrate', async () => {
    await subject.hydrate(metricRepository);
    expect(subject.logins.length).toBe(2);
  });
});