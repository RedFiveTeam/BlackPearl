import { action, computed, observable } from 'mobx';

export class BlameModel {
  @observable private _id: number | null = null;
  @observable private _action: string = '';
  @observable private _name: string = '';
  @observable private _user: string = '';
  @observable private _time: number = 0;

  constructor(
    id: number | null = null,
    myAction: string = '',
    name: string = '',
    user: string = '',
    time: number = 0
  ) {
    this._id = id;
    this._action = myAction;
    this._name = name;
    this._user = user;
    this._time = time;
  }

  @computed
  get id(): number | null {
    return this._id;
  }

  @computed
  get action(): string {
    return this._action;
  }

  @computed
  get name(): string {
    return this._name;
  }

  @computed
  get user(): string {
    return this._user;
  }

  @computed
  get time(): number {
    return this._time;
  }

  @action.bound
  setId(value: number | null) {
    this._id = value;
  }

  @action.bound
  setAction(value: string) {
    this._action = value;
  }

  @action.bound
  setName(value: string) {
    this._name = value;
  }

  @action.bound
  setUser(value: string) {
    this._user = value;
  }

  @action.bound
  setTime(value: number) {
    this._time = value;
  }
}