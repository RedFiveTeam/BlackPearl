import { action, computed, observable } from 'mobx';

export class TimeModel {
  @observable private _timestamp: string;

  constructor(
    timestamp: string
  ) {
    this._timestamp = timestamp;
  }

  @computed
  get timestamp(): string {
    return this._timestamp;
  }

  @action.bound
  setTimestamp(value: string) {
    this._timestamp = value;
  }
}