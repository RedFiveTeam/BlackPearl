import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { InformationCard } from './InformationCard';

describe('InformationCard', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <InformationCard
        imageServer="image.smil.mil"
        callOutFormat="| ONE | TWO | THREE |"
        imageServerJWICS="image.ic.gov"
        auabServer="auab.com"
        navcentServer="navcent.com"
        dsnNumber="123-4567"
        svoipNumber="123-456-7890(1234)"
        tsvoipNumber="123-1234"
        jwicsServer="irc://blackpearlisthegreatest"
      />
    );
  });

  it('should have a title ', () => {
    expect(subject.find('.cardTitle').text()).toBe('General Info');
  });

  it('should render a table with 3 rows and 8 cells', () => {
    expect(subject.find('.table').exists()).toBeTruthy();
    expect(subject.find('.row').length).toBe(3);
    expect(subject.find('.d').length).toBe(9);
  });

  it('should have the proper information in the proper places', () => {
    expect(subject.find('.imageServer').text()).toBe('image.smil.mil');
    expect(subject.find('.callOutFormat').text()).toBe('| ONE | TWO | THREE |');
    expect(subject.find('.imageServerJWICS').text()).toBe('image.ic.gov');
    expect(subject.find('.auabServer').text()).toBe('auab.com');
    expect(subject.find('.navcentServer').text()).toBe('navcent.com');
    expect(subject.find('.dsnNumber').text()).toBe('123-4567');
    expect(subject.find('.svoipNumber').text()).toBe('123-456-7890(1234)');
    expect(subject.find('.tsvoipNumber').text()).toBe('123-1234');
    expect(subject.find('.jwicsServer').text()).toBe('irc://blackpearlisthegreatest');
  });

});