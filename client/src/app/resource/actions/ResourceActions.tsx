import { ResourceStore } from '../stores/ResourceStore';
import { Repositories } from '../../utils/Repositories';
import { Stores } from '../../utils/Stores';
import { action } from 'mobx';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { ResourceModel } from '../ResourceModel';

export class ResourceActions {
  private resourceRepository: ResourceRepository;
  private resourceStore: ResourceStore;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.resourceStore = stores.resourceStore!;
    this.resourceRepository = repositories.resourceRepository!;
  }

  @action.bound
  async setAllResources() {
    this.resourceStore.setResources(await this.resourceRepository.findAll());
  }

  @action.bound
  setResources(resources: ResourceModel[]) {
    this.resourceStore.setResources(resources);
  }

  @action.bound
  async setResourcesInCategory(categoryID: number) {
    this.resourceStore.setResources(await this.resourceRepository.findResourcesForCategory(categoryID));
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
  async delete(resourceId: number) {
    await this.resourceRepository.delete(resourceId);
    await this.clearPendingDelete();
    await this.setAllResources();
  }

  @action.bound
  async saveResource() {
    if (this.resourceStore.pendingResource != null) {
      await this.resourceRepository.saveResource(this.resourceStore.pendingResource!);
      this.clearPendingResource();
      await this.setAllResources();
    }
  }

  @action.bound
  updatePendingResource(title: string, url: string) {
    let resource = new ResourceModel();
    resource.setName(title);
    resource.setUrl(url);

    this.resourceStore.setPendingResource(resource);
  }

  @action.bound
  async updateResource() {
    if (this.resourceStore.pendingEdit != null) {
      await this.resourceRepository.updateResource(this.resourceStore.pendingEdit);
      this.clearPendingEdit();
      await this.setAllResources();
    }
  }
}