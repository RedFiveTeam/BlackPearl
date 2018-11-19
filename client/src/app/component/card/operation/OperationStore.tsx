import { LoadingStore } from '../../loading/stores/LoadingStore';
import { action, computed, observable } from 'mobx';
import { OperationModel } from './OperationModel';

export class OperationStore extends LoadingStore {
  @observable private _operations: OperationModel[] = [];

  @action.bound
  setOperations(operations: OperationModel[]) {
    this._operations = operations;
  }

  @computed
  get operations(): OperationModel[] {
    return this._operations;
  }
}