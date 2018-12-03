import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsPage } from './MetricsPage';
import Mock = jest.Mock;
import { MetricModel } from '../component/metrics/metric/MetricModel';
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
      initializeStores: initSpy,
      exportLogins: jest.fn()
    };

    metricsStore = {
      userCount: 2,
      logins: [
        new MetricModel(new UserModel(1, 'name1', 'card1'), loginTime),
        new MetricModel(new UserModel(2, 'name2', 'card2'), loginTime),
        new MetricModel(new UserModel(3, 'name3', 'card3'), loginTime),
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

  it('should display the number of logins', () => {
    expect(subject.find('.logins').text()).toBe('Total logins: 3');
  });

  it('should export user logins as a text file', () => {
    subject.find('.exportLoginsButton').simulate('click');
    expect(metricsActions.exportLogins).toHaveBeenCalled();
  });
});