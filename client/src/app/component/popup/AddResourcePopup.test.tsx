import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { StyledAddResourcePopup } from './AddResourcePopup';
import { ResourceModel } from '../resource/ResourceModel';

describe('AddResourcePopup', () => {
  let subject: ReactWrapper;
  let resourceActions: any;
  let metricActions: any;
  let resourceStore: any;

  beforeEach(() => {
    metricActions = {
      logMetric: jest.fn()
    };

    resourceActions = {
      saveResource: jest.fn(),
      clearPendingResource: jest.fn(),
      updatePendingResource: jest.fn(),
      checkDuplicates: () => { return false; }
    };

    resourceStore = {
      pendingResource: new ResourceModel()
    };

    subject = mount(
      <StyledAddResourcePopup
        resourceActions={resourceActions}
        metricActions={metricActions}
        resourceStore={resourceStore}
      />
    );
  });

  it('should close the popup when cancel is clicked', () => {
    subject.find('.cancelButton').simulate('click');
    expect(resourceActions.clearPendingResource).toHaveBeenCalled();
  });

  it('should render a title field', () => {
    expect(subject.find('.titleField').length).toBe(1);
  });

  it('should render a url field', () => {
    expect(subject.find('.urlField').length).toBe(1);
  });

  it('should render a save button', () => {
    expect(subject.find('.saveButton').length).toBe(1);
  });

  it('should save pending resource with information', () => {
    subject.find('.urlField').simulate('change', {target: {value: 'https://www.google.com'}});
    subject.find('.titleField').simulate('change', {target: {value: 'NewGoogle'}});
    subject.find('.saveButton').simulate('click');
    expect(resourceActions.saveResource).toHaveBeenCalled();
  });

  it('should stop you from inputting an invalid url', async () => {
    subject.find('.urlField').simulate('change', {target: {value: 'www.google.com'}});
    subject.find('.saveButton').simulate('click');
    expect(subject.find('.urlError').text()).toBe('Please enter a valid address (https://www...)');
  });

  it('should stop you from inputting an empty title and url', () => {
    subject.find('.saveButton').simulate('click');
    expect(subject.find('.titleError').text()).toBe('Please enter a title');
    expect(subject.find('.urlError').text()).toBe('Please enter an address');
  });
});