import { action, computed, observable } from 'mobx';

export class ProfileModel {
  @observable private _id: number | null = null;
  @observable private _cardID: string = '';
  @observable private _specialty: number = 1;
  @observable private _sort: number = 0;
  @observable private _widgetsVisible: number = 1;
  @observable private _classification: string;

  constructor(
    id: number | null = null,
    cardID: string = '',
    specialty: number = 1,
    sort: number = 0,
    widgetsVisible: number = 1,
    classification: string
  ) {
    this._id = id;
    this._cardID = cardID;
    this._specialty = specialty;
    this._sort = sort;
    this._widgetsVisible = widgetsVisible;
    this._classification = classification;
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

  @computed
  get classification(): string {
    return this._classification;
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

  @action.bound
  setClassification(value: string) {
    this._classification = value;
  }
}