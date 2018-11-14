import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Resource } from './Resource';
import { PearlIcon } from '../../icon/PearlIcon';
import { StyledDeleteButton } from '../button/DeleteButton';
import { ResourceModel } from './ResourceModel';
import { StyledEditButton } from '../button/EditButton';
import { StyledResourceMenuContainer } from './ResourceMenuContainer';
import { FavoriteIcon } from '../../icon/FavoriteIcon';

describe('Resource', () => {
  let subject: ShallowWrapper;
  let resource1: ResourceModel;
  let resource2: ResourceModel;

  beforeEach(() => {
    resource1 = new ResourceModel(1, 'https://www.google.com', 'Google', 1);
    resource2 = new ResourceModel(2, 'https://www.google.com', 'My Google', 0, 'JORDAN');

    subject = shallow(
      <Resource
        resource={resource1}
        className="resource"
      />
    );
  });

  it('should render a list of links', () => {
    expect(subject.find('.title').text()).toBe(resource1.name);
    expect(subject.find('a').prop('href')).toBe(resource1.url);
  });

  it('should render a pearl icon or favorite icon', () => {
    expect(subject.find(PearlIcon).exists()).toBeTruthy();

    subject = shallow(
      <Resource
        resource={resource2}
        className="resource"
      />
    );

    expect(subject.find(FavoriteIcon).exists()).toBeTruthy();
  });

  it('should render a three dot menu', () => {
    expect(subject.find(StyledResourceMenuContainer).exists()).toBeTruthy();
  });

  it('should hide the delete and edit button by default', () => {
    expect(subject.find(StyledDeleteButton).exists()).toBeFalsy();
    expect(subject.find(StyledEditButton).exists()).toBeFalsy();
  });
});