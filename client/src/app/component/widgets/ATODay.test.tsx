import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ATODay } from './ATODay';

describe('ATODay', () => {
  let subject: ShallowWrapper;
  let timeActions: any;

  beforeEach(() => {
    timeActions =  {
      returnATODay: jest.fn()
    };

    subject = shallow(
      <ATODay
        timeActions={timeActions}
      />
    );
  });

  it('should render an ATO Day', () => {
    expect(subject.find('.atoDay').exists()).toBeTruthy();
    expect(timeActions.returnATODay).toHaveBeenCalled();
  });
});