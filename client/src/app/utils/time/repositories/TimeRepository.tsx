import { TimeModel } from '../TimeModel';

export interface TimeRepository {
  getTime(): Promise<TimeModel>;
}