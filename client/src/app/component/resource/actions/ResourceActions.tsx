import { ResourceStore } from '../stores/ResourceStore';
import { Repositories } from '../../../utils/Repositories';
import { Stores } from '../../../utils/Stores';
import { action } from 'mobx';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { Category, ResourceModel, Sort } from '../ResourceModel';
import { ProfileStore } from '../../../profile/ProfileStore';
import { toast } from 'react-toastify';
import * as fuzzysort from 'fuzzysort';

export class ResourceActions {
  private resourceRepository: ResourceRepository;
  private resourceStore: ResourceStore;
  private profileStore: ProfileStore;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.resourceStore = stores.resourceStore!;
    this.resourceRepository = repositories.resourceRepository!;
    this.profileStore = stores.profileStore!;
  }

  @action.bound
  async updateClicks(id: number) {
    await this.resourceRepository.updateClicks(id);
  }

  @action.bound
  async setAllResources() {
    this.resourceStore!.setUnfilteredResources(await this.resourceRepository.findAll());
    this.resourceStore.setResources(await this.resourceRepository.findAllByAccount(this.profileStore.profile.cardID));
    if (this.resourceStore.filter !== '') {
      await this.filterResources(this.resourceStore.filter);
    }
    await this.sortResources();
  }

  @action.bound
  async sortResources() {
    switch (this.profileStore.profile.sort) {
      case Sort.MostClicked:
        this.resourceStore.setClicks(await this.resourceRepository.getAllClicks());
        await this.resourceStore.sortResourcesByPositionDesc();
        break;
      case Sort.Newest:
        await this.resourceStore.sortResourcesByIdDesc();
        break;
      case Sort.Alphabetical:
        await this.resourceStore.sortResourcesByNameDesc();
        break;
      default:
        break;
    }
  }

  @action.bound
  setResources(resources: ResourceModel[]) {
    this.resourceStore.setResources(resources);
  }

  @action.bound
  clearPendingResource() {
    this.resourceStore.setPendingResource(null);
  }

  @action.bound
  createPendingResource() {
    this.resourceStore.setPendingResource(new ResourceModel());
  }

  @action.bound
  createPendingDelete(resource: ResourceModel) {
    this.resourceStore.setPendingDelete(resource);
  }

  @action.bound
  clearPendingDelete() {
    this.resourceStore.setPendingDelete(null);
  }

  @action.bound
  createPendingEdit(resource: ResourceModel) {
    this.resourceStore.setPendingEdit(resource);
  }

  @action.bound
  clearPendingEdit() {
    this.resourceStore.setPendingEdit(null);
  }

  @action.bound
  setPendingResourceCategory(categoryID: Category) {
    this.resourceStore.setPendingResourceCategory(categoryID);
  }

  @action.bound
  setPendingResourceAccountID() {
    this.resourceStore.setPendingResourceAccountID(this.profileStore.profile.cardID);
  }

  @action.bound
  async delete(resourceId: number) {
    await this.resourceStore.performLoading(async () => {
      await this.resourceRepository.delete(resourceId);
      await this.clearPendingDelete();
      await this.setAllResources();
      toast.success('Resource Link Deleted');
    });
  }

  @action.bound
  async saveResource() {
    if (this.resourceStore.pendingResource != null) {
      if (this.resourceStore.pendingResource.categoryID === 0) {
        this.resourceStore.pendingResource.setPosition(this.resourceStore.resources.length);
      }
      await this.resourceStore.performLoading(async () => {
        await this.resourceRepository.saveResource(this.resourceStore.pendingResource!);
        this.clearPendingResource();
        await this.setAllResources();
        toast.success('Resource Link Added');
      });
    }
  }

  @action.bound
  async saveFavorite(resource: ResourceModel) {
    await this.resourceStore.performLoading(async () => {
      await this.resourceRepository.saveResource(resource);
      await this.setAllResources();
      toast.success('Resource Added to Favorites');
    });
  }

  @action.bound
  updatePendingResource(title: string, url: string) {
    let resource = new ResourceModel();
    resource.setName(title);
    resource.setUrl(url);
    resource.setCategoryId(this.resourceStore!.pendingResource!.categoryID!);
    resource.setAccountId(this.profileStore!.profile.cardID);

    this.resourceStore.setPendingResource(resource);
  }

  @action.bound
  async updateResource() {
    if (this.resourceStore.pendingEdit != null) {
      await this.resourceStore.performLoading(async () => {
        await this.resourceRepository.updateResource(this.resourceStore.pendingEdit!);
        this.clearPendingEdit();
        await this.setAllResources();
        toast.success('Resource Edit Complete');
      });
    }
  }

  @action.bound
  async updateGivenResources(resources: ResourceModel[]) {
    await this.resourceRepository.updateGivenResources(resources);
  }

  @action.bound
  checkDuplicates(title: string): boolean {
    for (let r of this.resourceStore.resources) {
      if (r.name.toLowerCase() === title.toLowerCase() &&
        r.categoryID === this.resourceStore.pendingResource!.categoryID) {
        return true;
      }
    }
    return false;
  }

  @action.bound
  async filterResources(filter: string) {
    const list = this.resourceStore.resources;
    const opts = {
      keys: ['name']
    };
    let results = fuzzysort.go(filter, list, opts);
    const filteredResources = results.map((r) => {
      return r.obj;
    });
    this.resourceStore.setFilter(filter);
    this.resourceStore.setFilteredResources(filteredResources);
    await this.sortResources();
  }
}
