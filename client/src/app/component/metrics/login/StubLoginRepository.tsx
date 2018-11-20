import { LoginRepository } from './LoginRepository.tsx';
import { ProfileModel } from '../../../profile/ProfileModel';
import { LoginModel } from './LoginModel';
import { UserModel } from '../user/UserModel';
import * as moment from 'moment';

export class StubLoginRepository implements LoginRepository {
  addLogin(profile: ProfileModel): Promise<LoginModel> {
    return Promise.resolve(new LoginModel(
      new UserModel(1, 'user1', 'card1'),
      moment('2018-11-11 11:11:11')
    ));
  }

}