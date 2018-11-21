import { computed, observable } from 'mobx';
import { UserModel } from '../../component/metrics/user/UserModel';
import { UserRepository } from '../../component/metrics/user/UserRepository';
import { LoginModel } from '../../component/metrics/login/LoginModel';
import { LoginRepository } from '../../component/metrics/login/LoginRepository.tsx';
import moment = require('moment-timezone');

export class MetricsStore {
  @observable private _users: UserModel[];
  @observable private _logins: LoginModel[];

  async hydrate(
    userRepository: UserRepository,
    loginRepository: LoginRepository
  ) {
    this._users = await userRepository.findAll();
    this._logins = await loginRepository.findAll();
  }

  @computed
  get userCount() {
    return (this._users) ? this._users.length : 0;
  }

  @computed
  get logins() {
    return this._logins ? this._logins : [
      new LoginModel(new UserModel(1, 'loading', 'loading'), moment())
    ];
  }
}