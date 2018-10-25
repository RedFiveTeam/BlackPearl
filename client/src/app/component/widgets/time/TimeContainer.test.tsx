import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TimeContainer } from './TimeContainer';
import { StyledATODay } from './ATODay';
import { StyledTZClock } from './TZClock';
import { StubTimeRepository } from '../../../utils/time/repositories/StubTimeRepository';

describe('TimeContainer', () => {
  let subject: ShallowWrapper;
  let timeStore: any;
  let timeActions: any;
  let timeRepository: StubTimeRepository;

  beforeEach(async () => {
    timeRepository = new StubTimeRepository();

    let timeObj = await timeRepository.getTime();

    timeStore = {
      zones: timeObj.zones,
      time: '135123512'
    };

    timeActions = {
      returnCurrentTime: jest.fn()
    };

    subject = shallow(
      <TimeContainer
        timeStore={timeStore}
        timeActions={timeActions}
      />
    );
  });

  it('should render an ATO date', () => {
    expect(subject.find(StyledATODay).exists()).toBeTruthy();
  });

  it('should render six clocks', () => {
    expect(subject.find(StyledTZClock).length).toBe(2);
  });
});