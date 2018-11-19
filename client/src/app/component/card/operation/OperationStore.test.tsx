import { OperationStore } from './OperationStore';
import { OperationModel } from './OperationModel';

describe('OperationStore', () => {
  let subject: OperationStore;

  beforeEach(() => {
    subject = new OperationStore();
  });

  it('should hide pending operation popup by default', () => {
    expect(subject.hasPendingOperation).toBeFalsy();
  });

  it('should display a pending operation popup', () => {
    subject.setPendingOperation(new OperationModel(0, 'test', 'test', 'test'));
    expect(subject.hasPendingOperation).toBeTruthy();
  });
});