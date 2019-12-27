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

  fetchVisitCount(): Promise<number> {
    return Promise.resolve(3);
  }

  fetchUserCount(): Promise<number> {
    return Promise.resolve(12);
  }

  fetchResourceClickCount(): Promise<number> {
    return Promise.resolve(30);
  }

  fetchWidgetUseCount(): Promise<number> {
    return Promise.resolve(15);
  }

  fetchTopResources(): Promise<any[]> {
    return Promise.resolve([
      {name: 'top resource 1', clicks: 11111},
      {name: 'top resource 5', clicks: 5},
      {name: 'top resource 3', clicks: 333},
      {name: 'top resource 2', clicks: 2222},
      {name: 'top resource 4', clicks: 44},
    ]);
  }

  fetchTopActions(): Promise<any[]> {
    return Promise.resolve([
      {name: 'top actions 1', clicks: 11111},
      {name: 'top actions 5', clicks: 5},
      {name: 'top actions 3', clicks: 333},
      {name: 'top actions 2', clicks: 2222},
      {name: 'top actions 4', clicks: 44},
    ]);
  }

  fetchLatestActions(): Promise<MetricModel[]> {
    let metrics: MetricModel[] = [];
    for (let i = 0; i < 50; i++) {
      metrics.push(new MetricModel(i, i, `first.m.last.${i}`, i, 1, `${i}`));
    }
    return Promise.resolve(metrics);
  }
}