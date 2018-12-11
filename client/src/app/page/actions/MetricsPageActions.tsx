import { MetricsStore } from '../stores/MetricsStore';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { Repositories } from '../../utils/Repositories';
import { Stores } from '../../utils/Stores';
import { action } from 'mobx';
import { MetricRepository } from '../../component/metrics/metric/MetricRepository';
import { MetricModel } from '../../component/metrics/metric/MetricModel';
import * as moment from 'moment';

export class MetricsPageActions {
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
    const array = ['time,cardID,action,context\r\n'];
    const file = new Blob(
      array.concat(this.metricsStore.logins.reverse().map((l: MetricModel) => {
        return moment(l.time).format('MMMM Do YYYY H:mm') + 'Z' +
          ',' + l.cardID +
          ',' + l.action +
          ',' + l.context +
          '\r\n';
      })),
      {type: 'text/plain'}
    );

    a.href = URL.createObjectURL(file);
    a.download = 'logins.csv';
    a.click();
  }
}