import { ProfileModel } from '../../../profile/ProfileModel';
import { MetricModel } from './MetricModel';
import { UserModel } from '../user/UserModel';
import * as moment from 'moment';
import { MetricRepository } from './MetricRepository';

export class StubMetricRepository implements MetricRepository {
  addLogin(profile: ProfileModel): Promise<MetricModel> {
    return Promise.resolve(new MetricModel(
      new UserModel(1, 'user1', 'card1'),
      moment('2018-11-11 11:11:11')
    ));
  }

  findAll(): Promise<MetricModel[]> {
    return Promise.resolve([
      new MetricModel(
        new UserModel(1, 'u1', 'card1'),
        moment('2018-08-22T00:00:00.000Z').utc()
      ),
      new MetricModel(
        new UserModel(2, 'u2', 'card2'),
        moment('2018-08-22T00:00:00.000Z').utc()
      )
    ]);
  }
}