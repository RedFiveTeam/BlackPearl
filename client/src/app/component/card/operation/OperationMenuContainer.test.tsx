import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OperationMenuContainer } from './OperationMenuContainer';
import { StyledEditButton } from '../../button/EditButton';
import { OperationModel } from './OperationModel';
import { StyledDeleteButton } from '../../button/DeleteButton';

describe('OperationMenuContainer', () => {
  let subject: ShallowWrapper;
  let operation: OperationModel;

  beforeEach(() => {
    operation = new OperationModel();

    subject = shallow(
      <OperationMenuContainer
        operation={operation}
      />);
  });

  it('should render an edit and delete icon', () => {
    expect(subject.find(StyledEditButton).exists()).toBeTruthy();
    expect(subject.find(StyledDeleteButton).exists()).toBeTruthy();
  });

});