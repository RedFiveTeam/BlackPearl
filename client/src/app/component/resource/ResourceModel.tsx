import { action, computed, observable } from 'mobx';

export enum Category {
  Favorites = 0,
  Main = 1,
  SituationalAwareness = 2,
  TargetResearch = 3,
}

export enum CategoryName {
  Favorites = 'My Favorites',
  Main = 'Main',
  SituationalAwareness = 'Situational Awareness',
  TargetResearch = 'Target Research'
}

export class ResourceModel {
  @observable private _id: number | null = null;
  @observable private _url: string = '';
  @observable private _name: string = '';
  @observable private _categoryID: number | null = null;
  @observable private _accountID: string = '';
  @observable private _position: number | null = 0;

  constructor(
    id: number | null = null,
    url: string = '',
    name: string = '',
    categoryID: number = 1,
    accountID: string = '',
    position: number = 0
  ) {
    this._id = id;
    this._url = url;
    this._name = name;
    this._categoryID = categoryID;
    this._accountID = accountID;
    this._position = position;
  }

  @computed
  get id(): number | null {
    return this._id;
  }

  @computed
  get url(): string {
    return this._url;
  }

  @computed
  get name(): string {
    return this._name;
  }

  @computed
  get categoryID(): number | null {
    return this._categoryID;
  }

  @computed
  get accountID(): string {
    return this._accountID;
  }

  @computed
  get position(): number | null {
    return this._position;
  }

  @action.bound
  setId(value: number | null) {
    this._id = value;
  }

  @action.bound
  setUrl(value: string) {
    this._url = value;
  }

  @action.bound
  setName(value: string) {
    this._name = value;
  }

  @action.bound
  setCategoryId(value: number) {
    this._categoryID = value;
  }

  @action.bound
  setAccountId(value: string) {
    this._accountID = value;
  }

  @action.bound
  setPosition(value: number) {
    this._position = value;
  }
}