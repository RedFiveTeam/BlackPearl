import { StubResourceRepository } from '../repositories/stub/StubResourceRepository';
import { ResourceActions } from './ResourceActions';
import { ResourceModel } from '../ResourceModel';

describe('ResourceActions', () => {
  let resourceRepository: StubResourceRepository;
  let resourceStore: any;
  let subject: ResourceActions;
  let testResources: ResourceModel[];

  beforeEach(() => {
    resourceStore = {
      setResources: jest.fn(),
      setPendingResource: jest.fn(),
      setPendingDelete: jest.fn(),
      setPendingEdit: jest.fn(),
      pendingResource: ResourceModel,
      pendingEdit: ResourceModel,
      performLoading: async (runFunction: any) => {
        await runFunction();
      }
    };

    resourceRepository = {
      findAll: jest.fn(),
      findResourcesForCategory: jest.fn(),
      saveResource: jest.fn(),
      delete: jest.fn(),
      updateResource: jest.fn()
    };

    testResources = [
      new ResourceModel(1, 'https://www.google.com', 'Google', 1),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', 1),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay', 2)
    ];

    subject = new ResourceActions({resourceStore} as any, {resourceRepository} as any);
  });

  it('should set resources in store', async () => {
    await subject.setResources(testResources);
    expect(resourceStore.setResources).toHaveBeenCalledWith(testResources);
  });

  it('should store every resource in store', async () => {
    await subject.setAllResources();
    expect(resourceStore.setResources).toHaveBeenCalledWith(resourceRepository.findAll());
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

  it('should delete a resource and refresh page', async () => {
    await subject.delete(testResources[0].id!);
    expect(resourceRepository.delete).toHaveBeenCalledWith(testResources[0].id);
    expect(resourceStore.setResources).toHaveBeenCalledWith(await resourceRepository.findAll());
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
    expect(resourceRepository.updateResource).toHaveBeenCalledWith(resourceStore.pendingEdit);
  });
})
;