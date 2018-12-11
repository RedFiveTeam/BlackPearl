import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsPage } from './MetricsPage';
import Mock = jest.Mock;
import { LogableActions, MetricModel } from '../component/metrics/metric/MetricModel';
import * as moment from 'moment';

describe('MetricsPage', () => {
  let subject: ShallowWrapper;
  let metricsStore: any;
  let metricsPageActions: any;
  let metricActions: any;
  let initSpy: Mock;
  let loginTime: number;

  beforeEach(() => {
    initSpy = jest.fn();
    loginTime = moment('2018-08-22T00:00:00.000Z').utc().unix();

    metricsPageActions = {
      initializeStores: initSpy,
      exportLogins: jest.fn()
    };

    metricActions = {
      logMetric: jest.fn()
    };

    metricsStore = {
      userCount: 2,
      logins: [
        new MetricModel(1, 0, 'GUEST.GUEST.GUEST.0123456789', loginTime, LogableActions.VISIT, 'Home'),
        new MetricModel(2, 0, 'GUEST.GUEST.GUEST.0123456789', loginTime, LogableActions.VISIT, 'Home'),
        new MetricModel(3, 0, 'GUEST.GUEST.GUEST.0123456789', loginTime, LogableActions.VISIT, 'Home'),
      ]
    };

    subject = shallow(
      <MetricsPage
        metricsPageActions={metricsPageActions}
        metricsStore={metricsStore}
        metricActions={metricActions}
      />
    );
  });

  it('should display a title', () => {
    expect(subject.find('.users').text()).toContain('Total user accounts:');
  });

  it('should display the number of users', () => {
    expect(subject.find('.users').text()).toContain('2');
  });

  it('should display the number of visits', () => {
    expect(subject.find('.visits').text()).toBe('Total Visits: 3');
  });

  it('should display the most recent actions', () => {
    expect(subject.find('.recentActions').exists()).toBeTruthy();
  });

  it('should export user logins as a text file', () => {
    subject.find('.exportLoginsButton').simulate('click');
    expect(metricsPageActions.exportLogins).toHaveBeenCalled();
  });
});