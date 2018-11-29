import { OperationRepository } from './OperationRepository';
import { OperationModel } from '../OperationModel';

export class StubOperationRepository implements OperationRepository {
  findAll(): Promise<OperationModel[]> {
    return Promise.resolve([
      new OperationModel(1, 'Operation One', 'This is Operation One'),
      new OperationModel(2, 'Operation Two', 'This is Operation Two')
    ]);
  }

  saveOperation(operation: OperationModel): Promise<OperationModel> {
    operation.setTitle('Test Op');
    operation.setDescription('New Testing Operation');
    operation.setAddress('https://www.newtestop.com');
    return Promise.resolve(operation);
  }

  updateOperation(operation: OperationModel): Promise<OperationModel> {
    operation.setTitle('New Edit Test Op');
    operation.setDescription('New Edit Test Description');
    operation.setAddress('https://www.newedit.com');
    return Promise.resolve(operation);
  }

  deleteOperation(operationId: number): Promise<void> {
    return Promise.resolve();
  }
}