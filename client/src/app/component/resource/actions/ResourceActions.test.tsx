import { StubResourceRepository } from '../repositories/stub/StubResourceRepository';
import { ResourceActions } from './ResourceActions';
import { Category, ResourceModel } from '../ResourceModel';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { ProfileModel } from '../../../profile/ProfileModel';
import { ResourceStore } from '../stores/ResourceStore';

describe('ResourceActions', () => {
  let resourceRepository: ResourceRepository;
  let resourceStore: ResourceStore;
  let subject: ResourceActions;
  let testResources: ResourceModel[];
  let profileStore: any;

  beforeEach(() => {
    resourceStore = new ResourceStore();

    profileStore = {
      profile: new ProfileModel(null, 'cardID', 'AltId', 1, 0, 1)
    };

    resourceRepository = new StubResourceRepository();
    resourceRepository.updateResource = jest.fn();

    testResources = [
      new ResourceModel(1, 'http://www.test.com', 'TestResource', 1, 'Guest', 0),
      new ResourceModel(2, 'https://www.google.com', 'Google', 1, 'FIRST.LAST', 0),
      new ResourceModel(3, 'https://www.yahoo.com', 'Yahoo', 1),
      new ResourceModel(4, 'https://www.ebay.com', 'eBay', 2)
    ];

    subject = new ResourceActions({resourceStore, profileStore} as any, {resourceRepository} as any);
  });

  it('should set resources in store', async () => {
    await subject.setResources(testResources);
    expect(resourceStore.resources.length).toBe(4);
  });

  it('should store every resource in store', async () => {
    await subject.setAllResources();
    expect(resourceStore.resources.length).toBe(3);
  });

  it('should clear pending resource', () => {
    let setPendingResourceSpy = jest.fn();
    resourceStore.setPendingResource = setPendingResourceSpy;
    subject.clearPendingResource();
    expect(setPendingResourceSpy).toHaveBeenCalledWith(null);
  });

  it('should create a pending resource', () => {
    let createPendingResourceSpy = jest.fn();
    resourceStore.setPendingResource = createPendingResourceSpy;
    subject.createPendingResource();
    expect(createPendingResourceSpy).toHaveBeenCalled();
  });

  it('should save a pending resource', async () => {
    resourceStore.setPendingResource(
      new ResourceModel(1, 'http://www.test.com', 'TestResource', 1, 'Guest', 0)
    );

    let saveResourceSpy = jest.fn();
    resourceRepository.saveResource = saveResourceSpy;

    await subject.saveResource();
    expect(saveResourceSpy).toHaveBeenCalledWith(
      {
        '_accountID': 'Guest',
        '_categoryID': 1,
        '_id': 1,
        '_name': 'TestResource',
        '_position': 0,
        '_url': 'http://www.test.com'
      });
  });

  it('should update title and url of pending resource', () => {
    resourceStore.setPendingResource(
      new ResourceModel(1, 'http://www.test.com', 'TestResource', 1, 'Guest', 0)
    );
    let pendingResource = new ResourceModel(null, '.com', 'name');
    subject.updatePendingResource(pendingResource.name, pendingResource.url);
    expect(resourceStore.pendingResource!.name).toBe('name');
    expect(resourceStore.pendingResource!.url).toBe('.com');
  });

  it('should update multiple resources at once', () => {
    let resources = [
      new ResourceModel(1, 'https://www.test.com', 'Test', 0, 'Bob', 0),
      new ResourceModel(2, 'https://www.test2.com', 'Test2', 0, 'Bob', 1)
    ];

    let updateGivenResourcesSpy = jest.fn();
    resourceRepository.updateGivenResources = updateGivenResourcesSpy;

    subject.updateGivenResources(resources);
    expect(updateGivenResourcesSpy).toHaveBeenCalledWith(resources);
  });

  it('should delete a resource', async () => {
    let deleteSpy = jest.fn();
    resourceRepository.delete = deleteSpy;
    await subject.delete(testResources[0].id!);
    expect(deleteSpy).toHaveBeenCalledWith(testResources[0].id);
  });

  it('should create a pending delete', () => {
    let pendingDelete = new ResourceModel(1, 'Delete Me', 'deleteme.com');
    let setPendingDeleteSpy = jest.fn();
    resourceStore.setPendingDelete = setPendingDeleteSpy;
    subject.createPendingDelete(pendingDelete);
    expect(setPendingDeleteSpy).toHaveBeenCalledWith(pendingDelete);
  });

  it('should clear a pending delete', () => {
    let setPendingDeleteSpy = jest.fn();
    resourceStore.setPendingDelete = setPendingDeleteSpy;
    subject.clearPendingDelete();
    expect(setPendingDeleteSpy).toHaveBeenCalledWith(null);
  });

  it('should create a pending edit', () => {
    let pendingEdit = new ResourceModel(1, 'Edit Me', 'editme.com');
    let setPendingEditSpy = jest.fn();
    resourceStore.setPendingEdit = setPendingEditSpy;
    subject.createPendingEdit(pendingEdit);
    expect(setPendingEditSpy).toHaveBeenCalledWith(pendingEdit);
  });

  it('should clear a pending edit', () => {
    let setPendingEditSpy = jest.fn();
    resourceStore.setPendingEdit = setPendingEditSpy;
    subject.clearPendingEdit();
    expect(setPendingEditSpy).toHaveBeenCalledWith(null);
  });

  it('should update a resource', async () => {
    let updateResourceSpy = jest.fn();
    resourceRepository.updateResource = updateResourceSpy;

    let pendingEdit = new ResourceModel(1, 'Edit Me', 'editme.com');
    subject.createPendingEdit(pendingEdit);

    await subject.updateResource();
    expect(await updateResourceSpy).toHaveBeenCalledWith(pendingEdit);
  });

  it('should assign a category to a pending resource', () => {
    let setPendingResourceCategorySpy = jest.fn();
    resourceStore.setPendingResourceCategory = setPendingResourceCategorySpy;
    subject.createPendingResource();
    subject.setPendingResourceCategory(Category.FMV_Main);
    expect(setPendingResourceCategorySpy).toHaveBeenCalledWith(Category.FMV_Main);
  });

  it('should save a favorite resource', async () => {
    let saveResourceSpy = jest.fn();
    resourceRepository.saveResource = saveResourceSpy;
    let resource = new ResourceModel(null, 'https://www.favorite.com', 'favorite', 0, 'GUEST');
    await subject.saveFavorite(resource);
    expect(saveResourceSpy).toHaveBeenCalledWith(resource);
  });

  it('should check for duplicate titles in resources', async () => {
    await subject.setResources(testResources);
    resourceStore.setPendingResource(new ResourceModel(1, 'http://www.test.com', 'TestResource', 1, 'Guest', 0));

    expect(subject.checkDuplicates('TestResource')).toBe(true);
    expect(subject.checkDuplicates('Doesnt Exist')).toBe(false);
  });

  it('should filter the resources', async () => {
    let setFilteredResourcesSpy = jest.fn();
    resourceStore.setFilteredResources = setFilteredResourcesSpy;
    await subject.filterResources('eBay');
    expect(setFilteredResourcesSpy).toHaveBeenCalled();
  });
});
