import { action, computed, observable } from 'mobx';

export class ResourceModel {
  @observable private _id: number | null = null;
  @observable private _url: string = '';
  @observable private _name: string = '';

  constructor(
    id: number | null = null,
    url: string = '',
    name: string = ''
  ) {
    this._id = id;
    this._url = url;
    this._name = name;
  }

  @computed
  get id(): number | null {
    return this._id;
  }

  @computed
  get name(): string {
    return this._name;
  }

  @computed
  get url(): string {
    return this._url;
  }

  @action.bound
  setId(value: number | null) {
    this._id = value;
  }

  @action.bound
  setName(value: string) {
    this._name = value;
  }

  @action.bound
  setUrl(value: string) {
    this._url = value;
  }
}