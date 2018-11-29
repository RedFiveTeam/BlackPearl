import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { DeleteOperationPopup } from './DeleteOperationPopup';
import { OperationModel } from '../card/operation/OperationModel';

describe('DeleteOperationPopup', () => {
  let subject: ReactWrapper;
  let operationActions: any;
  let operationStore: any;

  beforeEach(() => {
    operationActions = {
      deleteOperation: jest.fn(),
      clearPendingDelete: jest.fn()
    };

    operationStore = {
      pendingDelete: new OperationModel(1, 'Test', 'This is a test', 'https://www.google.com')
    };

    subject = mount(<DeleteOperationPopup operationActions={operationActions} operationStore={operationStore}/>);
  });

  it('should close the popup when cancel is clicked', () => {
    subject.find('.cancelButton').simulate('click');
    expect(operationActions.clearPendingDelete).toHaveBeenCalled();
  });

  it('should render the correct title', () => {
    expect(subject.find('.pendingDeleteTitle').length).toBe(1);
  });

  it('should have a confirm that deletes an operation', () => {
    subject.find('.confirmButton').simulate('click');
    expect(operationActions.deleteOperation).toHaveBeenCalledWith(operationStore.pendingDelete.id);
  });
});