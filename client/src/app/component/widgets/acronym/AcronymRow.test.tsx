import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AcronymRow } from './AcronymRow';
import { AcronymModel } from './AcronymModel';

describe('AcronymRow', () => {
  let subject: ShallowWrapper;
  let acronym: AcronymModel;

  beforeEach(() => {
    acronym = new AcronymModel(null, 'AAA', 'Aaron Allon Arnold', 'AAA - Aaron Allon Arnold');

    subject = shallow(
      <AcronymRow
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