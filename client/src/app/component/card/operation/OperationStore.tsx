import { LoadingStore } from '../../loading/stores/LoadingStore';
import { action, computed, observable } from 'mobx';
import { OperationModel } from './OperationModel';

export class OperationStore extends LoadingStore {
  @observable private _operations: OperationModel[] = [];
  @observable private _pendingOperation: OperationModel | null = null;

  @action.bound
  setOperations(operations: OperationModel[]) {
    this._operations = operations;
  }

  @action.bound
  setPendingOperation(operation: OperationModel | null) {
    this._pendingOperation = operation;
  }

  @computed
  get operations(): OperationModel[] {
    return this._operations;
  }

  @computed
  get hasPendingOperation() {
    return this._pendingOperation !== null;
  }

  @computed
  get pendingOperation() {
    return this._pendingOperation;
  }
}