import { action, computed, observable } from 'mobx';
import { LogableActions, MetricModel } from '../../component/metrics/metric/MetricModel';
import { MetricRepository } from '../../component/metrics/metric/MetricRepository';
import moment = require('moment-timezone');
import { MetricDisplayModel } from '../../component/metrics/metric/MetricDisplayModel';

export class MetricsStore {
  @observable private _logins: MetricModel[] = [];
  @observable private _displayData: MetricDisplayModel;

  async hydrate(
    metricRepository: MetricRepository
  ) {
    this._logins = await metricRepository.findAll();
  }

  @action.bound
  setDisplayData(data: MetricDisplayModel) {
    this._displayData = data;
  }

  @computed
  get logins() {
    return this._logins ? this._logins :
      [ new MetricModel(null, 0, 'loading', moment().unix(), LogableActions.VISIT, 'none') ];
  }

  @computed
  get displayData() {
    return this._displayData;
  }
}