import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ATODay } from './ATODay';

describe('ATODay', () => {
  let subject: ShallowWrapper;
  let timeStore: any;

  beforeEach(() => {
    timeStore =  {
      atoDay: jest.fn()
    };

    subject = shallow(
      <ATODay
        timeStore={timeStore}
      />
    );
  });

  it('should render an ATO Day', () => {
    expect(subject.find('.atoDay').exists()).toBeTruthy();
  });
});