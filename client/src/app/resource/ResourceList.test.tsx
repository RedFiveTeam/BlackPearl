import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ResourceStore } from './stores/ResourceStore';
import { ResourceModel } from './ResourceModel';
import { ResourceList } from './ResourceList';

describe('ResourceList', () => {
  let subject: ShallowWrapper;
  let resourceStore: ResourceStore;

  beforeEach(() => {
    resourceStore = new ResourceStore();

    const resources = [
      new ResourceModel(1, 'https://www.google.com', 'Google'),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo'),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay')
    ];

    resourceStore.setResources(resources);

    subject = shallow(<ResourceList resourceStore={resourceStore}/>);

  });

  it('should render a list of links', () => {

    expect(subject.find('.resource').length).toBe(3);
  });
});