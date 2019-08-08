import { action, computed, observable } from 'mobx';
import { ClassificationModel } from './ClassificationModel';
import { ClassificationRepository } from './repositories/ClassificationRepository';

export class ClassificationStore {
  @observable private _classification: string;
  async hydrate(classificationRepository: ClassificationRepository) {
    let classModel: ClassificationModel = await classificationRepository.get();
    this._classification = classModel.classification;
  }

  @computed
  get classification(): string {
    return this._classification;
  }

  @action.bound
  setClassification(value: string) {
    this._classification = value;
  }

}