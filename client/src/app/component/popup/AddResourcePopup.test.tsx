import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { StyledAddResourcePopup } from './AddResourcePopup';

describe('AddResourcePopup', () => {
  let subject: ReactWrapper;
  let resourceActions: any;

  beforeEach(() => {
    resourceActions = {
      saveResource: jest.fn(),
      clearPendingResource: jest.fn(),
      updatePendingResource: jest.fn()
    };

    subject = mount(<StyledAddResourcePopup resourceActions={resourceActions}/>);
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
    subject.find('.saveButton').simulate('click');
    expect(resourceActions.saveResource).toHaveBeenCalled();
  });
});