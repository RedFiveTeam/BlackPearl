import { StubResourceRepository } from '../repositories/stub/StubResourceRepository';
import { ResourceActions } from './ResourceActions';
import { Category, ResourceModel } from '../ResourceModel';
import { ResourceRepository } from '../repositories/ResourceRepository';
import { ProfileModel } from '../../../profile/ProfileModel';

describe('ResourceActions', () => {
  let resourceRepository: ResourceRepository;
  let resourceStore: any;
  let subject: ResourceActions;
  let testResources: ResourceModel[];
  let profileStore: any;

  beforeEach(() => {
    resourceStore = {
      setResources: jest.fn(),
      setPendingResource: jest.fn(),
      setPendingDelete: jest.fn(),
      setPendingEdit: jest.fn(),
      setPendingResourceCategory: jest.fn(),
      pendingResource: new ResourceModel(1, 'http://www.test.com', 'TestResource', 1, 'Guest', 0),
      pendingEdit: ResourceModel,
      resources: [
        new ResourceModel(1, 'http://www.test.com', 'TestResource', 1, 'Guest', 0)
      ],
      performLoading: async (fun: any) => { await fun(); },
      getAllClicks: jest.fn(),
      setClicks: jest.fn(),
      sortResourcesByPositionDesc: jest.fn()
    };

    profileStore = {
      profile: new ProfileModel(0, 'GUEST', 'GUEST')
    };

    resourceRepository = new StubResourceRepository();

    resourceRepository.delete = jest.fn();
    resourceRepository.updateResource = jest.fn();
    resourceRepository.saveResource = jest.fn();
    resourceRepository.updateGivenResources = jest.fn();
    resourceRepository.updateClicks = jest.fn();

    testResources = [
      new ResourceModel(1, 'https://www.google.com', 'Google', 1),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', 1),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay', 2)
    ];

    subject = new ResourceActions({resourceStore, profileStore} as any, {resourceRepository} as any);
  });

  it('should set resources in store', async () => {
    await subject.setResources(testResources);
    expect(resourceStore.setResources).toHaveBeenCalledWith(testResources);
  });

  it('should store every resource in store', async () => {
    await subject.setAllResources();
    expect(resourceStore.setResources).toHaveBeenCalled();
    expect(resourceStore.setClicks).toHaveBeenCalled();
    expect(resourceStore.sortResourcesByPositionDesc).toHaveBeenCalled();
  });

  it('should clear pending resource', () => {
    subject.clearPendingResource();
    expect(resourceStore.setPendingResource).toHaveBeenCalledWith(null);
  });

  it('should create a pending resource', () => {
    subject.createPendingResource();
    expect(resourceStore.setPendingResource).toHaveBeenCalled();
  });

  it('should save a pending resource', async () => {
    await subject.saveResource();
    expect(resourceRepository.saveResource).toHaveBeenCalledWith(resourceStore.pendingResource);
  });

  it('should update title and url of pending resource', () => {
    let pendingResource = new ResourceModel(null, 'name', '.com');
    subject.updatePendingResource(pendingResource.name, pendingResource.url);
    expect(resourceStore.setPendingResource.mock.calls[0][0].name).toEqual(pendingResource.name);
    expect(resourceStore.setPendingResource.mock.calls[0][0].url).toEqual(pendingResource.url);
  });

  it('should update multiple resources at once', () => {
    let resources = [
      new ResourceModel(1, 'https://www.test.com', 'Test', 0, 'Bob', 0),
      new ResourceModel(2, 'https://www.test2.com', 'Test2', 0, 'Bob', 1)
    ];

    subject.updateGivenResources(resources);
    expect(resourceRepository.updateGivenResources).toHaveBeenCalledWith(resources);
  });

  it('should delete a resource', async () => {
    await subject.delete(testResources[0].id!);
    expect(resourceRepository.delete).toHaveBeenCalledWith(testResources[0].id);
  });

  it('should create a pending delete', () => {
    let pendingDelete = new ResourceModel(1, 'Delete Me', 'deleteme.com');
    subject.createPendingDelete(pendingDelete);
    expect(resourceStore.setPendingDelete).toHaveBeenCalledWith(pendingDelete);
  });

  it('should clear a pending delete', () => {
    subject.clearPendingDelete();
    expect(resourceStore.setPendingDelete).toHaveBeenCalledWith(null);
  });

  it('should create a pending edit', () => {
    let pendingEdit = new ResourceModel(1, 'Edit Me', 'editme.com');
    subject.createPendingEdit(pendingEdit);
    expect(resourceStore.setPendingEdit).toHaveBeenCalledWith(pendingEdit);
  });

  it('should clear a pending edit', () => {
    subject.clearPendingEdit();
    expect(resourceStore.setPendingEdit).toHaveBeenCalledWith(null);
  });

  it('should update a resource', async () => {
    await subject.updateResource();
    expect(await resourceRepository.updateResource).toHaveBeenCalledWith(resourceStore.pendingEdit);
  });

  it('should assign a category to a pending resource', () => {
    subject.createPendingResource();
    subject.setPendingResourceCategory(Category.FMV_Main);
    expect(resourceStore.setPendingResourceCategory).toHaveBeenCalledWith(Category.FMV_Main);
  });

  it('should save a favorite resource', async () => {
    let resource = new ResourceModel(null, 'https://www.favorite.com', 'favorite', 0, 'GUEST');
    await subject.saveFavorite(resource);
    expect(resourceRepository.saveResource).toHaveBeenCalledWith(resource);
  });

  it('should check for duplicate titles in resources', () => {

    expect(subject.checkDuplicates('TestResource')).toBe(true);
    expect(subject.checkDuplicates('Doesnt Exist')).toBe(false);
  });
});