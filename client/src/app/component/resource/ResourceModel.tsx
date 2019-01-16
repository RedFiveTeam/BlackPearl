import { action, computed, observable } from 'mobx';

export enum Category {
  Favorites = 0,
  FMV_Main = 1,
  FMV_SituationalAwareness = 2,
  FMV_TargetResearch = 3,
  HighAlt_Main = 4,
  HighAlt_SituationalAwareness = 5,
  HighAlt_TargetResearch = 6,
  Fusion_Main = 7,
  Fusion_SituationalAwareness = 8,
  Fusion_TargetResearch = 9,
  SIGINT_Main = 10,
  SIGINT_SituationalAwareness = 11,
  SIGINT_TargetResearch = 12
}

export enum CategoryName {
  Favorites = 'My Favorites',
  FMV_Main = 'Main',
  FMV_SituationalAwareness = 'Situational Awareness',
  FMV_TargetResearch = 'Target Research',
  HighAlt_Main = 'Main',
  HighAlt_SituationalAwareness = 'Situational Awareness',
  HighAlt_TargetResearch = 'Target Research',
  Fusion_Main = 'Main',
  Fusion_SituationalAwareness = 'Situational Awareness',
  Fusion_TargetResearch = 'Target Research',
  SIGINT_Main = 'Main',
  SIGINT_SituationalAwareness = 'Situational Awareness',
  SIGINT_TargetResearch = 'Target Research',
}

export enum Sort {
  MostClicked = 0,
  Newest = 1,
  Alphabetical = 2,
  None = 3
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
}