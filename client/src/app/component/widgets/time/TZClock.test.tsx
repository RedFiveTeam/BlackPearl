import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TZClock } from './TZClock';

describe('TZClock', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <TZClock
        title="Local"
        time="0123"
      />
    );
  });

  it('should render a place', () => {
    expect(subject.find('.title').exists()).toBeTruthy();
    expect(subject.find('.title').text()).toBe('Local');
  });

  it('should render a time', () => {
    expect(subject.find('.time').exists()).toBeTruthy();
    expect(subject.find('.time').text()).toBe('0123');
  });

});