import { action, computed, observable } from 'mobx';
import { AcronymModel } from './AcronymModel';

export class AcronymStore {
  @observable private _acronyms: AcronymModel[] = [];
  @observable private _filteredAcronyms: AcronymModel[] = [];
  @observable private _pendingDelete: AcronymModel | null = null;
  @observable private _pendingAcronym: AcronymModel | null = null;
  @observable private _search: string = '';

  @action.bound
  setAcronyms(acronyms: AcronymModel[]) {
    this._acronyms = acronyms;
  }

  @action.bound
  setFilteredAcronyms(filteredAcronyms: AcronymModel[]) {
    this._filteredAcronyms = filteredAcronyms;
  }

  @action.bound
  setPendingDelete(acronym: AcronymModel | null) {
    this._pendingDelete = acronym;
  }

  @action.bound
  setSearch(value: string) {
    this._search = value;
  }

  @action.bound
  setPendingAcronym(acronym: AcronymModel | null) {
    this._pendingAcronym = acronym;
  }

  @computed
  get acronyms() {
    return this._acronyms;
  }

  @computed
  get filteredAcronyms() {
    return this._filteredAcronyms;
  }

  @computed
  get pendingDelete() {
    return this._pendingDelete;
  }

  @computed
  get search() {
    return this._search;
  }

  @computed
  get pendingAcronym() {
    return this._pendingAcronym;
  }
}