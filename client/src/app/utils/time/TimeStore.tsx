import { action, computed, observable } from 'mobx';

export class TimeStore {
  @observable private _time: string = '';
  @observable private _atoDay: string = '';

  @action.bound
  setTime(time: string) {
    this._time = time;
  }

  @action.bound
  setATODay(atoDay: string) {
    this._atoDay = atoDay;
  }

  @computed
  get time() {
    return this._time;
  }

  @computed
  get atoDay() {
    return this._atoDay;
  }
}