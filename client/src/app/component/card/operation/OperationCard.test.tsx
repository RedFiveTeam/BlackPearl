import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OperationCard } from './OperationCard';
import { OperationModel } from './OperationModel';
import { StyledOperation } from './Operation';
import { StyledAddOperationButton } from '../../button/AddOperationButton';

describe('OperationCard', () => {
  let subject: ShallowWrapper;
  let operationStore: any;

  beforeEach(() => {
    operationStore = {
      operations: [
        new OperationModel(1, 'OP One', 'Operation One', 'https://www.opone.com'),
        new OperationModel(2, 'OP Two', 'Operation Two', 'https://www.optwo.com')
      ]
    };

    subject = shallow(
      <OperationCard
        operationStore={operationStore}
      />
    );
  });

  it('should render a title', () => {
    expect(subject.find('.operationCardTitle').exists()).toBeTruthy();
  });

  it('should render operations', () => {
    expect(subject.find('.operationList').exists()).toBeTruthy();
    expect(subject.find(StyledOperation).length).toBe(2);
  });

  it('should render an add operation button', () => {
    expect(subject.find(StyledAddOperationButton).length).toBe(1);
  });
});