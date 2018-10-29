import { action, computed, observable } from 'mobx';

export class WeatherModel {
  @observable private _id: number;
  @observable private _url: string;

  constructor(
    id: number,
    url: string
  ) {
    this._id = id;
    this._url = url;
  }

  @computed
  get id(): number {
    return this._id;
  }

  @computed
  get url(): string {
    return this._url;
  }

  @action.bound
  setId(id: number) {
    this._id = id;
  }

  @action.bound
  setUrl(url: string) {
    this._url = url;
  }
}