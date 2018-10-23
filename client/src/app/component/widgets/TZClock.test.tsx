import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TZClock } from './TZClock';

describe('TZClock', () => {
  let subject: ShallowWrapper;
  let timeActions: any;
  let timeStore: any;

  beforeEach(() => {
    timeActions = {
      returnCurrentTime: jest.fn()
    };

    timeStore = {
      time: '1540305246'
    };

    subject = shallow(
      <TZClock
        title="Local"
        timeZone="America/New_York"
        timeActions={timeActions}
        timeStore={timeStore}
      />
    );
  });

  it('should render a place', () => {
    expect(subject.find('.title').exists()).toBeTruthy();
    expect(subject.find('.title').text()).toBe('Local');
  });

  it('should render a time', () => {
    expect(subject.find('.time').exists()).toBeTruthy();
    expect(timeActions.returnCurrentTime).toHaveBeenCalled();
  });

});