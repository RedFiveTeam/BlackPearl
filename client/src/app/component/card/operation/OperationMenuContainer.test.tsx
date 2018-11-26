import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OperationMenuContainer } from './OperationMenuContainer';
import { StyledThreeDotButton } from '../../button/ThreeDotButton';
import { StyledEditButton } from '../../button/EditButton';
import { OperationMenuStore } from './stores/OperationMenuStore';
import { OperationModel } from './OperationModel';
import { StyledDeleteButton } from '../../button/DeleteButton';
import { BorderIcon } from '../../../icon/BorderIcon';

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

  it('should render a three dot button', () => {
    expect(subject.find(StyledThreeDotButton).exists()).toBeTruthy();
  });

  it('should render an edit and delete icon when the three dot button is clicked', () => {
    subject.find(StyledThreeDotButton).simulate('click');
    expect(subject.find(StyledEditButton).exists()).toBeTruthy();
    expect(subject.find(BorderIcon).exists()).toBeTruthy();
    expect(subject.find(StyledDeleteButton).exists()).toBeTruthy();
    subject.find(StyledThreeDotButton).simulate('click');
    expect(subject.find(StyledEditButton).exists()).toBeFalsy();
    expect(subject.find(BorderIcon).exists()).toBeFalsy();
    expect(subject.find(StyledDeleteButton).exists()).toBeFalsy();
  });

});