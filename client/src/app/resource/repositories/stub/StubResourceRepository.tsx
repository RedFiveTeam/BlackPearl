import { ResourceRepository } from '../ResourceRepository';
import { ResourceModel } from '../../ResourceModel';

export class StubResourceRepository implements ResourceRepository {
  findAll(): Promise<ResourceModel[]> {
    return Promise.resolve([
      new ResourceModel(1, 'https://www.google.com', 'Google'),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo'),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay')
    ]);
  }

  saveResource(resource: ResourceModel): Promise<ResourceModel> {
    resource.setName('New Test Resource');
    resource.setUrl('https://www.newtestresource.com');
    return Promise.resolve(resource);
  }

  delete(resourceId: number): Promise<void> {
    return Promise.resolve();
  }
}