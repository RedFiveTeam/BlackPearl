import { action, computed, observable } from 'mobx';

export class AcronymStore {
  @observable private _acronyms: string[] = [];
  @observable private _filteredAcronyms: (string|null)[] = [];

  @action.bound
  setAcronyms(acronyms: string[]) {
    this._acronyms = acronyms;
  }

  @action.bound
  setFilteredAcronyms(filteredAcronyms: (string|null)[]) {
    this._filteredAcronyms = filteredAcronyms;
  }

  @computed
  get acronyms() {
    return this._acronyms;
  }

  @computed
  get filteredAcronyms() {
    return this._filteredAcronyms;
  }
}