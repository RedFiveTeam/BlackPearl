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
      pendingResource: ResourceModel,
      performLoading: async (runFunction: any) => {
        await runFunction();
      }
    };

    resourceRepository = {
      findAll: jest.fn(),
      saveResource: jest.fn()
    };

    testResources = [
      new ResourceModel(1, 'https://www.google.com', 'Google'),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo'),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay')
    ];

    subject = new ResourceActions({resourceStore} as any, {resourceRepository} as any);
  });

  it('should set resources in store', async () => {
    await subject.setResources(testResources);
    expect(resourceStore.setResources).toHaveBeenCalledWith(testResources);
  });

  it('should store every resource in store', async () => {
    await subject.setAllResources();
    expect(resourceStore.setResources).toHaveBeenCalledWith(await resourceRepository.findAll());
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
})
;