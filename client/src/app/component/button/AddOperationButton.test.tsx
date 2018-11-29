import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AddOperationIcon } from '../../icon/addOperationIcon';
import { StyledButton } from './Button';
import { AddOperationButton } from './AddOperationButton';

describe('AddOperationButton', () => {
  let subject: ShallowWrapper;
  let operationActions: any;

  beforeEach(() => {

    operationActions = {
      createPendingOperation: jest.fn(),
    };

    subject = shallow(<AddOperationButton operationActions={operationActions}/>);

  });

  it('should should display an add operation popup', () => {
    subject.find(StyledButton).simulate('click');
    expect(operationActions.createPendingOperation).toHaveBeenCalled();
  });

  it('should have an add operation icon', () => {
    expect(subject.find(AddOperationIcon).exists()).toBeTruthy();
  });
});
