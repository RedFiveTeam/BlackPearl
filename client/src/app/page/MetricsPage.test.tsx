import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsPage } from './MetricsPage';
import Mock = jest.Mock;
import { LoginModel } from '../component/metrics/login/LoginModel';
import { UserModel } from '../component/metrics/user/UserModel';
import * as moment from 'moment';
import { Moment } from 'moment';

describe('MetricsPage', () => {
  let subject: ShallowWrapper;
  let metricsStore: any;
  let metricsActions: any;
  let initSpy: Mock;
  let loginTime: Moment;

  beforeEach(() => {
    initSpy = jest.fn();
    loginTime = moment('2018-08-22T00:00:00.000Z').utc();

    metricsActions = {
      initializeStores: initSpy
    };

    metricsStore = {
      userCount: 2,
      logins: [
        new LoginModel(new UserModel(1, 'name1', 'card1'), loginTime),
        new LoginModel(new UserModel(2, 'name2', 'card2'), loginTime),
        new LoginModel(new UserModel(3, 'name3', 'card3'), loginTime),
      ]
    };

    subject = shallow(
      <MetricsPage
        metricsActions={metricsActions}
        metricsStore={metricsStore}
      />
    );
  });
  it('should display a title', () => {
    expect(subject.find('.users').text()).toContain('Total user accounts:');
  });

  it('should display the number of users', () => {
    expect(subject.find('.users').text()).toContain('2');
  });

  it('should display a login table with headers and 3 rows', () => {
    expect(subject.find('table').exists()).toBeTruthy();
    expect(subject.find('tr').length).toBe(4);
  });

  it('should display table headers', () => {
    const row = subject.find('tr').at(0);
    expect(row.find('th').length).toBe(3);
    expect(row.find('th').at(0).text()).toBe('ID');
    expect(row.find('th').at(1).text()).toBe('Name');
    expect(row.find('th').at(2).text()).toEqual('Time');
  });

  it('should display login information in each row', () => {
    const row = subject.find('tr').at(1);
    expect(row.find('td').length).toBe(3);
    expect(row.find('td').at(0).text()).toBe('1');
    expect(row.find('td').at(1).text()).toBe('name1');
    expect(row.find('td').at(2).text()).toEqual('2018-08-22T00:00:00.000Z');
  });
});