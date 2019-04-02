import { ResourceRepository } from '../ResourceRepository';
import { ResourceSerializer } from '../../serializer/ResourceSerializer';
import { HTTPClient } from '../../../../utils/HTTPClient';
import { ResourceModel } from '../../ResourceModel';
import { ClickModel } from '../../ClickModel';
import { ClickSerializer } from '../../serializer/ClickSerializer';

export class WebResourceRepository implements ResourceRepository {
  private resourceSerializer = new ResourceSerializer();
  private clickSerializer = new ClickSerializer();

  constructor(private client: HTTPClient) {
  }

  async findAll(): Promise<ResourceModel[]> {
    const json = await this.client.getJSON('/api/resources');
    return json.map((obj: any) => {
      return this.resourceSerializer.deserialize(obj);
      // use this
    });
  }

  async findAllByAccount(accountID: string): Promise<ResourceModel[]> {
    const json = await this.client.getJSON(`/api/resources/${accountID}`);
    return json.map((obj: any) => {
      return this.resourceSerializer.deserialize(obj);
    });
  }

  async saveResource(resource: ResourceModel): Promise<ResourceModel> {
    const body = JSON.stringify(this.resourceSerializer.serialize(resource));
    const json = await this.client.postJSON('/api/resources', body);
    return this.resourceSerializer.deserialize(json);
  }

  async delete(resourceId: number): Promise<void> {
    const json = await this.client.delete('/api/resources', JSON.stringify(resourceId));
    return Promise.resolve(json);
  }

  async updateResource(resource: ResourceModel): Promise<ResourceModel> {
    const body = JSON.stringify(this.resourceSerializer.serialize(resource));
    const json = await this.client.putJSON('/api/resources/' + resource.id, body);
    return Promise.resolve(json);
  }

  async updateGivenResources(resources: ResourceModel[]): Promise<void> {
    await this.client.putJSON(
      '/api/resources',
      JSON.stringify(resources.map((res) => {
        return this.resourceSerializer.serialize(res);
      }))
    );
    return;
  }

  async getAllClicks(): Promise<ClickModel[]> {
    const json = await this.client.getJSON('/api/clicks');
    return json.map((obj: any) => {
      return this.clickSerializer.deserialize(obj);
    });
  }

  async updateClicks(id: number): Promise<void> {
    await this.client.get('/api/clicks/' + id);
    return;
  }
}