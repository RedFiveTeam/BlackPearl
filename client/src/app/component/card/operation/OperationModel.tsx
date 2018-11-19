import { action, computed, observable } from 'mobx';

export class OperationModel {
  @observable private _id: number | null;
  @observable private _title: string = '';
  @observable private _description: string = '';
  @observable private _address: string = '';

  constructor(
    id: number | null = null,
    title: string = '',
    description: string = '',
    address: string = ''
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._address = address;
  }

  @computed
  get id(): number | null {
    return this._id;
  }

  @computed
  get title(): string {
    return this._title;
  }

  @computed
  get description(): string {
    return this._description;
  }

  @computed
  get address(): string {
    return this._address;
  }

  @action.bound
  setId(value: number | null) {
    this._id = value;
  }

  @action.bound
  setTitle(value: string) {
    this._title = value;
  }

  @action.bound
  setDescription(value: string) {
    this._description = value;
  }

  @action.bound
  setAddress(value: string) {
    this._address = value;
  }
}