import { MetricModel } from './MetricModel';

export interface MetricRepository {
  findAll(): Promise<MetricModel[]>;
  logMetric(metric: MetricModel): Promise<void>;
}