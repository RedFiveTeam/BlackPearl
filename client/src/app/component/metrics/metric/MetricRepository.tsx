import { MetricModel } from './MetricModel';
import { ProfileModel } from '../../../profile/ProfileModel';

export interface MetricRepository {
  addLogin(profile: ProfileModel): Promise<MetricModel>;

  findAll(): Promise<MetricModel[]>;
}