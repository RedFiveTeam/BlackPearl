import { MetricsStore } from '../stores/MetricsStore';
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
  private readonly metricRepository: MetricRepository;

  constructor(stores: Partial<Stores>, repositories: Partial<Repositories>) {
    this.metricsStore = stores.metricsStore!;
    this.metricRepository = repositories.metricRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.metricsStore.hydrate(this.metricRepository);
  }

  @action.bound
  async exportLogins() {
    const a = document.createElement('a');
    const array = ['time,cardID,action,context\r\n'];
    const actions = await this.metricRepository.findAll();
    const file = new Blob(
      array.concat(
        actions
          .slice()
          .reverse()
          .map(
            (l: MetricModel) => {
              return moment.unix(l.time).format('MMMM Do YYYY H:mm') + 'L' +
                ',' + l.cardID +
                ',' + l.action +
                ',' + l.context +
                '\r\n';
            }
          )
      ),
      {type: 'text/plain'}
    );

    a.href = URL.createObjectURL(file);
    a.download = 'logins.csv';
    a.click();
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(file, 'login.csv');
    }
  }

  @action.bound
  async buildDisplayableMetrics() {
    let users: DisplayUserModel[] = [];
    let resources: DisplayInformationModel[] = [];
    let actions: DisplayInformationModel[] = [];

    this.metricsStore.latestActions
      .map((m: MetricModel) => {
        if (m.action != null && m.cardID != null && m.context != null) {
          if (m.action.toString() === 'VISIT' && m.context.toString() === 'Home') {
            let user: DisplayUserModel | null = users.filter((u: DisplayUserModel) => {
              return u.cardID === m.cardID;
            })[0];
            if (user) {
              user.setActions(user.actions + 1);
              user.setLogins(user.logins + 1);
            } else {
              let nameArray = m.cardID.split('.');
              let name = nameArray[1] + ' ' + nameArray[1];
              user = new DisplayUserModel(name, 1, 1, m.cardID);
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
          if (m.action.toString() === 'CLICK_ACRONYM'
            || m.action.toString() === 'CLICK_WEATHER'
            || m.action.toString() === 'CLICK_COORD'
            || m.action.toString() === 'CLICK_RESOURCE'
            || m.action.toString() === 'ADD_FAVORITE'
            || m.action.toString() === 'EDIT_RESOURCE'
            || m.action.toString() === 'DELETE_RESOURCE'
            || m.action.toString() === 'ADD_RESOURCE'
            || m.action.toString() === 'CLICK_OP'
            || m.action.toString() === 'ADD_OP'
            || m.action.toString() === 'EDIT_OP'
            || m.action.toString() === 'DELETE_OP') {
            let name = m.action.toString();
            switch (name) {
              case 'CLICK_ACRONYM': {
                name = 'Find Acronym';
                break;
              }
              case 'CLICK_COORD': {
                name = 'Convert Coordinates';
                break;
              }
              case 'CLICK_RESOURCE': {
                name = 'Click Resource';
                break;
              }
              case 'ADD_FAVORITE': {
                name = 'Add Favorite';
                break;
              }
              case 'CLICK_WEATHER': {
                name = 'Click Weather';
                break;
              }
              case 'ADD_RESOURCE': {
                name = 'Add Resource';
                break;
              }
              case 'EDIT_RESOURCE': {
                name = 'Edit Resource';
                break;
              }
              case 'DELETE_RESOURCE': {
                name = 'Delete Resource';
                break;
              }
              case 'CLICK_OP': {
                name = 'Click OP';
                break;
              }
              case 'ADD_OP': {
                name = 'Add OP';
                break;
              }
              case 'EDIT_OP': {
                name = 'Edit OP';
                break;
              }
              case 'DELETE_OP': {
                name = 'Delete OP';
                break;
              }
              default: {
                break;
              }
            }
            let item: DisplayInformationModel | null = actions.filter((a: DisplayInformationModel) => {
              return a.name === name;
            })[0];
            if (item) {
              item.setClicks(item.clicks + 1);
            } else {
              item = new DisplayInformationModel(name, 1);
              actions.push(item);
            }
          }
        }
      });

    this.metricsStore.setDisplayData(new MetricDisplayModel(users, resources, actions));
  }
}