import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Acronym } from './Acronym';

describe('Acronym', () => {
  let subject: ShallowWrapper;
  let acronym: string;
  let click: (e: any) => void;

  beforeEach(() => {
    acronym = 'AAA - Aaron Allon Arnold';

    click = (e: any) => { return; };

    subject = shallow(
      <Acronym
        acronym={acronym}
        className="acronym"
        onClick={click}
      />
    );
  });

  it('should render an acronym with definition', () => {
    expect(subject.find('.acronym').exists()).toBeTruthy();
    expect(subject.find('.acronym').html()).toContain('AAA - Aaron Allon Arnold');
  });
});