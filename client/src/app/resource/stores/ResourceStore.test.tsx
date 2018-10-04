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
});