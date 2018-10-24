import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Acronym } from './Acronym';

describe('Acronym', () => {
  let subject: ShallowWrapper;
  let acronym: string;

  beforeEach(() => {
    acronym = 'AAA - Aaron Allon Arnold';

    subject = shallow(
      <Acronym
        acronym={acronym}
        className="acronym"
      />
    );
  });

  it('should render an acronym with definition', () => {
    expect(subject.find('.acronym').exists()).toBeTruthy();
    expect(subject.find('.acronym').html()).toContain('AAA - Aaron Allon Arnold');
  });
});