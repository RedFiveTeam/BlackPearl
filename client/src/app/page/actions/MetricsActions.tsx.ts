import { MetricsStore } from '../stores/MetricsStore';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { Repositories } from '../../utils/Repositories';
import { Stores } from '../../utils/Stores';
import { action } from 'mobx';

export class MetricsActions {
  private metricsStore: MetricsStore;
  private userRepository: UserRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.metricsStore = stores.metricsStore!;
    this.userRepository = repositories.userRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.metricsStore.hydrate(this.userRepository);
  }
}