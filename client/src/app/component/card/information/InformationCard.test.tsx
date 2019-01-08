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

  it('should render a table with 3 rows and 9 cells', () => {
    expect(subject.find('.cardContent').exists()).toBeTruthy();
    expect(subject.find('.row').length).toBe(3);
    expect(subject.find('.cell').length).toBe(9);
  });

  it('should have the proper information in the proper places', () => {
    expect(subject.find('.cell').at(0).text()).toContain('image.smil.mil');
    expect(subject.find('.cell').at(1).text()).toContain('image.ic.gov');
    expect(subject.find('.cell').at(2).text()).toContain('| ONE | TWO | THREE |');
    expect(subject.find('.cell').at(3).text()).toContain('irc://blackpearlisthegreatest');
    expect(subject.find('.cell').at(4).text()).toContain('auab.com');
    expect(subject.find('.cell').at(5).text()).toContain('navcent.com');
    expect(subject.find('.cell').at(6).text()).toContain('123-4567');
    expect(subject.find('.cell').at(7).text()).toContain('123-456-7890(1234)');
    expect(subject.find('.cell').at(8).text()).toContain('123-1234');
  });

});