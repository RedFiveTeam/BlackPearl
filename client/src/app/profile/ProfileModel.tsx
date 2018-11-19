import { action, computed, observable } from 'mobx';

export class ProfileModel {
  @observable private _cardID: string = '';
  @observable private _name: string = '';

  constructor(
    cardID: string = '',
    name: string = ''
  ) {
    this._cardID = cardID;
    this._name = name;
  }

  @computed
  get cardID(): string {
    return this._cardID;
  }

  @computed
  get name(): string {
    return this._name;
  }

  @action.bound
  set setName(value: string) {
    this._name = value;
  }

  @action.bound
  set setcardID(value: string) {
    this._cardID = value;
  }
}