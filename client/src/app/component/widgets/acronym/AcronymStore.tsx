import { action, computed, observable } from 'mobx';
import { AcronymModel } from './AcronymModel';

export class AcronymStore {
  @observable private _acronyms: AcronymModel[] = [];

  @action.bound
  setAcronyms(acronyms: AcronymModel[]) {
    this._acronyms = acronyms;
  }

  @computed
  get acronyms() {
    return this._acronyms;
  }
}