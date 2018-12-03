import { computed, observable } from 'mobx';
import { UserModel } from '../../component/metrics/user/UserModel';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { MetricModel } from '../../component/metrics/metric/MetricModel';
import { MetricRepository } from '../../component/metrics/metric/MetricRepository';
import moment = require('moment-timezone');

export class MetricsStore {
  @observable private _users: UserModel[];
  @observable private _logins: MetricModel[];

  async hydrate(
    userRepository: UserRepository,
    metricRepository: MetricRepository
  ) {
    this._users = await userRepository.findAll();
    this._logins = await metricRepository.findAll();
  }

  @computed
  get userCount() {
    return (this._users) ? this._users.length : 0;
  }

  @computed
  get logins() {
    return this._logins ? this._logins : [
      new MetricModel(new UserModel(1, 'loading', 'loading'), moment())
    ];
  }
}