import { action } from 'mobx';
import moment = require('moment-timezone');
import { TimeStore } from '../TimeStore';
import { Stores } from '../../../../utils/Stores';
import { TimeRepository } from '../repositories/TimeRepository';
import { Repositories } from '../../../../utils/Repositories';

export class TimeActions {
  private timeStore: TimeStore;
  private timeRepository: TimeRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.timeStore = stores.timeStore!;
    this.timeRepository = repositories.timeRepository!;
    this.setATODay();
    setTimeout(
      async () => {
        await this.setTimezones();
        await this.setCurrentTime();
        let secondsLeft = (60 - moment(this.timeStore.time).tz('Etc/UTC').seconds()) * 1000;
        setTimeout(
          async () => {
            await this.setCurrentTime();
            setInterval(
              async () => {
                await this.setCurrentTime();
              },
              60000
            );
          },
          secondsLeft
        );
      },
      0
    );
  }

  @action.bound
  setATODay() {
    let start = moment('2018-08-22T00:00:00Z').utc();
    let days = moment(this.timeStore.time).utc().diff(start);
    days = days / (1000 * 60 * 60 * 24);
    if (days > 675) {
      days = days % 675;
      days--;
    }
    let a = String.fromCharCode(65 + (days / 26));
    let b = String.fromCharCode(65 + (days % 26));
    this.timeStore.setATODay('ATO ' + a + b);
  }

  @action.bound
  public returnCurrentTime(time: string, tz: string | null = null) {
    return tz == null ?
      moment(this.timeStore.time).utc().format('HHmm') :
      moment(this.timeStore.time).tz(tz).format('HHmm');
  }

  @action.bound
  async setCurrentTime() {
    const timeObj = await this.timeRepository.getTime();
    this.timeStore.setTime(moment(timeObj.timestamp, 'X').tz('Etc/UTC').format());
    this.setATODay();
  }

  @action.bound
  async setTimezones() {
    const timeObj = await this.timeRepository.getTime();
    this.timeStore.setZones(timeObj.zones);
  }
}