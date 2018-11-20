import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Operation } from './Operation';
import { OperationModel } from './OperationModel';
import { StyledDeleteButton } from '../../button/DeleteButton';
import { StyledEditButton } from '../../button/EditButton';
import { StyledOperationMenuContainer } from './OperationMenuContainer';

describe('Operation', () => {
  let subject: ShallowWrapper;
  let operation1: OperationModel;

  beforeEach(() => {
    operation1 = new OperationModel(1, 'Operation One', 'Operation One Description', 'www.opone.com');

    subject = shallow(
      <Operation
        operation={operation1}
        className="operation"
      />
    );
  });

  it('should render a list of operations', () => {
    expect(subject.find('.title').text()).toBe(operation1.title);
  });

  it('should render an operation description', () => {
    expect(subject.find('.description').text()).toBe(operation1.description);
  });

  it('should render and address', () => {
    expect(subject.find('a').prop('href')).toBe(operation1.address);
  });

  it('should render a three dot menu', () => {
    expect(subject.find(StyledOperationMenuContainer).exists()).toBeTruthy();
  });

  it('should hide the delete and edit button by default', () => {
    expect(subject.find(StyledDeleteButton).exists()).toBeFalsy();
    expect(subject.find(StyledEditButton).exists()).toBeFalsy();
  });
});