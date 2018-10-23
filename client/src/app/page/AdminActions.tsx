import { action } from 'mobx';
import { AdminStore } from './AdminStore';
import { TimeRepository } from '../utils/time/repositories/TimeRepository';
import { Stores } from '../utils/Stores';
import { Repositories } from '../utils/Repositories';

export class AdminActions {
  private adminStore: AdminStore;
  private timeRepository: TimeRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.adminStore = stores.adminStore!;
    this.timeRepository = repositories.timeRepository!;
  }

  @action.bound
  async initializeTimeStore() {
    await this.adminStore.hydrate(this.timeRepository);
  }

  @action.bound
  async submitChanges() {
    await this.timeRepository.update(this.adminStore.timezones);
  }
}
