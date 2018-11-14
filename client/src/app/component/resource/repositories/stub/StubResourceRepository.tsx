import { ResourceRepository } from '../ResourceRepository';
import { ResourceModel } from '../../ResourceModel';

export class StubResourceRepository implements ResourceRepository {

  findAll(): Promise<ResourceModel[]> {
    return Promise.resolve([
      new ResourceModel(1, 'https://www.google.com', 'Google', 1, 'GUEST'),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', 1, 'GUEST'),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay', 2, 'GUEST')
    ]);
  }

  findAllByAccount(accountID: string): Promise<ResourceModel[]> {
    return Promise.resolve([
      new ResourceModel(1, 'https://www.google.com', 'Google', 1, 'GUEST'),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', 1, 'GUEST'),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay', 2, 'GUEST')
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

  updateResource(resource: ResourceModel): Promise<ResourceModel> {
    resource.setName('Edit Test Resource');
    resource.setUrl('https://www.editresource.com');
    return Promise.resolve(resource);
  }

}