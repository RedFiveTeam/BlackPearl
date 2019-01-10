import { action, computed, observable } from 'mobx';

export class DisplayUserModel {
  @observable private _cardID: string;
  @observable private _name: string;
  @observable private _logins: number;
  @observable private _actions: number;

  constructor(
    name: string = '',
    logins: number = 0,
    actions: number = 0,
    cardID: string = '',
  ) {
    this._cardID = cardID;
    this._name = name;
    this._logins = logins;
    this._actions = actions;
  }

  @action.bound
  setActions(value: number) {
    this._actions = value;
  }

  @action.bound
  setLogins(value: number) {
    this._logins = value;
  }

  @action.bound
  setName(value: string) {
    this._name = value;
  }

  @action.bound
  setCardID(value: string) {
    this._cardID = value;
  }

  @computed
  get actions(): number {
    return this._actions;
  }

  @computed
  get logins(): number {
    return this._logins;
  }

  @computed
  get name(): string {
    return this._name;
  }

  @computed
  get cardID(): string {
    return this._cardID;
  }
}

export class DisplayInformationModel {
  @observable private _name: string;
  @observable private _clicks: number;

  constructor(
    name: string = '',
    clicks: number = 0
  ) {
    this._name = name;
    this._clicks = clicks;
  }

  @computed
  get name(): string {
    return this._name;
  }

  @computed
  get clicks(): number {
    return this._clicks;
  }

  @action.bound
  setName(value: string) {
    this._name = value;
  }

  @action.bound
  setClicks(value: number) {
    this._clicks = value;
  }
}

export class MetricDisplayModel {
  @observable private _users: DisplayUserModel[];
  @observable private _resources: DisplayInformationModel[];
  @observable private _actions: DisplayInformationModel[];

  constructor(
    users: DisplayUserModel[] = [],
    resources: DisplayInformationModel[] = [],
    actions: DisplayInformationModel[] = []
  ) {
    this._users = users;
    this._resources = resources;
    this._actions = actions;
  }

  @action.bound
  setUsers(value: DisplayUserModel[]) {
    this._users = value;
  }

  @action.bound
  setResources(value: DisplayInformationModel[]) {
    this._resources = value;
  }

  @action.bound
  setActions(value: DisplayInformationModel[]) {
    this._actions = value;
  }

  @computed
  get users(): DisplayUserModel[] {
    return this._users;
  }

  @computed
  get resources(): DisplayInformationModel[] {
    return this._resources;
  }

  @computed
  get actions(): DisplayInformationModel[] {
    return this._actions;
  }
}