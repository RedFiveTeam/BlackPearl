import { ResourceStore } from './ResourceStore';
import { Category, ResourceModel } from '../ResourceModel';

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

  it('should categorize resources', () => {
    let resources: ResourceModel[];
    resources = [
      new ResourceModel(1, 'https://www.google.com', 'Google', Category.Main),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', Category.Main),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay', Category.SituationalAwareness)
    ];
    subject.setResources(resources);
    expect(subject.returnResourcesInCategory(Category.Main)).toEqual([resources[0], resources[1]]);
    expect(subject.returnResourcesInCategory(Category.SituationalAwareness)).toEqual([resources[2]]);
  });

  it('should hide pending delete popup by default', () => {
    expect(subject.hasPendingDelete).toBeFalsy();
  });

  it('should show pending delete popup', () => {
    subject.setPendingDelete(new ResourceModel(1, 'https://www.test1.com', 'Test1'));
    expect(subject.hasPendingDelete).toBeTruthy();
  });

  it('should hide pending edit popup by default', () => {
    expect(subject.hasPendingEdit).toBeFalsy();
  });

  it('should show a pending edit popup', () => {
    subject.setPendingEdit(new ResourceModel(1, 'https://www.test1.com', 'Test1'));
    expect(subject.hasPendingEdit).toBeTruthy();
  });
});