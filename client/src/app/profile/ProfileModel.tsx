import { action, computed, observable } from 'mobx';

export class ProfileModel {
  @observable private _cardId: string = '';
  @observable private _name: string = '';

  constructor(
    cardId: string = '',
    name: string = ''
  ) {
    this._cardId = cardId;
    this._name = name;
  }

  @computed
  get cardId(): string {
    return this._cardId;
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
  set setCardId(value: string) {
    this._cardId = value;
  }
}