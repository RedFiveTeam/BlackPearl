import { TimeModel } from '../TimeModel';
import { TimezoneModel } from '../TimezoneModel';

export interface TimeRepository {
  getTime(): Promise<TimeModel>;
  update(timezones: TimezoneModel[]): Promise<TimezoneModel[]>;
  getTimezones(): Promise<TimezoneModel[]>;
}