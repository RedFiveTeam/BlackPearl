import { ResourceModel } from '../ResourceModel';
import { action, computed, observable } from 'mobx';
import { LoadingStore } from '../../loading/stores/LoadingStore';
import { ClickModel } from '../ClickModel';

export class ResourceStore extends LoadingStore {
  @observable private _resources: ResourceModel[] = [];
  @observable private _pendingResource: ResourceModel | null = null;
  @observable private _pendingDelete: ResourceModel | null = null;
  @observable private _pendingEdit: ResourceModel | null = null;
  @observable private _activeTab: number = 1;
  @observable private _clicks: {} = {};

  @action.bound
  setActiveTab(tab: number) {
    this._activeTab = tab;
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
  setPendingResourceCategory(categoryID: number) {
    this._pendingResource!.setCategoryId(categoryID);
  }

  @action.bound
  setPendingResourceAccountID(accountID: string) {
    this._pendingResource!.setAccountId(accountID);
  }

  @action.bound
  setPendingDelete(resource: ResourceModel | null) {
    this._pendingDelete = resource;
  }

  @action.bound
  setPendingEdit(resource: ResourceModel | null) {
    this._pendingEdit = resource;
  }

  @action.bound
  setClicks(clicks: ClickModel[]) {
    clicks.forEach((c: ClickModel) => {
      this.resources.filter((r) => r.categoryID !== 0)
        .filter((r) => r.id === c.resourceID)
        .map((r) => r.setPosition(r.position! + c.clicks));
    });
  }

  @action.bound
  sortResourcesByPositionDesc() {
    this.setResources(
      this.resources.filter((r) => r.categoryID !== 0).slice().sort((a, b) => {
        return b.position! - a.position!;
      }).concat(this.resources.filter((r) => r.categoryID === 0))
    );
  }

  @computed
  get activeTab() {
    return this._activeTab;
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
  get hasPendingEdit() {
    return this._pendingEdit !== null;
  }

  @computed
  get resources() {
    return this._resources;
  }

  @computed
  get pendingResource() {
    return this._pendingResource;
  }

  returnResourcesInCategory(categoryID: number) {
    return this._resources.filter(r => r.categoryID === categoryID).map((obj: ResourceModel) => {
      return obj;
    });
  }

  @computed
  get pendingDelete() {
    return this._pendingDelete;
  }

  @computed
  get pendingEdit() {
    return this._pendingEdit;
  }

  @computed
  get clicks() {
    return this._clicks;
  }
}