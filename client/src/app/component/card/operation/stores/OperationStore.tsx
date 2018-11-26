import { LoadingStore } from '../../../loading/stores/LoadingStore';
import { action, computed, observable } from 'mobx';
import { OperationModel } from '../OperationModel';

export class OperationStore extends LoadingStore {
  @observable private _operations: OperationModel[] = [];
  @observable private _pendingOperation: OperationModel | null = null;
  @observable private _pendingEdit: OperationModel | null = null;
  @observable private _pendingDelete: OperationModel | null = null;

  @action.bound
  setOperations(operations: OperationModel[]) {
    this._operations = operations;
  }

  @action.bound
  setPendingOperation(operation: OperationModel | null) {
    this._pendingOperation = operation;
  }

  @action.bound
  setPendingEdit(operation: OperationModel | null) {
    this._pendingEdit = operation;
  }

  @action.bound
  setPendingDelete(operation: OperationModel| null) {
    this._pendingDelete = operation;
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

  @computed
  get hasPendingEdit() {
    return this._pendingEdit !== null;
  }

  @computed
  get hasPendingDelete() {
    return this._pendingDelete !== null;
  }

  @computed
  get pendingEdit() {
    return this._pendingEdit;
  }

  @computed
  get pendingDelete() {
    return this._pendingDelete;
  }
}