import { ClassificationModel } from '../ClassificationModel';

export interface ClassificationRepository {
  get(): Promise<ClassificationModel>;
}