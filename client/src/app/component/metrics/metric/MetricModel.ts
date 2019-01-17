import { action, computed, observable } from 'mobx';

export enum LogableActions {
  VISIT,
  ADD_RESOURCE,
  EDIT_RESOURCE,
  DELETE_RESOURCE,
  CLICK_RESOURCE,
  ADD_OP,
  EDIT_OP,
  DELETE_OP,
  CLICK_OP,
  CLICK_ACRONYM,
  CLICK_WEATHER,
  CLICK_COORD,
  ADD_FAVORITE,
  CLICK_MEASUREMENT
}

export class MetricModel {
  @observable private _id: number | null = null;
  @observable private _userID: number = 0;
  @observable private _cardID: string = '';
  @observable private _time: number = 0;
  @observable private _actionEnum: number = 0;
  @observable private _context: string = '';

  constructor(
    id: number | null = null,
    userID: number = 0,
    cardID: string = '',
    time: number = 0,
    actionEnum: number = 0,
    context: string = ''
  ) {
    this._id = id;
    this._userID = userID;
    this._cardID = cardID;
    this._time = time;
    this._actionEnum = actionEnum;
    this._context = context;
  }

  @computed
  get id(): number | null {
    return this._id;
  }

  @computed
  get userID(): number {
    return this._userID;
  }

  @computed
  get cardID(): string {
    return this._cardID;
  }

  @computed
  get time(): number {
    return this._time;
  }

  @computed
  get action(): number {
    return this._actionEnum;
  }

  @computed
  get context(): string {
    return this._context;
  }

  @action.bound
  setId(value: number | null) {
    this._id = value;
  }

  @action.bound
  setUserID(value: number) {
    this._userID = value;
  }

  @action.bound
  setCardID(value: string) {
    this._cardID = value;
  }

  @action.bound
  setTime(value: number) {
    this._time = value;
  }

  @action.bound
  setAction(value: number) {
    this._actionEnum = value;
  }

  @action.bound
  setContext(value: string) {
    this._context = value;
  }
}