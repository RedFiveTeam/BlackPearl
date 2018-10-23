import { TimeRepository } from './TimeRepository';

export class StubTimeRepository implements TimeRepository {
  getTime(): Promise<string> {
    return Promise.resolve(
      '1514764800' // 01/01/2018 00:00:00
    );
  }
}