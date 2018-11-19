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
}