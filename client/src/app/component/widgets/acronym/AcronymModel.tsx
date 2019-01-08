import { action, computed, observable } from 'mobx';

export class AcronymModel {
  @observable private _id: number | null = null;
  @observable private _acronym: string = '';
  @observable private _definition: string = '';
  @observable private _printString: string = '';

  constructor(
    id: number | null = null,
    acronym: string = '',
    definition: string = '',
    printString: string = ''
  ) {
    this._id = id;
    this._acronym = acronym;
    this._definition = definition;
    this._printString = printString;
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

  @computed
  get printString(): string {
    return this._printString !== '' ? this._printString : this._acronym + ' - ' + this._definition;
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

  @action.bound
  setPrintString(value: string) {
    this._printString = value;
  }
}