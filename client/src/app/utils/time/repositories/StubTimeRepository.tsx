import { TimeRepository } from './TimeRepository';
import { TimeModel } from '../TimeModel';

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
}