import { ResourceStore } from '../stores/ResourceStore';
import { Repositories } from '../../../utils/Repositories';
import { Stores } from '../../../utils/Stores';
import { action } from 'mobx';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { Category, ResourceModel } from '../ResourceModel';
import { ProfileStore } from '../../../profile/ProfileStore';

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
  async setAllResources() {
    this.resourceStore.setResources(await this.resourceRepository.findAllByAccount(this.profileStore.profile.cardID));
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
    });
  }

  @action.bound
  async saveResource() {
    if (this.resourceStore.pendingResource != null) {
      await this.resourceStore.performLoading(async () => {
        await this.resourceRepository.saveResource(this.resourceStore.pendingResource!);
        this.clearPendingResource();
        await this.setAllResources();
      });
    }
  }

  @action.bound
  async saveFavorite(resource: ResourceModel) {
    await this.resourceStore.performLoading(async () => {
      await this.resourceRepository.saveResource(resource);
      await this.setAllResources();
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
      });
    }
  }

  @action.bound
  async updateGivenResources(resources: ResourceModel[]) {
    await this.resourceRepository.updateGivenResources(resources);
  }
}