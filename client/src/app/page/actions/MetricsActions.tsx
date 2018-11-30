import { MetricsStore } from '../stores/MetricsStore';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { Repositories } from '../../utils/Repositories';
import { Stores } from '../../utils/Stores';
import { action } from 'mobx';
import { LoginRepository } from '../../component/metrics/login/LoginRepository.tsx';
import { LoginModel } from '../../component/metrics/login/LoginModel';

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

  @action.bound
  exportLogins() {
    const a = document.createElement('a');
    const file = new Blob(
      this.metricsStore.logins.map((l: LoginModel) => {
        return l.user.id + ' | ' + l.user.name + ' | ' + l.time.toISOString() + '\r\n';
      }),
      {type: 'text/plain'}
    );
    a.href = URL.createObjectURL(file);
    a.download = 'logins.txt';
    a.click();
  }
}