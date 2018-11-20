import { UserRepository } from './UserRepository';
import { UserModel } from './UserModel';
import { ProfileModel } from '../../../profile/ProfileModel';
import { LoginModel } from '../login/LoginModel';
import * as moment from 'moment';

export class StubUserRepository implements UserRepository {
  findAll(): Promise<UserModel[]> {
    return Promise.resolve([
      new UserModel(1, 'user1', 'card1'),
      new UserModel(2, 'user2', 'card2'),
    ]);
  }

  addLogin(profile: ProfileModel): Promise<LoginModel> {
    return Promise.resolve(
      new LoginModel(
        new UserModel(1, 'user1', 'card1'),
        moment('2018-01-01 11:11:11'),
      ));
  }
}