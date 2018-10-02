import { ResourceModel } from '../ResourceModel';
import { action, computed, observable } from 'mobx';

export class ResourceStore {
  @observable _resources: ResourceModel[] = [];

  @action.bound
  setResources(resources: ResourceModel[]) {
    this._resources = resources;
  }

  @computed
  get resources() {
    return this._resources;
  }
}