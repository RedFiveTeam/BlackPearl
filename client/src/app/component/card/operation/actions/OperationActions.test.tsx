import { OperationActions } from './OperationActions';
import { OperationRepository } from '../repositories/OperationRepository';
import { StubOperationRepository } from '../repositories/StubOperationRepository';
import Mock = jest.Mock;
import { OperationModel } from '../OperationModel';

describe('OperationActions', () => {
  let subject: OperationActions;
  let operationStore: any;
  let operationRepository: OperationRepository;
  let findAllSpy: Mock;

  beforeEach(() => {
    operationStore = {
      setOperations: jest.fn(),
      setPendingOperation: jest.fn(),
      clearPendingOperation: jest.fn(),
      pendingOperation: jest.fn(),
      performLoading: async (fun: any) => { await fun(); }
    };

    operationRepository = new StubOperationRepository();

    operationRepository.saveOperation = jest.fn();

    subject = new OperationActions({operationStore} as any, {operationRepository} as any);
  });

  it('should store all the operations in the store', async () => {
    findAllSpy = jest.fn();
    operationRepository.findAll = findAllSpy;

    await subject.setupOperations();
    expect(operationRepository.findAll).toHaveBeenCalled();
    expect(operationStore.setOperations).toHaveBeenCalledWith(operationRepository.findAll());
  });

  it('should create a pending operation', async () => {
    await subject.createPendingOperation();
    expect(operationStore.setPendingOperation).toHaveBeenCalled();
  });

  it('should clear a pending operation', async () => {
    await subject.clearPendingOperation();
    expect(operationStore.setPendingOperation).toHaveBeenCalledWith(null);
  });

  it('should save a pending operation', async () => {
    await subject.saveOperation();
    expect(operationRepository.saveOperation).toHaveBeenCalledWith(operationStore.pendingOperation);
  });

  it('should update the title, description, and address of a pending operation', () => {
    let pendingOperation = new OperationModel(null, 'title', 'descr', 'address');
    subject.updatePendingOperation(pendingOperation.title, pendingOperation.description, pendingOperation.address);
    expect(operationStore.setPendingOperation.mock.calls[0][0].title).toEqual(pendingOperation.title);
    expect(operationStore.setPendingOperation.mock.calls[0][0].description).toEqual(pendingOperation.description);
    expect(operationStore.setPendingOperation.mock.calls[0][0].address).toEqual(pendingOperation.address);
  });
});