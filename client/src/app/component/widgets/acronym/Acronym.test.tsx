import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Acronym } from './Acronym';

describe('Acronym', () => {
  let subject: ShallowWrapper;
  let acronym: string;
  let definition: string;

  beforeEach(() => {
    acronym = 'AAA';
    definition = 'Aaron Allon Arnold';

    subject = shallow(
      <Acronym
        acronym={acronym}
        definition={definition}
        className="acronym"
      />
    );
  });

  it('should render an acronym with definition', () => {
    expect(subject.find('.acronym').exists()).toBeTruthy();
    expect(subject.find('.acronym').text()).toContain('AAA - Aaron Allon Arnold');
  });
});