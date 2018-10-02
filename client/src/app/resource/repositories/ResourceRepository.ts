import { ResourceModel } from '../ResourceModel';

export interface ResourceRepository {
  findAll(): Promise<ResourceModel[]>;
}