import { computed, observable } from 'mobx';
import { UserModel } from '../../component/metrics/user/UserModel';
import { UserRepository } from '../../component/metrics/user/UserRepository';

export class MetricsStore {
  @observable private _users: UserModel[];

  async hydrate(userRepository: UserRepository) {
    this._users = await userRepository.findAll();
  }

  @computed
  get userCount() {
    return (this._users) ? this._users.length : 0;
  }
}