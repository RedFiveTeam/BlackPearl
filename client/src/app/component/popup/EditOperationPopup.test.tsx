import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { EditOperationPopup } from './EditOperationPopup';
import { OperationModel } from '../card/operation/OperationModel';

describe('EditOperationPopup', () => {
  let subject: ReactWrapper;
  let operationStore: any;
  let operationActions: any;
  let metricActions: any;

  beforeEach(() => {
    metricActions = {
      logMetric: jest.fn()
    };

    operationActions = {
      updateOperation: jest.fn(),
      clearPendingEdit: jest.fn()
    };

    operationStore = {
      pendingEdit: new OperationModel(1, '', '', '')
    };

    subject = mount(
      <EditOperationPopup
        operationActions={operationActions}
        operationStore={operationStore}
        metricActions={metricActions}
      />
    );
  });

  it('should close the popup when cancel is clicked', () => {
    subject.find('.cancelButton').simulate('click');
    expect(operationActions.clearPendingEdit).toHaveBeenCalled();
  });

  it('should have a confirm button that edits the resource', () => {
    subject.find('.saveButton').simulate('click');
    expect(operationActions.updateOperation).toHaveBeenCalled();
  });

  it('should render the title', () => {
    expect(subject.find('.pendingEditTitle').length).toBe(1);
  });

  it('should render the description', () => {
    expect(subject.find('.pendingEditAddress').length).toBe(1);
  });

  it('should render the url', () => {
    expect(subject.find('.pendingEditAddress').length).toBe(1);
  });

});