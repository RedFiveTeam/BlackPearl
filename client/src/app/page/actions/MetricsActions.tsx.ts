import { MetricsStore } from '../stores/MetricsStore';
import { UserRepository } from '../../component/user/UserRepository';
import { Repositories } from '../../utils/Repositories';
import { Stores } from '../../utils/Stores';
import { action } from 'mobx';

export class MetricsActions {
  private metricsStore: MetricsStore;
  private metricsRepository: UserRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.metricsStore = stores.metricsStore!;
    this.metricsRepository = repositories.userRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.metricsStore.hydrate(this.metricsRepository);
  }
}