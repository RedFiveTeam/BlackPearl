import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { InformationCard } from './InformationCard';

describe('InformationCard', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<InformationCard/>);
  });

  it('should have a title ', () => {
    expect(subject.find('.cardTitle').text()).toBe('General Info');
  });

  it('should render a table with 3 rows and 8 cells', () => {
    expect(subject.find('table').exists()).toBeTruthy();
    expect(subject.find('tr').length).toBe(3);
    expect(subject.find('td').length).toBe(8);
  });

});