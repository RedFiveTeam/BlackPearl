import { action, computed, observable } from 'mobx';

export class TimeStore {
  @observable private _time: string = '';

  @action.bound
  setTime(time: string) {
    this._time = time;
  }

  @computed
  get time() {
    return this._time;
  }
}