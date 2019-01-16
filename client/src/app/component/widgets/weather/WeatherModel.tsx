import { action, computed, observable } from 'mobx';

export class WeatherModel {
  @observable private _id: number;
  @observable private _url: string;
  @observable private _label: string;

  constructor(
    id: number,
    url: string,
    label: string
  ) {
    this._id = id;
    this._url = url;
    this._label = label;
  }

  @action.bound
  setId(id: number) {
    this._id = id;
  }

  @action.bound
  setUrl(url: string) {
    this._url = url;
  }

  @action.bound
  setLabel(label: string) {
    this._label = label;
  }

  @computed
  get id(): number {
    return this._id;
  }

  @computed
  get url(): string {
    return this._url;
  }

  @computed
  get label(): string {
    return this._label;
  }
}