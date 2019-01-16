import { action, computed, observable } from 'mobx';

export class TimezoneModel {
  @observable private _id: number | null = null;
  @observable private _position: number = -1;
  @observable private _zone: string = 'Zulu';
  @observable private _name: string = '';

  constructor(
    id: number | null = null,
    position: number,
    zone: string,
    name: string,
  ) {
    this._id = id;
    this._position = position;
    this._zone = zone;
    this._name = name;
  }

  @action.bound
  setZone(zone: string) {
    this._zone = zone;
  }

  @action.bound
  setName(name: string) {
    this._name = name;
  }

  @action.bound
  setId(id: number) {
    this._id = id;
  }

  @action.bound
  setPosition(position: number) {
    this._position = position;
  }

  @computed
  get id() {
    return this._id;
  }

  @computed
  get position() {
    return this._position;
  }

  @computed
  get zone() {
    return this._zone;
  }

  @computed
  get name() {
    return this._name;
  }
}