import { OperationRepository } from '../repositories/OperationRepository';
import { OperationStore } from '../OperationStore';
import { Repositories } from '../../../../utils/Repositories';
import { Stores } from '../../../../utils/Stores';
import { action } from 'mobx';

export class OperationActions {
  private operationStore: OperationStore;
  private operationRepository: OperationRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.operationStore = stores.operationStore!;
    this.operationRepository = repositories.operationRepository!;
  }

  @action.bound
  async setupOperations() {
    this.operationStore.setOperations(await this.operationRepository.findAll());
  }
}