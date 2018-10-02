import * as React from 'react';
import { shallow } from 'enzyme';
import { Resource } from './Resource';
import { ResourceStore } from './stores/ResourceStore';
import { ResourceModel } from './ResourceModel';

describe('Resource', () => {
  let resourceStore: ResourceStore;

  beforeEach(() => {
    resourceStore = new ResourceStore();

    const resources = [
      new ResourceModel(1, 'https://www.google.com', 'Google'),
      new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo'),
      new ResourceModel(3, 'https://www.ebay.com', 'eBay')
    ];

    resourceStore.setResources(resources);
  });

  it('should render a list of links', () => {
    const subject = shallow((
      <Resource
        name="Google"
        url="http://google.com"
        className="resource"
      />
    ));

    expect(subject.find('a').length).toBe(1);
    expect(subject.find('a').at(0).text()).toBe('Google');
    expect(subject.find('a').at(0).html()).toContain('href="http://google.com"');
  });
});