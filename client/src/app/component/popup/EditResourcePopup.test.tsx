import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { ResourceModel } from '../../resource/ResourceModel';
import { StyledEditResourcePopup } from './EditResourcePopup';

describe('EditResourcePopup', () => {
  let subject: ReactWrapper;
  let resourceStore: any;
  let resourceActions: any;

  beforeEach(() => {
    resourceActions = {
      clearPendingEdit: jest.fn(),
      updateResource: jest.fn()
    };

    resourceStore = {
      pendingEdit: new ResourceModel(1, 'editMe.com', 'Edit Me')
    };

    subject = mount(<StyledEditResourcePopup resourceActions={resourceActions} resourceStore={resourceStore}/>);
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
});