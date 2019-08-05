import { observable } from 'mobx';

export class ClassificationModel {

  @observable private _classification: string;

  constructor(classification: string) {
    this._classification = classification;
  }

  get classification(): string {
    return this._classification;
  }

  set classification(value: string) {
    this._classification = value;
  }
}