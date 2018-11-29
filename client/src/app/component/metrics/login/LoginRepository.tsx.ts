import { LoginModel } from './LoginModel';
import { ProfileModel } from '../../../profile/ProfileModel';

export interface LoginRepository {
  addLogin(profile: ProfileModel): Promise<LoginModel>;

  findAll(): Promise<LoginModel[]>;
}