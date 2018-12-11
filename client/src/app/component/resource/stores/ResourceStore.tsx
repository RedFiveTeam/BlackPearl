import { ResourceModel } from '../ResourceModel';
import { action, computed, observable } from 'mobx';
import { LoadingStore } from '../../loading/stores/LoadingStore';
import { ClickModel } from '../ClickModel';

export class ResourceStore extends LoadingStore {
  @observable private _resources: ResourceModel[] = [];
  @observable private _filteredResources: ResourceModel[] = [];
  @observable private _pendingResource: ResourceModel | null = null;
  @observable private _pendingDelete: ResourceModel | null = null;
  @observable private _pendingEdit: ResourceModel | null = null;
  @observable private _activeTab: number = 1;
  @observable private _clicks: {} = {};
  @observable private _filter: string = '';

  @action.bound
  setActiveTab(tab: number) {
    this._activeTab = tab;
  }

  @action.bound
  setResources(resources: ResourceModel[]) {
    this._resources = resources;
    if (this._filter === '') {
      this._filteredResources = [];
    }
  }

  @action.bound
  setFilteredResources(resources: ResourceModel[]) {
    this._filteredResources = resources;
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
  setFilter(value: string) {
    this._filter = value;
  }

  @action.bound
  setClicks(clicks: ClickModel[]) {
    this.resources.filter((r) => r.categoryID !== 0).map((r) => { r.setPosition(0); });
    clicks.forEach((c: ClickModel) => {
      this.resources.filter((r) => r.categoryID !== 0)
        .filter((r) => r.id === c.resourceID)
        .map((r) => r.setPosition(r.position! + c.clicks));
    });
  }

  @action.bound
  sortResourcesByPositionDesc() {
    const resources = this._filteredResources.length > 0 || this._filter.length > 0 ?
      this._filteredResources : this._resources;
    this.setFilteredResources(
      resources.filter((r) => r.categoryID !== 0).slice().sort((a, b) => {
        return b.position! - a.position!;
      }).concat(this.resources.filter((r) => r.categoryID === 0))
    );
  }

  @action.bound
  sortResourcesByIdDesc() {
    const resources = this._filteredResources.length > 0 || this._filter.length > 0 ?
      this._filteredResources : this._resources;
    this.setFilteredResources(
      resources.filter((r) => r.categoryID !== 0).slice().sort((a, b) => {
        return b.id! - a.id!;
      }).concat(this.resources.filter((r) => r.categoryID === 0))
    );
  }

  @action.bound
  sortResourcesByNameDesc() {
    const resources = this._filteredResources.length > 0 || this._filter.length > 0 ?
      this._filteredResources : this._resources;
    this.setFilteredResources(
      resources.filter((r) => r.categoryID !== 0).slice().sort((a, b) => {
        let name1 = a.name!.toLowerCase();
        let name2 = b.name!.toLowerCase();
        return name1 < name2 ? -1 : (name1 > name2 ? 1 : 0);
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

  @computed
  get filteredResources() {
    return this._filteredResources;
  }

  @computed
  get filter() {
    return this._filter;
  }

  returnResourcesInCategory(categoryID: number) {
    const resources = (this._filteredResources.length > 0 || this._filter.length > 0)  && categoryID > 0 ?
      this._filteredResources : this._resources;
    return resources.filter(r => r.categoryID === categoryID).map((obj: ResourceModel) => {
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