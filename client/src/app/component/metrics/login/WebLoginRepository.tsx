import { LoginModel } from './LoginModel';
import { UserModel } from '../user/UserModel';
import { ProfileModel } from '../../../profile/ProfileModel';
import { LoginRepository } from './LoginRepository.tsx';
import { LoginSerializer } from './LoginSerializer';
import * as moment from 'moment';
import { HTTPClient } from '../../../utils/HTTPClient';

export class WebLoginRepository implements LoginRepository {
  private loginSerializer = new LoginSerializer();

  constructor(private client: HTTPClient) {
  }

  async addLogin(profile: ProfileModel): Promise<LoginModel> {
    const user = new UserModel(-1, '', profile.cardID);
    const login = new LoginModel(user, moment());
    const body = this.loginSerializer.serialize(login);
    const json = await this.client.postJSON('/api/login', JSON.stringify(body));
    return this.loginSerializer.deserialize(json);
  }

  async findAll(): Promise<LoginModel[]> {
    const json = await this.client.getJSON('/api/login');
    return json.map((obj: any) => {
      return this.loginSerializer.deserialize(obj);
    });
  }

  async updateProfile(profile: ProfileModel): Promise<void> {
    await this.client.putJSON('/api/login', JSON.stringify(profile));
  }
}