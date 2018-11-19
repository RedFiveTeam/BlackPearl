import { ProfileRepository } from './ProfileRepository';
import { ProfileSerializer } from './ProfileSerializer';
import { HTTPClient } from '../utils/HTTPClient';
import { ProfileModel } from './ProfileModel';

export class WebProfileRepository implements ProfileRepository {
  private profileSerializer = new ProfileSerializer();

  constructor(private client: HTTPClient) {
  }

  async getProfile(): Promise<ProfileModel> {
    const json = await this.client.getJSON('/api/account');
    return this.profileSerializer.deserialize(json);
  }
}