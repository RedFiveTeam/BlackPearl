import { ResourceModel } from '../ResourceModel';

export interface ResourceRepository {
  findAll(): Promise<ResourceModel[]>;
  saveResource(resource: ResourceModel): Promise<ResourceModel>;
}