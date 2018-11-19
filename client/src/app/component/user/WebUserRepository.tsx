import { UserSerializer } from './UserSerializer';
import { UserRepository } from './UserRepository';
import { HTTPClient } from '../../utils/HTTPClient';
import { UserModel } from './UserModel';

export class WebUserRepository implements UserRepository {
  private userSerializer = new UserSerializer();

  constructor(private client: HTTPClient) {
  }

  async findAll(): Promise<UserModel[]> {
    const json = await this.client.getJSON('/api/users');
    return json.map((obj: any) => {
      return this.userSerializer.deserialize(obj);
    });
  }
}