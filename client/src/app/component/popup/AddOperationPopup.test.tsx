import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { StyledAddOperationPopup } from './AddOperationPopup';

describe('AddOperationPopup', () => {
  let subject: ReactWrapper;
  let operationActions: any;
  let metricActions: any;

  beforeEach(() => {
    metricActions = {
      logMetric: jest.fn()
    };

    operationActions = {
      clearPendingOperation: jest.fn(),
      updatePendingOperation: jest.fn(),
      saveOperation: jest.fn()
    };

    subject = mount(<StyledAddOperationPopup operationActions={operationActions} metricActions={metricActions}/>);
  });

  it('should render a title field', () => {
    expect(subject.find('.titleField').length).toBe(1);
  });

  it('should render a description field', () => {
    expect(subject.find('.descriptionField').length).toBe(1);
  });

  it('should render a address field', () => {
    expect(subject.find('.addressField').length).toBe(1);
  });

  it('should render a save button', () => {
    expect(subject.find('.saveButton').length).toBe(1);
  });

  it('should close the popup when cancel is clicked', () => {
    subject.find('.cancelButton').simulate('click');
    expect(operationActions.clearPendingOperation).toHaveBeenCalled();
  });

  it('should save a pending operation', () => {
    subject.find('.titleField').simulate('change', {target: {value: 'New Test Op'}});
    subject.find('.descriptionField').simulate('change', {target: {value: 'This is the New Test Operation'}});
    subject.find('.addressField').simulate('change', {target: {value: 'https://www.newtestop.com'}});
    subject.find('.saveButton').simulate('click');
    expect(operationActions.saveOperation).toHaveBeenCalled();
  });
});