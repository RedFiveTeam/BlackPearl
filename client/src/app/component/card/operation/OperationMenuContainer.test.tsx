import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OperationMenuContainer } from './OperationMenuContainer';
import { StyledEditButton } from '../../button/EditButton';
import { OperationMenuStore } from './stores/OperationMenuStore';
import { OperationModel } from './OperationModel';
import { StyledDeleteButton } from '../../button/DeleteButton';

describe('OperationMenuContainer', () => {
  let subject: ShallowWrapper;
  let operationMenuStore: OperationMenuStore;
  let operation: OperationModel;

  beforeEach(() => {
    operation = new OperationModel();
    operationMenuStore = new OperationMenuStore();

    subject = shallow(
      <OperationMenuContainer
        operation={operation}
        operationMenuStore={operationMenuStore}
      />);
  });

  it('should render an edit and delete icon', () => {
    expect(subject.find(StyledEditButton).exists()).toBeTruthy();
    expect(subject.find(StyledDeleteButton).exists()).toBeTruthy();
  });

});