import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ResourceMenuContainer } from './ResourceMenuContainer';
import { StyledThreeDotButton } from '../component/button/ThreeDotButton';
import { StyledDeleteButton } from '../component/button/DeleteButton';
import { StyledEditButton } from '../component/button/EditButton';
import { ResourceModel } from './ResourceModel';
import { ResourceMenuStore } from './stores/ResourceMenuStore';

describe('ResourceMenuContainer', () => {
  let subject: ShallowWrapper;
  let resource: ResourceModel;
  let resourceActions: any;
  let resourceMenuStore: ResourceMenuStore;

  beforeEach(() => {
    resource = new ResourceModel();
    resourceMenuStore = new ResourceMenuStore();

    resourceActions = {
      createPendingEdit: jest.fn(),
      createPendingDelete: jest.fn()
    };

    subject = shallow(
      <ResourceMenuContainer
        resource={resource}
        resourceMenuStore={resourceMenuStore}
        resourceActions={resourceActions}
      />
    );
  });

  it('should trigger a edit action on edit button click', () => {
    resourceMenuStore.menuVisibilityOn();
    subject.find(StyledEditButton).simulate('click');
    expect(resourceActions.createPendingEdit).toHaveBeenCalledWith(resource);
  });

  it('should trigger a delete action on click', () => {
    resourceMenuStore.menuVisibilityOn();
    subject.find(StyledDeleteButton).simulate('click');
    expect(resourceActions.createPendingDelete).toHaveBeenCalledWith(resource);
  });

  it('should render a three dot button', () => {
    expect(subject.find(StyledThreeDotButton).exists()).toBeTruthy();
  });

  it('should not render the full menu by default', () => {
    expect(subject.find(StyledDeleteButton).exists()).toBeFalsy();
    expect(subject.find(StyledEditButton).exists()).toBeFalsy();
  });

  it('should toggle the full menu when the three dot button is clicked', () => {
    subject.find(StyledThreeDotButton).simulate('click');
    expect(subject.find(StyledDeleteButton).exists()).toBeTruthy();
    expect(subject.find(StyledEditButton).exists()).toBeTruthy();
    subject.find(StyledThreeDotButton).simulate('click');
    expect(subject.find(StyledDeleteButton).exists()).toBeFalsy();
    expect(subject.find(StyledEditButton).exists()).toBeFalsy();
  });
});