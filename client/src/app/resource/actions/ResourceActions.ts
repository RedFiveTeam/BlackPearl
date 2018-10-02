import { ResourceStore } from '../stores/ResourceStore';
import { Repositories } from '../../utils/Repositories';
import { Stores } from '../../utils/Stores';
import { action } from 'mobx';
import { ResourceModel } from '../ResourceModel';
import { ResourceRepository } from '../repositories/ResourceRepository';

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
}