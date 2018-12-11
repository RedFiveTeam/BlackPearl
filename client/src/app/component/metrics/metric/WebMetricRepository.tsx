import { MetricModel } from './MetricModel';
import { MetricSerializer } from './MetricSerializer';
import { HTTPClient } from '../../../utils/HTTPClient';
import { MetricRepository } from './MetricRepository';

export class WebMetricRepository implements MetricRepository {
  private metricSerializer = new MetricSerializer();

  constructor(private client: HTTPClient) {
  }

  async logMetric(metric: MetricModel): Promise<void> {
    const body = JSON.stringify(this.metricSerializer.serialize(metric));
    await this.client.postJSON('/api/metrics', body);
  }

  async findAll(): Promise<MetricModel[]> {
    const json = await this.client.getJSON('/api/metrics');
    return json.map((obj: any) => {
      return this.metricSerializer.deserialize(obj);
    });
  }
}