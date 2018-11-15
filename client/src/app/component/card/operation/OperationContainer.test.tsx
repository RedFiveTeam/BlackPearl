import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OperationContainer } from './OperationContainer';
import { StyledOperationCard } from './OperationCard';

describe('OperationContainer', () => {
  let subject: ShallowWrapper;
  let operationActions: any;

  beforeEach(() => {
    operationActions = {
      setupOperations: jest.fn()
    };
    subject = shallow(
      <OperationContainer
        operationActions={operationActions}
      />
    );
  });

  it('should setup operations on mount', () => {
    expect(operationActions.setupOperations).toHaveBeenCalled();
  });

  it('should have a operation card', () => {
    expect(subject.find(StyledOperationCard).exists()).toBeTruthy();
  });

});