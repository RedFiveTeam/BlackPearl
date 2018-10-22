import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Resource } from './Resource';
import { PearlIcon } from '../icon/PearlIcon';
import { StyledDeleteButton } from '../component/button/DeleteButton';
import { ResourceModel } from './ResourceModel';
import { StyledEditButton } from '../component/button/EditButton';
import { StyledResourceMenuContainer } from './ResourceMenuContainer';

describe('Resource', () => {
  let subject: ShallowWrapper;
  const resource = new ResourceModel(1, 'metoogle.com', 'Google');

  beforeEach(() => {
    subject = shallow(
      <Resource
        resource={resource}
        className="resource"
      />
    );
  });

  it('should render a list of links', () => {
    expect(subject.find('.title').text()).toBe(resource.name);
    expect(subject.find('a').prop('href')).toBe(resource.url);
  });

  it('should render a pearl icon', () => {
    expect(subject.find(PearlIcon).exists()).toBeTruthy();
  });

  it('should render a three dot menu', () => {
    expect(subject.find(StyledResourceMenuContainer).exists()).toBeTruthy();
  });

  it('should hide the delete and edit button by default', () => {
    expect(subject.find(StyledDeleteButton).exists()).toBeFalsy();
    expect(subject.find(StyledEditButton).exists()).toBeFalsy();
  });
});