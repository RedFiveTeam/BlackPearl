import { action, computed, observable } from 'mobx';
import { MetricModel } from '../../component/metrics/metric/MetricModel';
import { MetricRepository } from '../../component/metrics/metric/MetricRepository';
import { MetricDisplayModel } from '../../component/metrics/metric/MetricDisplayModel';

export class MetricsStore {
  @observable private _visitCount: number = -1;
  @observable private _userCount: number = -1;
  @observable private _displayData: MetricDisplayModel;
  @observable private _resourceClickCount: number = -1;
  @observable private _widgetUseCount: number = -1;
  @observable private _topResources: any[] = [];
  @observable private _topActions: any[] = [];
  @observable private _latestActions: MetricModel[] = [];

  async hydrate(metricRepository: MetricRepository) {
    this._visitCount = await metricRepository.fetchVisitCount();
    this._userCount = await metricRepository.fetchUserCount();
    this._resourceClickCount = await metricRepository.fetchResourceClickCount();
    this._widgetUseCount = await metricRepository.fetchWidgetUseCount();
    this._topResources = this.sortByClicksDescending(await metricRepository.fetchTopResources());
    this._topActions = this.sortByClicksDescending(await metricRepository.fetchTopActions());
    this._latestActions = await metricRepository.fetchLatestActions();
  }

  @action.bound
  setDisplayData(data: MetricDisplayModel) {
    this._displayData = data;
  }

  @computed
  get displayData() {
    return this._displayData;
  }

  @computed
  get visitCount() {
    return this._visitCount;
  }

  @computed
  get userCount() {
    return this._userCount;
  }

  @computed
  get resourceClickCount() {
    return this._resourceClickCount;
  }

  @computed
  get widgetUseCount(): number {
    return this._widgetUseCount;
  }

  @computed
  get topResources(): any {
    return this._topResources;
  }

  @computed
  get topActions(): any[] {
    return this._topActions;
  }

  @computed
  get latestActions(): MetricModel[] {
    return this._latestActions;
  }

  sortByClicksDescending(param: any[]) {
    param.sort((a: any, b: any) => {
      return b.clicks - a.clicks;
    });
    return param;
  }
}