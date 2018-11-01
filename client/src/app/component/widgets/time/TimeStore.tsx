import { action, computed, observable } from 'mobx';

export class TimeStore {
  @observable private _time: string = '';
  @observable private _atoDay: string = '';
  @observable private _zones: {}[] = [];

  @action.bound
  setTime(time: string) {
    this._time = time;
  }

  @action.bound
  setATODay(atoDay: string) {
    this._atoDay = atoDay;
  }

  @action.bound
  setZones(zones: {}[]) {
    this._zones = zones;
  }

  @computed
  get time() {
    return this._time;
  }

  @computed
  get atoDay() {
    return this._atoDay;
  }

  @computed
  get zones() {
    return this._zones;
  }
}