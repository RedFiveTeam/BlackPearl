import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ATODay } from './ATODay';
import { TimeActions } from '../../utils/TimeActions';

describe('ATODay', () => {
  let subject: ShallowWrapper;
  let timeActions: TimeActions;

  beforeEach(() => {
    timeActions = new TimeActions();

    subject = shallow(
      <ATODay
        timeActions={timeActions}
      />
    );
  });

  it('should render an ATO Day', () => {
    expect(subject.find('.atoDay').text()).toMatch(/ATO [A-Z]{2}/);
  });
});