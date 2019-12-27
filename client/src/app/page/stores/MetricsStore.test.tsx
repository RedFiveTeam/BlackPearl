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

  it('should set the last 50 actions on hydrate', async () => {
    await subject.hydrate(metricRepository);
    expect(subject.latestActions.length).toBe(50);
  });

  it('should set total visits on hydrate', async () => {
    await subject.hydrate(metricRepository);
    expect(subject.visitCount).toBe(3);
  });

  it('should set total users on hydrate', async () => {
    await subject.hydrate(metricRepository);
    expect(subject.userCount).toBe(12);
  });

  it('should set resource clicks on hydrate', async () => {
    await subject.hydrate(metricRepository);
    expect(subject.resourceClickCount).toBe(30);
  });

  it('should set widget uses on hydrate', async () => {
    await subject.hydrate(metricRepository);
    expect(subject.widgetUseCount).toBe(15);
  });

  it('should set sorted top resources on hydrate', async () => {
    await subject.hydrate(metricRepository);
    expect(subject.topResources.length).toBe(5);
    expect(subject.topResources[0].clicks).toBe(11111);
    expect(subject.topResources[4].clicks).toBe(5);
  });

  it('should set sorted top actions on hydrate', async () => {
    await subject.hydrate(metricRepository);
    expect(subject.topActions.length).toBe(5);
    expect(subject.topActions[0].clicks).toBe(11111);
    expect(subject.topActions[4].clicks).toBe(5);
  });
});