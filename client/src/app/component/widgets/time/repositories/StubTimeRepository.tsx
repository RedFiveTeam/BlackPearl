import { TimeRepository } from './TimeRepository';
import { TimeModel } from '../TimeModel';
import { TimezoneModel } from '../TimezoneModel';

export class StubTimeRepository implements TimeRepository {
  getTime(): Promise<TimeModel> {
    return Promise.resolve(
      new TimeModel(
        '1514764800', // 01/01/2018 00:00:00
        [
          {'id': 1, 'zone': 'America/New_York', 'name': 'LANGLEY'},
          {'id': 2, 'zone': 'America/Los_Angeles', 'name': 'PACIFIC'}
        ]
      ));
  }

  update(timezones: TimezoneModel[]): Promise<TimezoneModel[]> {
    return Promise.resolve(timezones);
  }

  getTimezones(): Promise<TimezoneModel[]> {
    return Promise.resolve([
      new TimezoneModel(1, 1, '1', '1'),
      new TimezoneModel(2, 2, '2', '2'),
      new TimezoneModel(3, 3, '3', '3'),
    ]);
  }
}