import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ResourceStore } from './stores/ResourceStore';
import { ResourceModel } from './ResourceModel';
import { ResourceList } from './ResourceList';
import { ResourceActions } from './actions/ResourceActions';
import { StubRepositories } from '../utils/Repositories';
import { stores } from '../utils/Stores';

describe('ResourceList', () => {
  let subject: ShallowWrapper;
  let resourceStore: ResourceStore;
  let resourceActions: ResourceActions;

  beforeEach(() => {
    resourceStore = new ResourceStore();
    resourceActions = new ResourceActions(stores, StubRepositories);

    const resources = [
      new ResourceModel(1, 'https://www.google.com', 'Google'),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo'),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay')
    ];

    resourceStore.setResources(resources);

    subject = shallow(<ResourceList resourceStore={resourceStore} resourceActions={resourceActions}/>);

  });

  it('should render a list of links', () => {
    expect(subject.find('.resource').length).toBe(3);
  });

  it('should render a add resource button', () => {
    expect(subject.find('.addResourceButton').length).toBe(1);
  });
});