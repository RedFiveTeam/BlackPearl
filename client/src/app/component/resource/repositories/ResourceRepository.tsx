import { ResourceModel } from '../ResourceModel';

export interface ResourceRepository {
  findAll(): Promise<ResourceModel[]>;
  findResourcesForCategory(categoryID: number): Promise<ResourceModel[]>;
  saveResource(resource: ResourceModel): Promise<ResourceModel>;
  delete(resourceId: number): Promise<void>;
  updateResource(resource: ResourceModel): Promise<ResourceModel>;
}