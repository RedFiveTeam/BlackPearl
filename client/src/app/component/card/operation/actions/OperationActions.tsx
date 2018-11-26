import { OperationRepository } from '../repositories/OperationRepository';
import { OperationStore } from '../OperationStore';
import { Repositories } from '../../../../utils/Repositories';
import { Stores } from '../../../../utils/Stores';
import { action } from 'mobx';
import { OperationModel } from '../OperationModel';
import { toast } from 'react-toastify';

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

  @action.bound
  createPendingOperation() {
    this.operationStore.setPendingOperation(new OperationModel());
  }

  @action.bound
  clearPendingOperation() {
    this.operationStore.setPendingOperation(null);
  }

  @action.bound
  async saveOperation() {
    if (this.operationStore.pendingOperation != null) {
      await this.operationStore.performLoading(async () => {
        await this.operationRepository.saveOperation(this.operationStore.pendingOperation!);
        this.clearPendingOperation();
        await this.setupOperations();
        toast.success('Operation Added');
      });
    }
  }

  @action.bound
  updatePendingOperation(title: string, description: string, address: string) {
    let operation = new OperationModel();
    operation.setTitle(title);
    operation.setDescription(description);
    operation.setAddress(address);

    this.operationStore.setPendingOperation(operation);
  }
}