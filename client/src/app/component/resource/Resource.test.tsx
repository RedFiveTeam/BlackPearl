import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Resource } from './Resource';
import { ResourceModel } from './ResourceModel';
import { StyledResourceMenuContainer } from './ResourceMenuContainer';
import { Provider } from 'mobx-react';
import { EarthIcon } from '../../icon/EarthIcon';
import { FolderIcon } from '../../icon/FolderIcon';

describe('Resource', () => {
  let subject: ReactWrapper;
  let resource1: ResourceModel;
  let resource2: ResourceModel;
  let resourceStore: any;
  let resourceActions: any;
  let profileStore: any;
  let metricActions: any;

  metricActions = {};

  resourceStore = {};

  profileStore = {};

  resourceActions = {
    updateGivenResources: jest.fn()
  };

  beforeEach(() => {
    resource1 = new ResourceModel(1, 'https://www.google.com', 'Google', 1);
    resource2 = new ResourceModel(3, 'Y:/MyFolder/MyFile.txt', 'Local File', 1, 'CROSS.JORDAN.MIDDLE.0123456789');

    subject = mount(
      <Provider
        resourceStore={resourceStore}
        resourceActions={resourceActions}
        profileStore={profileStore}
        metricActions={metricActions}
      >
        <Resource
          resource={resource1}
          className="resource"
        />
      </Provider>
    );
  });

  it('should render an internet resource', () => {
    expect(subject.find('.title').text()).toBe(resource1.name);
    expect(subject.find('a').prop('href')).toBe(resource1.url);
    expect(subject.find(EarthIcon).exists()).toBeTruthy();
  });

  it('should render a local resource', () => {
    subject = mount(
      <Provider
        resourceStore={resourceStore}
        resourceActions={resourceActions}
        profileStore={profileStore}
        metricActions={metricActions}
      >
        <Resource
          resource={resource2}
          className="resource"
        />
      </Provider>
    );

    expect(subject.find('.title').text()).toBe(resource2.name);
    expect(subject.find('a').prop('href')).toBe('Y:/MyFolder/MyFile.txt');
    expect(subject.find(FolderIcon).exists()).toBeTruthy();
  });

  it('should render a the menu container menu', () => {
    expect(subject.find(StyledResourceMenuContainer).exists()).toBeTruthy();
  });
});