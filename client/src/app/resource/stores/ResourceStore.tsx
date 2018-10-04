import { ResourceModel } from '../ResourceModel';
import { action, computed, observable } from 'mobx';

export class ResourceStore {
  @observable private _resources: ResourceModel[] = [];
  @observable private _pendingResource: ResourceModel | null = null;

  @action.bound
  setResources(resources: ResourceModel[]) {
    this._resources = resources;
  }

  @action.bound
  setPendingResource(resource: ResourceModel | null) {
    this._pendingResource = resource;
  }

  @computed
  get hasPendingResource() {
    return this._pendingResource !== null;
  }

  @computed
  get resources() {
    return this._resources;
  }
}