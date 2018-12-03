import { MetricsStore } from '../stores/MetricsStore';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { Repositories } from '../../utils/Repositories';
import { Stores } from '../../utils/Stores';
import { action } from 'mobx';
import { MetricRepository } from '../../component/metrics/metric/MetricRepository';
import { MetricModel } from '../../component/metrics/metric/MetricModel';

export class MetricsActions {
  private metricsStore: MetricsStore;
  private readonly userRepository: UserRepository;
  private readonly metricRepository: MetricRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.metricsStore = stores.metricsStore!;
    this.userRepository = repositories.userRepository!;
    this.metricRepository = repositories.metricRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.metricsStore.hydrate(this.userRepository, this.metricRepository);
  }

  @action.bound
  exportLogins() {
    const a = document.createElement('a');
    const file = new Blob(
      this.metricsStore.logins.map((l: MetricModel) => {
        return l.user.id + ' | ' + l.user.name + ' | ' + l.time.toISOString() + '\r\n';
      }),
      {type: 'text/plain'}
    );
    a.href = URL.createObjectURL(file);
    a.download = 'logins.txt';
    a.click();
  }
}