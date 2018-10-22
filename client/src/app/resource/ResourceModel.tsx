import { action, computed, observable } from 'mobx';

export enum Category {
  Main = 1,
  SituationalAwareness = 2,
  TargetResearch = 3,
}

export enum CategoryName {
  Main = 'Main',
  SituationalAwareness = 'Situational Awareness',
  TargetResearch = 'Target Research'
}

export class ResourceModel {
  @observable private _id: number | null = null;
  @observable private _url: string = '';
  @observable private _name: string = '';
  @observable private _categoryID: number | null = null;

  constructor(
    id: number | null = null,
    url: string = '',
    name: string = '',
    categoryID: number = 1
  ) {
    this._id = id;
    this._url = url;
    this._name = name;
    this._categoryID = categoryID;
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

  @computed
  get categoryID(): number | null {
    return this._categoryID;
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

  @action.bound
  setCategoryId(value: number) {
    this._categoryID = value;
  }
}