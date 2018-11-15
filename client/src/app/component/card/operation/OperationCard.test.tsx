import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OperationCard } from './OperationCard';
import { OperationModel } from './OperationModel';
import { StyledOperation } from './Operation';

describe('OperationCard', () => {
  let subject: ShallowWrapper;
  let operationStore: any;

  beforeEach(() => {
    operationStore = {
      operations: [
        new OperationModel(1, 'OP One', 'Operation One'),
        new OperationModel(2, 'OP Two', 'Operation Two')
      ]
    };

    subject = shallow(
      <OperationCard
        operationStore={operationStore}
      />
    );
  });

  it('should render a title', () => {
    expect(subject.find('.operationCardTitle').text()).toBe('Current Operations');
  });

  it('should render operations', () => {
    expect(subject.find('.operationList').exists()).toBeTruthy();
    expect(subject.find(StyledOperation).length).toBe(2);
  });
});