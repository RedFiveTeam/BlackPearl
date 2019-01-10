import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { BlameTab } from './BlameTab';
import { BlameModel } from '../../../resource/blame/BlameModel';
const moment = require('moment-timezone');

describe('BlameTab', () => {
  let subject: ShallowWrapper;
  let adminStore: any;
  let adminActions: any;

  beforeEach(() => {
    adminActions = {
      initializeStores: jest.fn()
    };

    adminStore = {
      blames: [
        new BlameModel(1, 'ADD', 'Google', 'TOM', 1542726000),
        new BlameModel(1, 'EDIT', 'Google', 'TOM', 1542727000),
        new BlameModel(1, 'DELETE', 'Google', 'TOM', 1542728000)
      ]
    };

    subject = shallow(
      <BlameTab
        adminStore={adminStore}
        adminActions={adminActions}
      />
    );
  });

  it('should have a list of blame lines', () => {
    expect(subject.find('table').exists()).toBeTruthy();
    expect(subject.find('table > tbody > tr').length).toBe(3);
  });

  it('should have a timestamp', () => {
    expect(subject.html()).toContain(moment.unix(1542726000).format('DD MMMM YYYY @HHmm') + 'L');
    expect(subject.html()).toContain(moment.unix(1542727000).format('DD MMMM YYYY @HHmm') + 'L');
    expect(subject.html()).toContain(moment.unix(1542728000).format('DD MMMM YYYY @HHmm') + 'L');
  });

  it('should have a title', () => {
    expect(subject.find('.recentChangesTitle').text()).toBe('Recent Changes');
  });

  it('should parse a name', () => {
    expect((subject.instance() as BlameTab).parseName('LAST.FIRST.MIDDLE.0123456789')).toBe('Last, First');
    expect((subject.instance() as BlameTab).parseName('GUEST.GUEST.GUEST.0123456789')).toBe('Guest');
  });

});