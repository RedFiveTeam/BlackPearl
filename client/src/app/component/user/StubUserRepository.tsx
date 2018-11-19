import { UserRepository } from './UserRepository';
import { UserModel } from './UserModel';

export class StubUserRepository implements UserRepository {
  findAll(): Promise<UserModel[]> {
    return Promise.resolve([
      new UserModel(1, 'user1'),
      new UserModel(2, 'user2'),
    ]);
  }

}