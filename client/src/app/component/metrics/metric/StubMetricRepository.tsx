import { LogableActions, MetricModel } from './MetricModel';
import * as moment from 'moment';
import { MetricRepository } from './MetricRepository';

export class StubMetricRepository implements MetricRepository {
  findAll(): Promise<MetricModel[]> {
    return Promise.resolve([
      new MetricModel(
        1,
        0,
        'GUEST.GUEST.GUEST.0123456789',
        moment('2018-08-22T00:00:00.000Z').utc().unix(),
        LogableActions.VISIT,
        'Home'
      ),
      new MetricModel(
        2,
        0,
        'GUEST.GUEST.GUEST.0123456789',
        moment('2018-08-22T00:00:00.000Z').utc().unix(),
        LogableActions.CLICK_RESOURCE,
        'https://www.google.com'
      )
    ]);
  }

  logMetric(metric: MetricModel): Promise<void> {
    return Promise.resolve();
  }
}