import { MetricModel } from './MetricModel';
import { UserModel } from '../user/UserModel';
import { ProfileModel } from '../../../profile/ProfileModel';
import { MetricSerializer } from './MetricSerializer';
import * as moment from 'moment';
import { HTTPClient } from '../../../utils/HTTPClient';
import { MetricRepository } from './MetricRepository';

export class WebMetricRepository implements MetricRepository {
  private loginSerializer = new MetricSerializer();

  constructor(private client: HTTPClient) {
  }

  async addLogin(profile: ProfileModel): Promise<MetricModel> {
    const user = new UserModel(-1, '', profile.cardID);
    const login = new MetricModel(user, moment());
    const body = this.loginSerializer.serialize(login);
    const json = await this.client.postJSON('/api/metrics', JSON.stringify(body));
    return this.loginSerializer.deserialize(json);
  }

  async findAll(): Promise<MetricModel[]> {
    const json = await this.client.getJSON('/api/metrics');
    return json.map((obj: any) => {
      return this.loginSerializer.deserialize(obj);
    });
  }

  async updateProfile(profile: ProfileModel): Promise<void> {
    await this.client.putJSON('/api/metrics', JSON.stringify(profile));
  }
}