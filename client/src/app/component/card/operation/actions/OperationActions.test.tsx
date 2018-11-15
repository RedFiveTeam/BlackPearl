import { OperationActions } from './OperationActions';
import { OperationRepository } from '../repositories/OperationRepository';
import { StubOperationRepository } from '../repositories/StubOperationRepository';
import Mock = jest.Mock;

describe('OperationActions', () => {
  let subject: OperationActions;
  let operationStore: any;
  let operationRepository: OperationRepository;
  let findAllSpy: Mock;

  beforeEach(() => {
    operationStore = {
      setOperations: jest.fn()
    };

    operationRepository = new StubOperationRepository();

    subject = new OperationActions({operationStore} as any, {operationRepository} as any);
  });

  it('should store all the operations in the store', async () => {
    findAllSpy = jest.fn();
    operationRepository.findAll = findAllSpy;

    await subject.setupOperations();
    expect(operationRepository.findAll).toHaveBeenCalled();
    expect(operationStore.setOperations).toHaveBeenCalledWith(operationRepository.findAll());
  });

});