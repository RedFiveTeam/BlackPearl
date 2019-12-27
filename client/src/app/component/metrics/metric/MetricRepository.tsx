import { MetricModel } from './MetricModel';

export interface MetricRepository {
  findAll(): Promise<MetricModel[]>;
  logMetric(metric: MetricModel): Promise<void>;
  fetchVisitCount(): Promise<number>;
  fetchUserCount(): Promise<number>;
  fetchResourceClickCount(): Promise<number>;
  fetchWidgetUseCount(): Promise<number>;
  fetchTopResources(): Promise<any[]>;
  fetchTopActions(): Promise<any[]>;
  fetchLatestActions(): Promise<MetricModel[]>;
}
