import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { ResourceModel } from '../resource/ResourceModel';
import { StyledEditResourcePopup } from './EditResourcePopup';

describe('EditResourcePopup', () => {
  let subject: ReactWrapper;
  let resourceStore: any;
  let resourceActions: any;
  let metricActions: any;
  let profileStore: any;

  beforeEach(() => {
    metricActions = {
      logMetric: jest.fn()
    };

    resourceActions = {
      clearPendingEdit: jest.fn(),
      updateResource: jest.fn()
    };

    profileStore = {
      profile: {accountID: 'GUEST.GUEST.GUEST.0123456789'}
    };

    resourceStore = {
      pendingEdit: new ResourceModel(1, 'https://www.editMe.com', 'Edit Me')
    };

    subject = mount(
      <StyledEditResourcePopup
        resourceActions={resourceActions}
        resourceStore={resourceStore}
        profileStore={profileStore}
        metricActions={metricActions}
      />
    );
  });

  it('should close the popup when cancel is clicked', () => {
    subject.find('.cancelButton').simulate('click');
    expect(resourceActions.clearPendingEdit).toHaveBeenCalled();
  });

  it('should have a confirm button that edits the resource', () => {
    subject.find('.saveButton').simulate('click');
    expect(resourceActions.updateResource).toHaveBeenCalled();
  });

  it('should render the title', () => {
    expect(subject.find('.pendingEditTitle').length).toBe(1);
  });

  it('should render the url', () => {
    expect(subject.find('.pendingEditUrl').length).toBe(1);
  });

  it('should stop you from inputting an invalid url', async () => {
    subject.find('.pendingEditUrl').simulate('change', {target: {value: 'www.google.com'}});
    subject.find('.saveButton').simulate('click');
    expect(subject.find('.urlError').text()).toBe('Please enter a valid address (https://www...)');
  });

  it('should stop you from inputting an empty title and url', () => {
    subject.find('.pendingEditTitle').simulate('change', {target: {value: ''}});
    subject.find('.pendingEditUrl').simulate('change', {target: {value: ''}});
    subject.find('.saveButton').simulate('click');
    expect(subject.find('.titleError').html()).toContain('Please enter a title');
    expect(subject.find('.urlError').text()).toBe('Please enter an address');
  });
});