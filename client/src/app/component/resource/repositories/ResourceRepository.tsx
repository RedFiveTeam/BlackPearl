import { ResourceModel } from '../ResourceModel';

export interface ResourceRepository {
  findAll(): Promise<ResourceModel[]>;
  findAllByAccount(accountID: string): Promise<ResourceModel[]>;
  saveResource(resource: ResourceModel): Promise<ResourceModel>;
  delete(resourceId: number): Promise<void>;
  updateResource(resource: ResourceModel): Promise<ResourceModel>;
  updateGivenResources(resources: ResourceModel[]): Promise<void>;
}