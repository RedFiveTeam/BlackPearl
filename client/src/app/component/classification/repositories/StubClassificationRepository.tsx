import { ClassificationRepository } from './ClassificationRepository';
import { ClassificationModel } from '../ClassificationModel';

export class StubClassificationRepository implements ClassificationRepository {

  get(): Promise<ClassificationModel> {
    return Promise.resolve(new ClassificationModel('UNCLASSIFIED'));
  }
}