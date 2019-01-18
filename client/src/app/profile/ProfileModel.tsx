import { action, computed, observable } from 'mobx';

export class ProfileModel {
  @observable private _id: number | null = null;
  @observable private _cardID: string = '';
  @observable private _name: string = '';
  @observable private _specialty: number = 1;
  @observable private _sort: number = 0;
  @observable private _widgetsVisible: number = 1;

  constructor(
    id: number | null = null,
    cardID: string = '',
    name: string = '',
    specialty: number = 1,
    sort: number = 0,
    widgetsVisible: number = 1
  ) {
    this._id = id;
    this._cardID = cardID;
    this._name = name;
    this._specialty = specialty;
    this._sort = sort;
    this._widgetsVisible = widgetsVisible;
  }

  @computed
  get id(): number | null {
    return this._id;
  }

  @computed
  get cardID(): string {
    return this._cardID;
  }

  @computed
  get name(): string {
    return this._name;
  }

  @computed
  get specialty(): number {
    return this._specialty;
  }

  @computed
  get sort(): number {
    return this._sort;
  }

  @computed
  get widgetsVisible(): number {
    return this._widgetsVisible;
  }

  @action.bound
  setName(value: string) {
    this._name = value;
  }

  @action.bound
  setCardID(value: string) {
    this._cardID = value;
  }

  @action.bound
  setSpecialty(value: number) {
    this._specialty = value;
  }

  @action.bound
  setSort(value: number) {
    this._sort = value;
  }

  @action.bound
  setWidgetsVisible(value: number) {
    this._widgetsVisible = value;
  }
}