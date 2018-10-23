import { action, computed, observable } from 'mobx';
import { TimezoneModel } from '../utils/time/TimezoneModel';
import { TimeRepository } from '../utils/time/repositories/TimeRepository';

export class AdminStore {
  @observable private _timezones: TimezoneModel[];

  async hydrate(timeRepository: TimeRepository) {
    this._timezones = await timeRepository.getTimezones();
  }

  @action.bound
  setTimezoneZone(index: number, zone: string) {
    if (index < this.timezones.length) {
      this.timezones[index].setZone(zone);
    }
  }

  @action.bound
  setTimezoneName(index: number, name: string) {
    if (index < this.timezones.length) {
      this.timezones[index].setName(name);
    }
  }

  @computed
  get timezones() {
    return this._timezones;
  }
}