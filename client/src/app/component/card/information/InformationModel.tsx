import { action, computed, observable } from 'mobx';

export class InformationModel {
  @observable private _id: number | null;
  @observable private _name: string = '';
  @observable private _content: string = '';

  constructor(
    id: number | null = null,
    name: string = '',
    content: string = ''
  ) {
    this._id = id;
    this._name = name;
    this._content = content;
  }

  @action.bound
  setContent(content: string) {
    this._content = content;
  }

  @computed
  get id(): number | null {
    return this._id;
  }

  @computed
  get name(): string {
    return this._name;
  }

  @computed
  get content(): string {
    return this._content;
  }
}