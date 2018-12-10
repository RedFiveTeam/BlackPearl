import { ResourceStore } from './ResourceStore';
import { Category, ResourceModel } from '../ResourceModel';
import { ClickModel } from '../ClickModel';

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
      new ResourceModel(1, 'https://www.google.com', 'Google', Category.FMV_Main),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', Category.FMV_Main),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay', Category.FMV_SituationalAwareness)
    ];
    subject.setResources(resources);
    expect(subject.returnResourcesInCategory(Category.FMV_Main)).toEqual([resources[0], resources[1]]);
    expect(subject.returnResourcesInCategory(Category.FMV_SituationalAwareness)).toEqual([resources[2]]);
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

  it('should sum clicks with the same id and sort them', () => {
    let resources: ResourceModel[];
    resources = [
      new ResourceModel(1, 'https://www.google.com', 'Google', Category.FMV_Main),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', Category.FMV_Main),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay', Category.FMV_SituationalAwareness)
    ];
    subject.setResources(resources);

    let clicks = [
      new ClickModel(2, 10),
      new ClickModel(2, 10),
      new ClickModel(1, 15),
      new ClickModel(2, 10),
      new ClickModel(3, 10),
      new ClickModel(2, 10)
    ];
    subject.setClicks(clicks);

    expect(subject.resources[0].position).toBe(15);
    expect(subject.resources[1].position).toBe(40);
    expect(subject.resources[2].position).toBe(10);
  });

  it('should sort resources by position desc', () => {
    let resources: ResourceModel[];
    resources = [
      new ResourceModel(1, 'https://www.google.com', 'Google', Category.FMV_Main, '', 20),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', Category.FMV_Main, '', 10),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay', Category.FMV_SituationalAwareness, '', 30)
    ];
    subject.setResources(resources);
    subject.sortResourcesByPositionDesc();

    expect(subject.filteredResources.length).toBe(3);
    expect(subject.filteredResources[0].position).toBe(30);
    expect(subject.filteredResources[1].position).toBe(20);
    expect(subject.filteredResources[2].position).toBe(10);
  });

  it('should sort resources by id desc', () => {
    let resources: ResourceModel[];
    resources = [
      new ResourceModel(1, 'https://www.google.com', 'Google', Category.FMV_Main, '', 20),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', Category.FMV_Main, '', 10),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay', Category.FMV_SituationalAwareness, '', 30)
    ];
    subject.setResources(resources);
    subject.sortResourcesByIdDesc();

    expect(subject.filteredResources[0].id).toBe(3);
    expect(subject.filteredResources[1].id).toBe(2);
    expect(subject.filteredResources[2].id).toBe(1);
  });

  it('should sort resources by name desc', () => {
    let resources: ResourceModel[];
    resources = [
      new ResourceModel(1, 'https://www.google.com', 'Google', Category.FMV_Main, '', 20),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', Category.FMV_Main, '', 10),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay', Category.FMV_SituationalAwareness, '', 30)
    ];
    subject.setResources(resources);
    subject.sortResourcesByNameDesc();

    expect(subject.filteredResources[0].name).toBe('eBay');
    expect(subject.filteredResources[1].name).toBe('Google');
    expect(subject.filteredResources[2].name).toBe('Yahoo');
  });
});