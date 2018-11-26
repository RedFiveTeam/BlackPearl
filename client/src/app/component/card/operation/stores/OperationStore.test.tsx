import { OperationStore } from './OperationStore';
import { OperationModel } from '../OperationModel';

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

  it('should hide pending edit popup by default', () => {
    expect(subject.hasPendingEdit).toBeFalsy();
  });

  it('should show a pending edit popup', () => {
    subject.setPendingEdit(new OperationModel(1, 'New Test Op', 'Test Op Description', 'Test Op Address'));
    expect(subject.hasPendingEdit).toBeTruthy();
  });

  it('should hide pending delete popup by default', () => {
    expect(subject.hasPendingDelete).toBeFalsy();
  });

  it('should show a pending delete popup', () => {
    subject.setPendingDelete(new OperationModel(1, 'New Test Op', 'Test Op Description', 'Test Op Address'));
    expect(subject.hasPendingDelete).toBeTruthy();
  });
});