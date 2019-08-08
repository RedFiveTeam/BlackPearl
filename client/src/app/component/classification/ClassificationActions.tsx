import { ClassificationStore } from './ClassificationStore';
import { ClassificationRepository } from './repositories/ClassificationRepository';
import { Repositories } from '../../utils/Repositories';
import { Stores } from '../../utils/Stores';
import { action } from 'mobx';

export class ClassificationActions {
  private classificationStore: ClassificationStore;
  private readonly classificationRepository: ClassificationRepository;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.classificationStore = stores.classificationStore!;
    this.classificationRepository = repositories.classificationRepository!;
  }

  @action.bound
  async initializeStore() {
    await this.classificationStore.hydrate(this.classificationRepository);
  }
}