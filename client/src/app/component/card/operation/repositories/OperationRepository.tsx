import { OperationModel } from '../OperationModel';

export interface OperationRepository {
  findAll(): Promise<OperationModel[]>;
  saveOperation(operation: OperationModel): Promise<OperationModel>;
  updateOperation(operation: OperationModel): Promise<OperationModel>;
  deleteOperation(operationId: number): Promise<void>;
}