import { ResourceModel } from '../ResourceModel';
import { action, computed, observable } from 'mobx';
import { NotificationStore } from '../../component/stores/NotificationStore';

export class ResourceStore extends NotificationStore {
  @observable private _resources: ResourceModel[] = [];
  @observable private _pendingResource: ResourceModel | null = null;
  @observable private _pendingDelete: ResourceModel | null = null;

  constructor() {
    super();
  }

  @action.bound
  setResources(resources: ResourceModel[]) {
    this._resources = resources;
  }

  @action.bound
  setPendingResource(resource: ResourceModel | null) {
    this._pendingResource = resource;
  }

  @action.bound
  setPendingDelete(resource: ResourceModel | null) {
    this._pendingDelete = resource;
  }

  @computed
  get hasPendingResource() {
    return this._pendingResource !== null;
  }

  @computed
  get hasPendingDelete() {
    return this._pendingDelete !== null;
  }

  @computed
  get resources() {
    return this._resources;
  }

  @computed
  get pendingResource() {
    return this._pendingResource;
  }

  @computed
  get pendingDelete() {
    return this._pendingDelete;
  }
}