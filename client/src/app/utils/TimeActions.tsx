import { action } from 'mobx';
import moment = require('moment');

export class TimeActions {
  @action.bound
  public returnATODay(julian: number | null = null) {
    julian = julian == null ? moment().utc().dayOfYear() : julian;
    julian--;
    let a = String.fromCharCode(65 + (julian / 26));
    let b = String.fromCharCode(65 + (julian % 26));
    return 'ATO ' + a + b;
  }
}