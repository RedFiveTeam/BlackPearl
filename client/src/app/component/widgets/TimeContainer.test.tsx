import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TimeContainer } from './TimeContainer';
import { StyledATODay } from './ATODay';
import { StyledTZClock } from './TZClock';

describe('TimeContainer', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<TimeContainer/>);
  });

  it('should render an ATO date', () => {
    expect(subject.find(StyledATODay).exists()).toBeTruthy();
  });

  it('should render six clocks', () => {
    expect(subject.find(StyledTZClock).length).toBe(6);
  });

});