import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ResourceStore } from './stores/ResourceStore';
import { Category, ResourceModel } from './ResourceModel';
import { ResourceList } from './ResourceList';

describe('ResourceList', () => {
  let subject: ShallowWrapper;
  let resourceStore: ResourceStore;
  let resourceActions: any;

  beforeEach(() => {
    resourceStore = new ResourceStore();

    resourceActions = {
      setResourcesInCategory: jest.fn()
    };

    subject = shallow(
      <ResourceList
        resourceStore={resourceStore}
        resourceActions={resourceActions}
        category={Category.Main}
      />
    );

  });

  it('should render links in a category from those stored in ResourceStore', () => {
    const resources = [
      new ResourceModel(1, 'https://www.google.com', 'Google', Category.Main),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', Category.Main),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay', Category.SituationalAwareness)
    ];

    resourceStore.setResources(resources);

    expect(subject.find('.resource').length).toBe(2);
  });
});