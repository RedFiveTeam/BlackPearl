import { computed, observable } from 'mobx';

export class OperationModel {
  @observable private _id: number | null;
  @observable private _title: string = '';
  @observable private _description: string = '';

  constructor(
    id: number | null = null,
    title: string = '',
    description: string = ''
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
  }

  @computed
  get id(): number | null {
    return this._id;
  }

  @computed
  get title(): string {
    return this._title;
  }

  @computed
  get description(): string {
    return this._description;
  }
}