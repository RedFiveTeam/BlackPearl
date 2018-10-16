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
    let julian = moment(this.timeStore.time).utc().dayOfYear() - 1;
    let a = String.fromCharCode(65 + (julian / 26));
    let b = String.fromCharCode(65 + (julian % 26));
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