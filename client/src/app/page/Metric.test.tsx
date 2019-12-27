import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Metric } from './Metric';

describe('Metric', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <Metric
        title={'title'}
        value={42}
      />
    );
  });
  it('should display the given title', () => {
    expect(subject.text()).toContain('title');
  });

  it('should display the given count', () => {
    expect(subject.text()).toContain('42');
  });
});