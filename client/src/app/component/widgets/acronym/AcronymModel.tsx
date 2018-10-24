import { action, computed, observable } from 'mobx';

export class AcronymModel {
  @observable private _id: number | null = null;
  @observable private _acronym: string = '';
  @observable private _definition: string = '';

  constructor(
    id: number | null = null,
    acronym: string = '',
    definition: string = '',
  ) {
    this._id = id;
    this._acronym = acronym;
    this._definition = definition;
  }

  @computed
  get id(): number | null {
    return this._id;
  }

  @computed
  get acronym(): string {
    return this._acronym;
  }

  @computed
  get definition(): string {
    return this._definition;
  }

  @action.bound
  setDefinition(value: string) {
    this._definition = value;
  }

  @action.bound
  setAcronym(value: string) {
    this._acronym = value;
  }

  @action.bound
  setId(value: number | null) {
    this._id = value;
  }
}