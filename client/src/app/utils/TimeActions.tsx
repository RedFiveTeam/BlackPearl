import { action } from 'mobx';
import moment = require('moment-timezone');
import { TimeStore } from './TimeStore';
import { Stores } from './Stores';

export class TimeActions {
  private timeStore: TimeStore;

  constructor(stores: Partial<Stores>) {
    this.timeStore = stores.timeStore!;
    this.setCurrentTime();
    setInterval(() => { this.setCurrentTime(); }, 1000);
  }

  @action.bound
  public returnATODay() {
    let start = moment('2018-08-22T00:00:00Z').utc();
    let days = moment(this.timeStore.time).utc().diff(start);
    days = days / (1000 * 60 * 60 * 24);
    if (days > 675) {
      days = days % 675;
      days--;
    }
    let a = String.fromCharCode(65 + (days / 26));
    let b = String.fromCharCode(65 + (days % 26));
    return 'ATO ' + a + b;
  }

  @action.bound
  public returnCurrentTime(time: string, tz: string | null = null) {
    return tz == null ?
      moment(this.timeStore.time).utc().format('HHmm') :
      moment(this.timeStore.time).tz(tz).format('HHmm');
  }

  @action.bound
  public setCurrentTime() {
    this.timeStore.setTime(moment().tz('Etc/UTC').format());
  }
}