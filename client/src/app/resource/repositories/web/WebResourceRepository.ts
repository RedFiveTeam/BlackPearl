import { ResourceRepository } from '../ResourceRepository';
import { ResourceSerializer } from '../../serializer/ResourceSerializer';
import { HTTPClient } from '../../../utils/HTTPClient';
import { ResourceModel } from '../../ResourceModel';

export class WebResourceRepository implements ResourceRepository {
  private resourceSerializer = new ResourceSerializer();

  constructor(private client: HTTPClient) {
  }

  async findAll(): Promise<ResourceModel[]> {
    const json = await this.client.getJSON('/api/resources');
    return json.map((obj: any) => {
      return this.resourceSerializer.deserialize(obj);
    });
  }
}