import { StubMetricRepository } from '../../component/metrics/metric/StubMetricRepository';
import { MetricsPageActions } from './MetricsPageActions';
import { MetricRepository } from '../../component/metrics/metric/MetricRepository';

describe('MetricsPageActions', () => {
  let subject: MetricsPageActions;
  let metricRepository: MetricRepository;
  let metricsStore: any;

  beforeEach(() => {
    metricsStore = {
      hydrate: jest.fn(),
      logins: [{'action': 'none'}],
      actions: [{'context': 'none'}],
      setDisplayData: jest.fn()
    };

    metricRepository = new StubMetricRepository();
    subject = new MetricsPageActions({metricsStore}, { metricRepository: metricRepository});
  });

  it('should hydrate the store on initialize', async () => {
    await subject.initializeStores();
    expect(metricsStore.hydrate).toHaveBeenCalledWith(metricRepository);
  });
});