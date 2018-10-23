import { action, computed, observable } from 'mobx';

export class TimeModel {
  @observable private _timeStamp: string;

  constructor(
    timeStamp: string
  ) {
    this._timeStamp = timeStamp;
  }

  @computed
  get timeStamp(): string {
    return this._timeStamp;
  }

  @action.bound
  setTimeStamp(value: string) {
    this._timeStamp = value;
  }
}