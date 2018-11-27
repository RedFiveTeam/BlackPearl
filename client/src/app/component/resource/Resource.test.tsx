import * as React from 'react';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { Resource } from './Resource';
import { PearlIcon } from '../../icon/PearlIcon';
import { StyledDeleteButton } from '../button/DeleteButton';
import { ResourceModel } from './ResourceModel';
import { StyledEditButton } from '../button/EditButton';
import { StyledResourceMenuContainer } from './ResourceMenuContainer';
import { FavoriteIcon } from '../../icon/FavoriteIcon';
import { Provider } from 'mobx-react';

describe('Resource', () => {
  let subject: ReactWrapper;
  let subjectShallow: ShallowWrapper;
  let resource1: ResourceModel;
  let resource2: ResourceModel;
  let resource3: ResourceModel;
  let resourceStore: any;
  let resourceActions: any;
  let profileStore: any;

  resourceStore = {};

  profileStore = {};

  resourceActions = {
    updateGivenResources: jest.fn()
  };

  beforeEach(() => {
    resource1 = new ResourceModel(1, 'https://www.google.com', 'Google', 1);
    resource2 = new ResourceModel(2, 'https://www.google.com', 'My Google', 0, 'CROSS.JORDAN.MIDDLE.0123456789');
    resource3 = new ResourceModel(3, 'Y:/MyFolder/MyFile.txt', 'Local File', 1, 'CROSS.JORDAN.MIDDLE.0123456789');

    subject = mount(
      <Provider resourceStore={resourceStore} resourceActions={resourceActions} profileStore={profileStore}>
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
  });

  it('should render a local resource', () => {
    subject = mount(
      <Provider resourceStore={resourceStore} resourceActions={resourceActions} profileStore={profileStore}>
        <Resource
          resource={resource3}
          className="resource"
        />
      </Provider>
    );

    expect(subject.find('.title').text()).toBe(resource3.name);
    expect(subject.find('a').prop('href')).toBeFalsy();
  });

  it('should render a pearl icon or favorite icon', () => {
    expect(subject.find(PearlIcon).exists()).toBeTruthy();

    subjectShallow = shallow(
      <Resource
        resource={resource2}
        className="resource"
      />
    );

    expect(subjectShallow.find(FavoriteIcon).exists()).toBeTruthy();
  });

  it('should render a three dot menu', () => {
    expect(subject.find(StyledResourceMenuContainer).exists()).toBeTruthy();
  });

  it('should hide the delete and edit button by default', () => {
    expect(subject.find(StyledDeleteButton).exists()).toBeFalsy();
    expect(subject.find(StyledEditButton).exists()).toBeFalsy();
  });
});