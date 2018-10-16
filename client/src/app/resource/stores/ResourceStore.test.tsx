import { ResourceStore } from './ResourceStore';
import { ResourceModel } from '../ResourceModel';

describe('ResourceStore', () => {
  let subject: ResourceStore;

  beforeEach(() => {
    subject = new ResourceStore();
  });

  it('should hide pending resource popup by default', () => {
    expect(subject.hasPendingResource).toBeFalsy();
  });

  it('should show pending resource popup', () => {
    subject.setPendingResource(new ResourceModel(0, 'https://www.test.com', 'Test'));
    expect(subject.hasPendingResource).toBeTruthy();
  });

  it('should hide pending delete popup by default', () => {
    expect(subject.hasPendingDelete).toBeFalsy();
  });

  it('should show pending delete popup', () => {
    subject.setPendingDelete(new ResourceModel(1, 'https://www.test1.com', 'Test1'));
    expect(subject.hasPendingDelete).toBeTruthy();
  });
});