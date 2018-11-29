import { UserRepository } from './UserRepository';
import { UserModel } from './UserModel';

export class StubUserRepository implements UserRepository {
  findAll(): Promise<UserModel[]> {
    return Promise.resolve([
      new UserModel(1, 'user1', 'card1'),
      new UserModel(2, 'user2', 'card2'),
      new UserModel(3, 'user3', 'card3'),
    ]);
  }
}