import { MetricsStore } from '../stores/MetricsStore';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { Repositories } from '../../utils/Repositories';
import { Stores } from '../../utils/Stores';
import { action } from 'mobx';
import { LoginRepository } from '../../component/metrics/login/LoginRepository.tsx';

export class MetricsActions {
  private metricsStore: MetricsStore;
  private readonly userRepository: UserRepository;
  private readonly loginRepository: LoginRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.metricsStore = stores.metricsStore!;
    this.userRepository = repositories.userRepository!;
    this.loginRepository = repositories.loginRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.metricsStore.hydrate(this.userRepository, this.loginRepository);
  }
}