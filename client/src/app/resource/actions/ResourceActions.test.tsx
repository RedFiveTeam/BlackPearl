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
      setPendingResource: jest.fn()
    };

    resourceRepository = {
      findAll: jest.fn()
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
});