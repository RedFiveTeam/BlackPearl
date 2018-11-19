import { OperationModel } from '../OperationModel';

export interface OperationRepository {
  findAll(): Promise<OperationModel[]>;
}