import { UserModel } from './UserModel';

export interface UserRepository {
  findAll(): Promise<UserModel[]>;
}