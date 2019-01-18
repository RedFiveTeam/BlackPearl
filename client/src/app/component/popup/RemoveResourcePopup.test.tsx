import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { StyledRemoveResourcePopup } from './RemoveResourcePopup';
import { ResourceModel } from '../resource/ResourceModel';

describe('RemoveResourcePopup', () => {
  let subject: ReactWrapper;
  let resourceStore: any;
  let resourceActions: any;
  let metricActions: any;

  beforeEach(() => {
    metricActions = {
      logMetric: jest.fn()
    };

    resourceActions = {
      clearPendingDelete: jest.fn(),
      delete: jest.fn()
    };

    resourceStore = {
      pendingDelete: new ResourceModel(1, 'deleteMe.com', 'Delete Me')
    };

    subject = mount(
      <StyledRemoveResourcePopup
        resourceActions={resourceActions}
        resourceStore={resourceStore}
        metricActions={metricActions}
      />
    );
  });

  it('should close the popup when cancel is clicked', () => {
    subject.find('.cancelButton').simulate('click');
    expect(resourceActions.clearPendingDelete).toHaveBeenCalled();
  });

  it('should have a confirm button that deletes the resource', () => {
    subject.find('.confirmButton').simulate('click');
    expect(resourceActions.delete).toHaveBeenCalledWith(resourceStore.pendingDelete.id);
  });

  it('should render the correct title', () => {
    expect(subject.find('.pendingDeleteTitle').length).toBe(1);
  });
});