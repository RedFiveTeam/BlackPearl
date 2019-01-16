import { action, computed, observable } from 'mobx';

export class TimeModel {
  @observable private _timestamp: string;
  @observable private _zones: {}[];

  constructor(
    timestamp: string,
    zones: {}[]
  ) {
    this._timestamp = timestamp;
    this._zones = zones;
  }

  @action.bound
  setTimestamp(value: string) {
    this._timestamp = value;
  }

  @action.bound
  setZones(zones: {}[]) {
    this._zones = zones;
  }

  @computed
  get timestamp(): string {
    return this._timestamp;
  }

  @computed
  get zones(): {}[] {
    return this._zones;
  }
}