import { MetricsStore } from '../stores/MetricsStore';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { Repositories } from '../../utils/Repositories';
import { Stores } from '../../utils/Stores';
import { action } from 'mobx';
import { MetricRepository } from '../../component/metrics/metric/MetricRepository';
import * as moment from 'moment';
import { MetricModel } from '../../component/metrics/metric/MetricModel';
import {
  DisplayInformationModel,
  DisplayUserModel,
  MetricDisplayModel
} from '../../component/metrics/metric/MetricDisplayModel';

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
    await this.buildMetrics();
  }

  @action.bound
  exportLogins() {
    const a = document.createElement('a');
    const array = ['time,cardID,action,context\r\n'];
    const file = new Blob(
      array.concat(this.metricsStore.logins.reverse().map((l: MetricModel) => {
        return moment.unix(l.time).format('MMMM Do YYYY H:mm') + 'L' +
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

  @action.bound
  async buildMetrics() {
    let users: DisplayUserModel[] = [];
    let resources: DisplayInformationModel[] = [];
    let actions: DisplayInformationModel[] = [];

    this.metricsStore.logins
      .map((m: MetricModel) => {
        if (m.action != null && m.cardID != null && m.context != null) {
          if (m.action.toString() === 'VISIT' && m.context.toString() === 'Home') {
            let nameArray = m.cardID.split('.');
            let name = nameArray[1] + ' ' + nameArray[1];
            let user: DisplayUserModel | null = users.filter((u: DisplayUserModel) => {
              return u.name === name;
            })[0];
            if (user) {
              user.setActions(user.actions + 1);
              user.setLogins(user.logins + 1);
            } else {
              user = new DisplayUserModel(name, 1, 1);
              users.push(user);
            }
          } else if (m.action.toString() === 'CLICK_RESOURCE') {
            let resource: DisplayInformationModel | null = resources.filter((r: DisplayInformationModel) => {
              return r.name === m.context;
            })[0];
            if (resource) {
              resource.setClicks(resource.clicks + 1);
            } else {
              resource = new DisplayInformationModel(m.context, 1);
              resources.push(resource);
            }
          }
        }
      });

    this.metricsStore.setDisplayData(new MetricDisplayModel(users, resources, actions));
  }
}